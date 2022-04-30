import { html } from "./lib.js";
import { getAll } from "./requests.js";

const templateCatalog = (items, more) => html`
  <section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
      ${more
        ? items.map((x) => templateCart(x))
        : html` <div>
            <p class="no-pets">No pets in dashboard</p>
          </div>`}
    </div>
  </section>
`;
const templateCart = (item) => html`<div class="animals-board">
  <article class="service-img">
    <img class="animal-image-cover" src=${item.image} />
  </article>
  <h2 class="name">${item.name}</h2>
  <h3 class="breed">${item.brred}</h3>
  <div class="action">
    <a class="btn" href="/details/${item._id}">Details</a>
  </div>
</div>`;
export async function catalogPage(ctx) {
  console.log("catalog");

  const user = JSON.parse(localStorage.getItem("user"));
  let have = false;
  let items = await getAll();
  let more = false;
  if (items.length > 0) {
    more = true;


  }
  ctx.render(templateCatalog(items, more));
  
}
