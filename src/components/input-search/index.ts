import { Block } from "../../utils/Block.ts";
import "./input-search.scss";

export type InputSearchProps = {
  events?: {
    change?: (event: InputEvent) => void;
  };
};

class InputSearchCmp extends Block<InputSearchProps> {
  constructor(props: InputSearchProps) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `<input class="search-input" type="text" placeholder="Поиск">`;
  }
}

export const InputSearch = (props: InputSearchProps) => {
  return new InputSearchCmp(props);
};
