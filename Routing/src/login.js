import { userNav } from "./app.js";
import { html } from "./lib.js";
import { onLogin } from "./requests.js";

const templateLogin = (onSubmit, errorMsg) => html` <div class="row space-top">
    <div class="col-md-12">
      <h1>Login User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        ${errorMsg
          ? html`<div class="form-group">${`wrong email or password`}}</div>`
          : null}
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input
            class=${"form-control" + (errorMsg ? " is-invalid" : "")}
            id="email"
            type="text"
            name="email"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password">Password</label>
          <input
            class=${"form-control" + (errorMsg ? " is-invalid" : "")}
            id="password"
            type="password"
            name="password"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </div>
    </div>
  </form>`;

export function loginPage(ctx) {
  update();
  console.log("login");
  function update(errorMsg) {
    ctx.render(templateLogin(onSubmit, errorMsg));
  }

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
      update(error.message);
      console.log(error.message);
    }
  }
}
