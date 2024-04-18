import { Block } from "../utils/Block.ts";

class NotFoundCmp extends Block<{}> {
  constructor() {
    super();
  }

  protected render(): string {
    //language=hbs
    return `<div style="height: 100%">{{{ Error errorCode=404 message='Не туда попали'}}}</div>`;
  }
}

export const NotFoundPage = () => {
  return new NotFoundCmp();
};
