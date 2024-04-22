import { Block } from "../../utils/Block.ts";
import "./profile-change.scss";

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
              {{{ InputSetting type='text' label='Почта' value='email@email.com' id='email' }}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting type='text' label='Логин' value='Vanya777xXx' id='login'}}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting type='text' label='Имя' value='Ваня' id='first_name' }}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting type='text' label='Фамилия' value='Ванин' id='second_name' }}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting type='text' label='Имя в чате' value='SuperVanyaOver9000' id='display_name' }}}
            </li>
            <li class="profile-change__field">
              {{{ InputSetting type='text' label='Телефон' value='+7(900)000-00-00' id='phone' }}}
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
