import { html } from "./lib.js";
import { deleteMovie, getData } from "./requests/crud.js";

const templateDetails = (item, person,onDelete) => html`<section id="meme-details">
  <h1>Meme Title: ${item.title}</h1>
  <div class="meme-details">
    <div class="meme-img">
      <img alt="meme-alt" src=${item.imageUrl} />
    </div>
    <div class="meme-description">
      <h2>Meme Description</h2>
      <p>${item.description}</p>

      <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
      ${person
        ? html` <a class="button warning" href="/edit/${item._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>`
        : ""}
    </div>
  </div>
</section> `;
export async function showDetails(ctx) {
  console.log("details");
  const user = JSON.parse(localStorage.getItem("user"));
  const item = await getData(ctx.params.id);
  let person = false;

  if (user === null) {
    person = false;
  } else if (user._id == item._ownerId) {
    person = true;
  }
  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this furniture!");
    if (choice) {
      await deleteMovie(ctx.params.id, user.accessToken);
      ctx.page.redirect("/all");
    }
  }
  ctx.render(templateDetails(item, person,onDelete));
}
