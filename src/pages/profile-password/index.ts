import { Block } from "../../utils/Block.ts";
import "./profile-password.scss";
import { REGEXP_PASSWORD } from "../../utils/regexps.ts";

class ProfilePasswordCmp extends Block<{}> {
  constructor() {
    super();
  }

  protected render(): string {
    //language=hbs
    return `
      <div class="profile-password-change__wrapper">
        {{{ BackButton }}}
        <form class="profile-password-change">
          <div class="profile-password-change__img-wrapper">
            <div class="profile-password-change__img" ></div>
          </div>
          <ul class="profile-password-change__fields">
            <li class="profile-password-change__field">
              {{{ InputSetting type='password' label='Старый пароль' value='1111' id='oldPassword' regexp="${REGEXP_PASSWORD}"}}}
            </li>
            <li class="profile-password-change__field">
              {{{ InputSetting type='password' label='Новый пароль' value='2222' id='newPassword' regexp="${REGEXP_PASSWORD}"}}}
            </li>
            <li class="profile-password-change__field">
              {{{ InputSetting type='password' label='Повторите новый пароль' value='2222' id='repeateNewPassword' regexp="${REGEXP_PASSWORD}" }}}
            </li>
          </ul>
          <div class="profile-password-change__button-wrapper">
            {{{ Button type="submit" text="Сохранить"}}}
          </div>
        </form>
      </div>
    `;
  }
}

export const ProfilePasswordChangePage = () => {
  return new ProfilePasswordCmp();
};
