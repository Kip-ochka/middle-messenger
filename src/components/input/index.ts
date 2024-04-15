import { Block } from "../../utils/Block.ts";
import "./input.scss";
export type InputProps = {
  value?: string;
  placeholder?: string;
  className?: string;
  errorText?: string;
  id: string;
  label: string;
  name: string;
  type: string;
  events: {
    input?: (event: InputEvent) => void;
    blur?: (event: InputEvent) => void;
    focus?: (event: InputEvent) => void;
    change?: (event: InputEvent) => void;
  };
};

class InputCmp extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }
  protected render(): string {
    // language=hbs
    return `
      <label class="input {{className}}" for="{{id}}">
        <span class="input__label">{{label}}</span>
        <input class="input__native-element" placeholder={{placeholder}} name={{name}} id={{id}} type={{type}} autocomplete="false" value={{value}}>
        <span class="input__error">{{errorText}}</span>
      </label>
    `;
  }
}

export const Input = (props: InputProps) => {
  return new InputCmp(props);
};
