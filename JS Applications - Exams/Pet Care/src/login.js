import { userNav } from "./app.js";
import { html } from "./lib.js";
import { onLogin } from "./requests.js";

const templateLogin = (onSubmit) => html`<section id="loginPage">
<form @submit=${onSubmit} class="loginForm">
    <img src="./images/logo.png" alt="logo" />
    <h2>Login</h2>

    <div>
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>

    <div>
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Login</button>

    <p class="field">
        <span>If you don't have profile click <a href="/register">here</a></span>
    </p>
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
 

    try {
      if (email==='' || password==='') {
        e.target.reset();
        throw new Error("Emty");
      }
      await onLogin(option);
      e.target.reset();
      userNav();
      ctx.page.redirect("/");
    } catch (error) {
      alert(error.message);
      e.target.reset();
     
    }
  }
}
