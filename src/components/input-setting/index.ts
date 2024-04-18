import { Block } from "../../utils/Block.ts";
import "./input-setting.scss";

export type InputSettingProps = {
  id: string;
  label: string;
  value: string;
  type: string;
  onChange: (event: Event) => void;
};

export type InputSettingBlock = {} & InputSettingProps;

class InputSettingCmp extends Block<InputSettingBlock> {
  constructor(props: InputSettingProps) {
    super(props);
  }

  get input() {
    return document.getElementById(this.props.id) as HTMLInputElement;
  }

  componentDidMount() {
    this.input.addEventListener("change", this.props.onChange);
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="setting-wrapper">
        <label for="{{id}}" class="label-setting">{{label}}</label>
        <input class="input-setting" id="{{id}}" name="{{id}}" value="{{value}}" type="{{type}}" />
      </div>

    `;
  }
}

export const InputSetting = (props: InputSettingProps) => {
  return new InputSettingCmp(props);
};
