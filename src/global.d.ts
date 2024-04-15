declare module "*.hbs" {
  import { TemplateDelegate } from "handlebars/runtime";
  const content: TemplateDelegate;
  export default content;
}
