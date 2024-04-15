import { EventBus } from "./EventBus.ts";
import { v4 as makeUUID } from "uuid";
import { compile } from "handlebars";

export interface BlockClass<P extends object> extends Function {
  new (props: P): Block<P>;
  componentName?: string;
}

export abstract class Block<Props extends object> {
  protected componentDidUpdate(_oldProps: Props, _newProps: Props) {
    return true;
  }

  protected componentDidMount() {}
  protected componentWillUnmount() {}

  protected abstract render(): string;

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CWU: "flow:component-will-unmount",
    FLOW_RENDER: "flow:render",
  } as const;

  private node: HTMLElement | null = null;

  protected children: { [key: string]: Block<object> };

  protected props: Props;

  private readonly eventBus: EventBus;

  public __id = makeUUID();

  protected constructor(propsAndChildren: Props = {} as Props) {
    this.eventBus = new EventBus();

    const { children, props } = this.getChildren(propsAndChildren);

    this.children = children;

    this.props = this.makePropsProxy({ ...props, __id: this.__id } as Props);

    this.registerEvents(this.eventBus);

    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private getChildren(propsAndChildren: Props) {
    const children = {} as { [key: string]: Block<object> };
    const props = {} as Props;

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key as keyof Props] = value;
      }
    });

    return { children, props };
  }

  private makePropsProxy(props: Props) {
    return new Proxy(props, {
      get(target: Props, prop: string & keyof Props) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (
        target: Props,
        prop: string & keyof Props,
        newProps: Props[string & keyof Props]
      ) => {
        const oldProps = { ...target };

        target[prop] = newProps;

        this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.coreComponentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.coreComponentDidUpdate.bind(this));
    eventBus.on(
      Block.EVENTS.FLOW_CWU,
      this.coreComponentWillUnmount.bind(this)
    );
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.coreRender.bind(this));
  }

  public init() {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private coreComponentDidMount() {
    this.checkInDom();
    this.componentDidMount();
  }

  private checkInDom() {
    const elementInDOM = document.body.contains(this.node);

    if (elementInDOM) {
      setTimeout(() => this.checkInDom(), 1000);
      return;
    }

    this.eventBus.emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  private coreComponentWillUnmount() {
    this.componentWillUnmount();
  }

  private coreComponentDidUpdate(oldProps: Props, newProps: Props) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private coreRender() {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      // @ts-ignore
      propsAndStubs[key] = `<div data-id="${child.__id}"></div>`;
    });

    const fragment = this.createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    fragment.innerHTML = compile(this.render())(propsAndStubs);
    const newElement = fragment.content.firstElementChild as HTMLElement;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(
        `[data-id="${child.__id}"]`
      ) as HTMLElement;

      stub.replaceWith(child.element);
    });

    if (this.node) {
      this.removeEvents();
      this.node.replaceWith(newElement);
    }

    this.node = newElement;
    this.addEvents();
  }

  private createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    element.setAttribute("data-id", this.__id);
    return element;
  }

  private addEvents() {
    const isEvents = this.props.hasOwnProperty("events");
    if (!isEvents) {
      return;
    }
    if ("events" in this.props) {
      Object.entries(this.props.events as Record<string, () => void>).forEach(
        ([event, listener]) => {
          this.node!.addEventListener(event, listener);
        }
      );
    }
  }

  private removeEvents() {
    const isEvents = this.props.hasOwnProperty("events");
    if (!isEvents || !this.node) {
      return;
    }
    if ("events" in this.props) {
      Object.entries(this.props.events as Record<string, () => void>).forEach(
        ([event, listener]) => {
          this.node!.removeEventListener(event, listener);
        }
      );
    }
  }

  public get element() {
    return this.node as HTMLElement;
  }

  public show() {
    this.element.style.display = "block";
  }

  public hide() {
    this.element.style.display = "none";
  }

  public setProps = <T>(nextProps: T) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };
}
