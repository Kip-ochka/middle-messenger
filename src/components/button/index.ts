import { Block } from "../../utils/Block.ts";
import "./button.scss";

export type ButtonProps = {
  text: string;
  className?: string;
  type?: string;
  events?: {
    click: (event: MouseEvent) => void;
  };
};

export class ButtonCmp extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  componentDidUpdate(_: ButtonProps, __: ButtonProps): boolean {
    return true;
  }

  render() {
    // language=hbs
    return `
      <button class="button {{className}}" type="{{type}}">
        {{text}}
      </button>
    `;
  }
}

export const Button = (props: ButtonProps) => {
  return new ButtonCmp(props);
};
