import { HelperOptions, registerHelper, helpers } from "handlebars";
import { Block } from "./Block.ts";

export function registerComponent<T extends object>(
  componentName: string,
  componentFn: (props: T) => Block<T>
) {
  if (componentName in helpers) {
    throw `The ${componentName} component is already registered!`;
  }
  registerHelper(componentName, ({ hash, data }: HelperOptions) => {
    if (!data.root.children) {
      data.root.children = {};
    }
    const { children } = data.root;
    const component = componentFn(hash);

    children[component.__id] = component;

    return `<div data-id="id-${component.__id}"></div>`;
  });
}