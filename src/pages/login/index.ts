import { Block } from "../../utils/Block.ts";
import "./login.scss";
import { renderDom } from "../../utils/renderDom.ts";
import { Input, InputProps } from "../../components/input";
import { Button, ButtonProps } from "../../components/button";
import { registerComponent } from "../../utils/registerComponent.ts";

export type LoginBlock = {
  loginValue: string;
  passwordValue: string;
  login: Block<InputProps>;
  password: Block<InputProps>;
  button: Block<ButtonProps>;
};

class LoginCmp extends Block<LoginBlock> {
  constructor() {
    super({
      loginValue: "",
      passwordValue: "",
      login: Input({
        type: "text",
        id: "login-login",
        errorText: "",
        value: "",
        name: "login-login",
        className: "",
        placeholder: "Логин",
        label: "Логин",
        events: {
          change: (event: InputEvent) => {
            if (!(event.target instanceof HTMLInputElement)) {
              return;
            }
            this.setProps({ loginValue: event.target.value });
          },
        },
      }),
      password: Input({
        type: "text",
        id: "login-password",
        errorText: "",
        value: "",
        name: "login-password",
        className: "",
        placeholder: "Пароль",
        label: "Пароль",
        events: {
          change: (event: InputEvent) => {
            if (!(event.target instanceof HTMLInputElement)) {
              return;
            }

            this.setProps({ passwordValue: event.target.value });
          },
        },
      }),
      button: Button({
        type: "submit",
        text: "Войти",
        className: "",
        events: {
          click: (event: Event) => {
            event.preventDefault();
            console.log({
              password: this.props.passwordValue,
              login: this.props.loginValue,
            });
          },
        },
      }),
    });
  }

  render() {
    // language=hbs
    return `
      <div class="login-page">
        <form class="login-page__wrapper">
          <h1 class="login-page__title">Вход</h1>
          <div class="login-page__input-wrapper">
            {{{ login }}}
            {{{ password }}}
          </div>
          <div class="login-page__button-wrapper">
            {{{ button }}}
            <a class="login-page__link" href="/">Ещё не зарегистрированы?</a>
          </div>
        </form>
      </div>
    `;
  }
}

export const Login = () => {
  return new LoginCmp();
};

registerComponent("Input", Input);
registerComponent("Button", Button);

renderDom("root", Login());
