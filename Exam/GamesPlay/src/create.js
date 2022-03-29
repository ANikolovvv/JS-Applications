import { html } from "./lib.js";
import { createMovie } from "./requests.js";

const templateCreate = (onSubmit) => html`<section
  id="create-page"
  class="auth"
>
  <form @submit=${onSubmit} id="create">
    <div class="container">
      <h1>Create Game</h1>
      <label for="leg-title">Legendary title:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Enter game title..."
      />

      <label for="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        placeholder="Enter game category..."
      />

      <label for="levels">MaxLevel:</label>
      <input
        type="number"
        id="maxLevel"
        name="maxLevel"
        min="1"
        placeholder="1"
      />

      <label for="game-img">Image:</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        placeholder="Upload a photo..."
      />

      <label for="summary">Summary:</label>
      <textarea name="summary" id="summary" ></textarea>
      <input class="btn submit" type="submit" value="Create Game" />
    </div>
  </form>
</section> `;

export function createPage(ctx) {
  console.log("create");
  ctx.render(templateCreate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get("title").trim();
    const category = formData.get("category").trim();
    const maxLevel = formData.get("maxLevel").trim();
    const imageUrl = formData.get("imageUrl").trim();
    const summary = formData.get("summary").trim();
    if (title !== "" && category !== "" && imageUrl !== "" && maxLevel!== "" && summary!=='') {
      const option = {
        title,
        category,
        maxLevel,
        imageUrl,
        summary,
      };
      console.log(option);
      const user = JSON.parse(localStorage.getItem("user"));
      createMovie(option, user.accessToken);
      e.target.reset();
      ctx.page.redirect("/home");
    } else {
      alert("All fields are required");
    }
  }
}
