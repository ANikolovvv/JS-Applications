import { html, until } from "./lib.js";
import { getAll } from "./requests.js";

const templateCatalog = (all, more) => html`
  <section id="catalogPage">
    <h1>All Albums</h1>
    ${more === true ? all : html`<p>No Albums in Catalog!</p>`}
  </section>
`;
const templateCart = (item, have) => html`<div class="card-box">
  <img src=${item.imgUrl} />
  <div>
    <div class="text-center">
      <p class="name">Name: ${item.name}</p>
      <p class="artist">Artist: ${item.artist}</p>
      <p class="genre">Genre: ${item.genre}</p>
      <p class="price">Price: ${item.price}</p>
      <p class="date">Release Date: ${item.releaseDate}</p>
    </div>
    ${have
      ? html`<div class="btn-group">
          <a href="/details/${item._id}" id="details">Details</a>
        </div>`
      : ""}
  </div>
</div>`;
export async function catalogPage(ctx) {
  async function load() {
    const user = JSON.parse(localStorage.getItem("user"));
    let items = await getAll();
    let more = false;
    let have = false;
    if (user === null) {
    } else {
      have = true;
    }
    if (items.length > 0) {
      more = true;
    }
    const all = items.map((x) => templateCart(x, have));
    ctx.render(templateCatalog(all, more));
  }
  load();
}
