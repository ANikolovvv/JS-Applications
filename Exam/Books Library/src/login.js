import { userNav } from "./app.js";
import { html } from "./lib.js";
import { onLogin } from "./requests.js";

const templateLogin = (onSubmit) => html` <section
  id="login-page"
  class="login"
>
  <form @submit=${onSubmit} id="login-form" action="" method="">
    <fieldset>
      <legend>Login Form</legend>
      <p class="field">
        <label for="email">Email</label>
        <span class="input">
          <input type="text" name="email" id="email" placeholder="Email" />
        </span>
      </p>
      <p class="field">
        <label for="password">Password</label>
        <span class="input">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </span>
      </p>
      <input class="button submit" type="submit" value="Login" />
    </fieldset>
  </form>
</section>`;

export function loginPage(ctx) {
  console.log("login");

  ctx.render(templateLogin(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const option = { email, password };
    const ok = await onLogin(option);

    try {
      if (ok.status === 403) {
        e.target.reset();
        throw new Error(ok);
      }
      e.target.reset();
      userNav();
      ctx.page.redirect("/");
    } catch (error) {
      alert(error.message);
      e.target.reset();
      console.log(error.message);
    }
  }
}
