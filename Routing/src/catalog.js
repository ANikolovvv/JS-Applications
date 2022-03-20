import { html, until } from "./lib.js";
import { getAll, getMyData } from "./requests.js";

const templateCatalog = (data, myFur) => html` <div class="row space-top">
    <div class="col-md-12">
      ${myFur
        ? html` <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>`
        : html` <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>`}
    </div>
  </div>
  <div class="row space-top">
    ${until(data, html`<p>Loading &hellip;</p>`)}
  </div>`;

const templateCart = (item) => html`
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src="${item.img}" />
        <p>${item.description}</p>
        <footer>
          <p>Price: <span>${item.price} $</span></p>
        </footer>
        <div>
          <a href="/details/${item._id}" class="btn btn-info">Details</a>
        </div>
      </div>
    </div>
  </div>
`;
export function catalogPage(ctx) {
  const myFur = ctx.pathname == "/my-furniture";
  ctx.render(templateCatalog(load(myFur), myFur));
  console.log("catalog");
}
async function load(myFur) {
  let items = [];
  const user = JSON.parse(localStorage.getItem("user"));

  if (myFur) {
    items = await getMyData(user._id);
  } else {
    items = await getAll();
  }

  return items.map(templateCart);
}
