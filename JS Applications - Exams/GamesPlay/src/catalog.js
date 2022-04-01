import { html, until } from "./lib.js";
import { getAll, getMyData } from "./requests.js";

const templateCatalog = (all, more) => html`
  <section id="catalog-page">
    <h1>All Games</h1>
    <!-- Display div: with information about every game (if any) -->
    ${more ? all : html`<h3 class="no-articles">No articles yet</h3>`}
    <!-- Display paragraph: If there is no games  -->
  </section>
`;
const templateCart = (item) => html`<div class="allGames">
  <div class="allGames-info">
    <img src=${item.imageUrl} />
    <h6>${item.category}</h6>
    <h2>${item.title}</h2>
    <a href="/details/${item._id}" class="details-button">Details</a>
  </div>
</div>`;
export function catalogPage(ctx) {
  //(load(myFur), myFur)
  console.log("catalog");
  async function load() {
    //const user = JSON.parse(localStorage.getItem("user"));
    let items = await getAll();
    console.log(items);
    let more = false;
    if (items.length > 0) {
      more = true;
    }
    const all = items.map(templateCart);
    ctx.render(templateCatalog(all, more));
  }
  load();
}
