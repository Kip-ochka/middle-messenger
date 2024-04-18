import { Block } from "../../utils/Block.ts";
import "./login.scss";
import { Input, InputProps } from "../../components/input";
import { Button, ButtonProps } from "../../components/button";
import { REGEXP_LOGIN, REGEXP_PASSWORD } from "../../utils/regexps.ts";

export type LoginBlock = {
  loginValue: string;
  passwordValue: string;
  login: Block<InputProps>;
  password: Block<InputProps>;
  button: Block<ButtonProps>;
  TEST: string;
};

export type LoginProps = {};

class LoginCmp extends Block<LoginBlock> {
  constructor(props: LoginProps) {
    super({
      ...props,
      TEST: "LOGIN",
      loginValue: "",
      passwordValue: "",
      login: Input({
        id: "login-login",
        placeholder: "Логин",
        label: "Логин",
        regexp: REGEXP_LOGIN,
        events: {
          change: (event: InputEvent) => {
            if (!(event.target instanceof HTMLInputElement)) {
              return;
            }
          },
        },
      }),
      password: Input({
        id: "login-password",
        placeholder: "Пароль",
        label: "Пароль",
        regexp: REGEXP_PASSWORD,
        events: {
          change: (event: InputEvent) => {
            if (!(event.target instanceof HTMLInputElement)) {
              return;
            }
          },
        },
      }),
      button: Button({
        type: "submit",
        text: "Войти",
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

export const LoginPage = () => {
  return new LoginCmp({});
};
