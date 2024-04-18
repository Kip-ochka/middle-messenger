import { Block } from "../../utils/Block.ts";
import "./navigate.scss";

class NavigateCmp extends Block<{}> {
  constructor() {
    super();
  }

  protected render(): string {
    return `
      <nav>
        <ul class="nav-links">
            <li><a href="#" page="ChatPage">Чат</a></li>
            <li><a href="#" page="ErrorPage">500</a></li>
            <li><a href="#" page="LoginPage">Логин</a></li>
            <li><a href="#" page="ProfileChangePage">Изменить профиль</a></li>
            <li><a href="#" page="ProfilePage">Профиль</a></li>
            <li><a href="#" page="ProfilePasswordPage">Изменить пароль</a></li>
            <li><a href="#" page="RegistrationPage">Регистрация</a></li>
          </ul>
        </nav>
    `;
  }
}

export const Navigate = () => {
  return new NavigateCmp();
};
