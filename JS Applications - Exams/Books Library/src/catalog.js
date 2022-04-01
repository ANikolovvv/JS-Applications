import { html, until } from "./lib.js";
import { getAll, getMyData } from "./requests.js";
// ${myFur
//   ? html` <h1>My Furniture</h1>
//       <p>This is a list of your publications.</p>`
//   : html` <h1>Welcome to Furniture System</h1>
//       <p>Select furniture from the catalog to view details.</p>`}
// </div>
const templateCatalog = (all, more) => html`
  <section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <!-- Display ul: with list-items for All books (If any) -->
    ${more === true
      ? html` <ul class="other-books-list">
          ${all}
        </ul>`
      : html`<p class="no-books">No books in database!</p>`}

    <!-- Display paragraph: If there are no books in the database -->
  </section>
`;
const templateCart = (item) => html` <li class="otherBooks">
  <h3>${item.title}</h3>
  <p>Type: ${item.type}</p>
  <p class="img"><img src=${item.imageUrl} /></p>
  <a class="button" href="/details/${item._id}">Details</a>
</li>`;
export function catalogPage(ctx) {
  //
  //(load(myFur), myFur)
  console.log("catalog");
  async function load() {
    const user = JSON.parse(localStorage.getItem("user"));
    let items = await getAll();
    let more = false;
    if (items.length > 0) {
      more = true;
    }
    const all = items.map(templateCart);
    ctx.render(templateCatalog(all, more));
  }
  load();
}
