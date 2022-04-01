import { html } from "./lib.js";
import { getData, updateMovie } from "./requests.js";

const templateEdit = (onSubmit, dataGame) => html`<section
  id="edit-page"
  class="auth"
>
  <form @submit=${onSubmit} id="edit">
    <div class="container">
      <h1>Edit Game</h1>
      <label for="leg-title">Legendary title:</label>
      <input type="text" id="title" name="title" value=${dataGame.title} />

      <label for="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value=${dataGame.category}
      />

      <label for="levels">MaxLevel:</label>
      <input
        type="number"
        id="maxLevel"
        name="maxLevel"
        min="1"
        value=${dataGame.maxLevel}
      />

      <label for="game-img">Image:</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value=${dataGame.imageUrl}
      />

      <label for="summary">Summary:</label>
      <textarea name="summary" id="summary"></textarea>
      <input class="btn submit" type="submit" value="Edit Game" />
    </div>
  </form>
</section>`;

export async function editPage(ctx) {
  console.log("edit", ctx.params.id);

  const dataGame = await getData(ctx.params.id);
  console.log(dataGame);
  ctx.render(templateEdit(onSubmit, dataGame));
  document.getElementById("summary").value = dataGame.summary;

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title").trim();
    const category = formData.get("category").trim();
    const maxLevel = formData.get("maxLevel").trim();
    const imageUrl = formData.get("imageUrl").trim();
    const summary = formData.get("summary").trim();

    console.log(title);
    if (
      title !== "" &&
      category !== "" &&
      imageUrl !== "" &&
      maxLevel !== "" &&
      summary !== ""
    ) {
      const option = {
        title,
        category,
        maxLevel,
        imageUrl,
        summary,
      };
      console.log(option);
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await updateMovie(option, ctx.params.id, user.accessToken);
      try {
        if (res.status !== 200) {
          throw new Error();
        }
        e.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
      } catch (error) {
        alert(error)
        console.log(error.message);
      }
     
     
    } else {
      alert("All fields are required");
    }

  }
}
