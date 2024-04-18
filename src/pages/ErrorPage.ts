import { Block } from "../utils/Block.ts";

class ErrorCmp extends Block<{}> {
  constructor() {
    super({ TEST: "ErrorPage" });
  }

  protected render(): string {
    //language=hbs
    return `<div style="height: 100%">{{{ Error errorCode='500' message='Мы уже фиксим' }}}</div>`;
  }
}

export const ErrorPage = () => {
  return new ErrorCmp();
};
