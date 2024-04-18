import { Block } from "../../utils/Block.ts";
import "./profile-change.scss";
import {
  REGEXP_EMAIL,
  REGEXP_LOGIN,
  REGEXP_NAME,
  REGEXP_NICKNAME,
  REGEXP_PHONE,
} from "../../utils/regexps.ts";

class ProfileChangeCmp extends Block<{}> {
  constructor() {
    super();
  }

  protected render(): string {
    //language=hbs
    return `
      <div class="profile-change__wrapper">
        {{{ BackButton }}}
        <form class="profile-change">
          <div class="profile-change__img-wrapper">
            <div class="profile-change__img" ></div>
          </div>
          <ul class="profile-change__fields">
            <li class="profile-change__field">
              {{{ InputSetting type='text' label='Почта' value='email@email.com' id='email' regexp="${REGEXP_EMAIL}"}}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting type='text' label='Логин' value='Vanya777xXx' id='login' regexp="${REGEXP_LOGIN}"}}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting type='text' label='Имя' value='Ваня' id='first_name' regexp="${REGEXP_NAME}"}}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting type='text' label='Фамилия' value='Ванин' id='second_name' regexp="${REGEXP_NAME}"}}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting type='text' label='Имя в чате' value='SuperVanyaOver9000' id='display_name' regexp="${REGEXP_NICKNAME}"}}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting type='text' label='Телефон' value='+7(900)000-00-00' id='phone' regexp="${REGEXP_PHONE}"}}}
            </li>
          </ul>
          <div class="profile-change__button-wrapper">
            {{{ Button type="submit" text="Сохранить"}}}
          </div>
        </form>
      </div>
    `;
  }
}

export const ProfileChangePage = () => {
  return new ProfileChangeCmp();
};
