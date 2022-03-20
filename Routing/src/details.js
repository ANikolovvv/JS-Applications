import { html } from "./lib.js";
import { deleteMovie, getData } from "./requests.js";

const templateDetails = (item,check,onDelete) => html`<div
    class="row space-top"
  >
    <div class="col-md-12">
      <h1>Furniture Details</h1>
    </div>
  </div>
  <div class="row space-top">
    <div class="col-md-4">
      <div class="card text-white bg-primary">
        <div class="card-body">
          <img src=${item.img} />
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <p>Make: <span>${item.make}</span></p>
      <p>Model: <span>${item.model}</span></p>
      <p>Year: <span>${item.year}</span></p>
      <p>Description: <span>${item.description}</span></p>
      <p>Price: <span>${item.price}</span></p>
      <p>Material: <span>${item.material}</span></p>
      ${check
        ? html` <div>
            <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red"
              >Delete</a
            >
          </div>`
        : ""}
    </div>
  </div>`;

export async function detailsPage(ctx) {
  const item = await load(ctx.params.id);
  const user = JSON.parse(localStorage.getItem("user"));
  const check = user._id == item._ownerId;

  ctx.render(templateDetails(item, check, onDelete));
  console.log("details", ctx.params.id);
  console.log(user._id);
  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this furniture!");
    if (choice) {
      await deleteMovie(ctx.params.id, user.accessToken);
      ctx.page.redirect("/");
    }
  }
}
async function load(id) {
  const getById = await getData(id);

  return getById;
}
