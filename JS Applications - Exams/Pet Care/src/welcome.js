import { html } from "./lib.js";
import { getAll, getMyData } from "./requests.js";

const templateWellcome = () => html`
  <section class="welcome-content">
    <article class="welcome-content-text">
      <h1>We Care</h1>
      <h1 class="bold-welcome">Your Pets</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </p>
    </article>
    <article class="welcome-content-image">
      <img src="./images/header-dog.png" alt="dog" />
    </article>
  </section>
`;
export async function wellcomePage(ctx) {
  // const user = JSON.parse(localStorage.getItem("user"));
  // let  items = await getMyData(user._id);
  ctx.render(templateWellcome());
  console.log("welcome");
}
