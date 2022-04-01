import { nav } from "./app.js";
import { errTemplate, section } from "./errTemplate.js";
import { html } from "./lib.js";
import { onLogin } from "./requests/crud.js";

const templateLogin = (onSubmit,error) => html`<section id="login">
    <form @submit=${onSubmit} id="login-form">
      <div class="container">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text" />
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          name="password"
        />
        <input type="submit" class="registerbtn button" value="Login" />
        <div class="container signin">
          <p>Dont have an account?<a href="/register">Sign up</a>.</p>
        </div>
      </div>
    </form>
  </section>
  ${error ? errTemplate(error) : null}`;
export function showLogin(ctx) {

  ctx.render(templateLogin(onSubmit));
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const option = { email, password };

    try {
      if (email === "" || password === "") {
        e.target.reset();
        throw new Error("All fields are required!");
      }
      await onLogin(option);
      e.target.reset();
      nav();
      ctx.page.redirect("/all");
    } catch (err) {
 
      ctx.render(templateLogin(onSubmit, err.message));
      document.querySelector("div.notification ").style.display='block'
      setTimeout(function () {
        ctx.render(templateLogin(onSubmit));
      }, 3000);
      e.target.reset();
    }
  }
}
