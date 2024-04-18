import { Block } from "../../utils/Block.ts";
import "./registration.scss";
import {
  REGEXP_EMAIL,
  REGEXP_LOGIN,
  REGEXP_NAME,
  REGEXP_PASSWORD,
  REGEXP_PHONE,
} from "../../utils/regexps.ts";

class RegistrationCmp extends Block<{}> {
  constructor() {
    super();
  }

  protected render(): string {
    //language=hbs
    return `
      <div class="register-page">
        <form class="register-page__wrapper">
          <h1 class="register-page__title">Регистрация</h1>
          <div class="register-page__input-wrapper">
            {{{ Input label="Почта" type="email" placeholder="Почта" errorText="Неверная почта" name="email" regexp="${REGEXP_EMAIL}"}}}
            {{{ Input label="Логин" type="text" placeholder="Логин" name="login" regexp="${REGEXP_LOGIN}"}}}
            {{{ Input label="Имя" type="text" placeholder="Имя" name="first_name" regexp="${REGEXP_NAME}"}}}
            {{{ Input label="Фамилия" type="text" placeholder="Фамилия" name="second_name" regexp="${REGEXP_NAME}"}}}
            {{{ Input label="Телефон" type="text" placeholder="Телефон" name="phone" regexp="${REGEXP_PHONE}"}}}
            {{{ Input label="Пароль" type="password" placeholder="Пароль" name="password" regexp="${REGEXP_PASSWORD}"}}}
            {{{ Input label="Пароль (ещё раз)" type="password" placeholder="Пароль (ещё раз)" name="password" regexp="${REGEXP_PASSWORD}"}}}
          </div>
          <div class="register-page__button-wrapper">
            {{{ Button text="Зарегистрироваться" type='submit'}}}
            <a class="register-page__link" href="../login/login.hbs">Войти</a>
          </div>
        </form>
      </div>
    `;
  }
}

export const RegistrationPage = () => {
  return new RegistrationCmp();
};
