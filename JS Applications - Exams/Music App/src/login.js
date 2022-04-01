import { userNav } from "./app.js";
import { html } from "./lib.js";
import { onLogin } from "./requests.js";

const templateLogin = (onSubmit) => html`<section id="loginPage">
  <form @submit=${onSubmit}>
    <fieldset>
      <legend>Login</legend>

      <label for="email" class="vhide">Email</label>
      <input
        id="email"
        class="email"
        name="email"
        type="text"
        placeholder="Email"
      />

      <label for="password" class="vhide">Password</label>
      <input
        id="password"
        class="password"
        name="password"
        type="password"
        placeholder="Password"
      />

      <button type="submit" class="login">Login</button>

      <p class="field">
        <span
          >If you don't have profile click <a href="/register">here</a></span
        >
      </p>
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
