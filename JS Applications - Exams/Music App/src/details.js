import { html } from "./lib.js";
import { deleteAlbum, getData } from "./requests.js";

const templateDetails = (item, check, onDelete) => html`<section
  id="detailsPage"
>
  <div class="wrapper">
    <div class="albumCover">
      <img src=${item.imgUrl} />
    </div>
    <div class="albumInfo">
      <div class="albumText">
        <h1>Name: ${item.name}</h1>
        <h3>Artist: ${item.artist}</h3>
        <h4>Genre: ${item.genre}</h4>
        <h4>Price: ${item.price}</h4>
        <h4>Date: ${item.releaseDate}</h4>
        <p>Description: ${item.description}</p>
      </div>

      <!-- Only for registered user and creator of the album-->
      ${check
        ? html` <div class="actionBtn">
            <a href="/edit/${item._id}" class="edit">Edit</a>
            <a href="#" @click=${onDelete} class="remove">Delete</a>
          </div>`
        : ""}
    </div>
  </div>
</section> `;

export async function detailsPage(ctx) {
  const item = await getData(ctx.params.id);
  const user = JSON.parse(localStorage.getItem("user"));
  let check = false;

  if (user === null) {
    check = false;
  } else if (user._id === item._ownerId) {
    check = true;
  }

  ctx.render(templateDetails(item, check, onDelete));
  //ctx.render(templateDetails(item, check, onDelete));
  console.log("details", ctx.params.id);
  //console.log(user._id);
  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this album!");
    if (choice) {
      await deleteAlbum(ctx.params.id, user.accessToken);
      ctx.page.redirect("/catalog");
    }
  }
}
