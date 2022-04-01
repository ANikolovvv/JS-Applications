import { userNav } from "./app.js";
import { html } from "./lib.js";
import { regUsers } from "./requests.js";

const templateReg = (onSubmit) => html`<section id="registerPage">
  <form @submit=${onSubmit}>
    <fieldset>
      <legend>Register</legend>

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

      <label for="conf-pass" class="vhide">Confirm Password:</label>
      <input
        id="conf-pass"
        class="conf-pass"
        name="conf-pass"
        type="password"
        placeholder="Confirm Password"
      />

      <button type="submit" class="register">Register</button>

      <p class="field">
        <span>If you already have profile click <a href="/login">here</a></span>
      </p>
    </fieldset>
  </form>
</section> `;

export function registerPage(ctx) {
  console.log("reg");

  ctx.render(templateReg(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("conf-pass").trim();
    const option = { email, password };
    if (email !== "" && password === rePass && password !== "") {
      const ok = await regUsers(option);

      try {
        if (ok.status === 403) {
          e.target.reset();
          throw new Error(ok);
        }
        e.target.reset();
        userNav();
        ctx.page.redirect("/");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      e.target.reset();
      alert("Password dont match or wrong email!");
    }
  }
}
