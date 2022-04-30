import { userNav } from "./app.js";
import { html } from "./lib.js";
import { regUsers } from "./requests.js";

const templateReg = (onSubmit) => html`
  <section id="registerPage">
    <form @submit=${onSubmit} class="registerForm">
      <img src="./images/logo.png" alt="logo" />
      <h2>Register</h2>
      <div class="on-dark">
        <label for="email">Email:</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="steven@abv.bg"
          value=""
        />
      </div>

      <div class="on-dark">
        <label for="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          value=""
        />
      </div>

      <div class="on-dark">
        <label for="repeatPassword">Repeat Password:</label>
        <input
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          placeholder="********"
          value=""
        />
      </div>

      <button class="btn" type="submit">Register</button>

      <p class="field">
        <span>If you have profile click <a href="/login">here</a></span>
      </p>
    </form>
  </section>
`;

export function registerPage(ctx) {
  console.log("reg");

  ctx.render(templateReg(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("repeatPassword").trim();
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
