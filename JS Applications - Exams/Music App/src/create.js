import { html } from "./lib.js";
import { createAlbum } from "./requests.js";

const templateCreate = (onSubmit) => html`<section class="createPage">
  <form @submit=${onSubmit}>
    <fieldset>
      <legend>Add Album</legend>

      <div class="container">
        <label for="name" class="vhide">Album name</label>
        <input
          id="name"
          name="name"
          class="name"
          type="text"
          placeholder="Album name"
        />

        <label for="imgUrl" class="vhide">Image Url</label>
        <input
          id="imgUrl"
          name="imgUrl"
          class="imgUrl"
          type="text"
          placeholder="Image Url"
        />

        <label for="price" class="vhide">Price</label>
        <input
          id="price"
          name="price"
          class="price"
          type="text"
          placeholder="Price"
        />

        <label for="releaseDate" class="vhide">Release date</label>
        <input
          id="releaseDate"
          name="releaseDate"
          class="releaseDate"
          type="text"
          placeholder="Release date"
        />

        <label for="artist" class="vhide">Artist</label>
        <input
          id="artist"
          name="artist"
          class="artist"
          type="text"
          placeholder="Artist"
        />

        <label for="genre" class="vhide">Genre</label>
        <input
          id="genre"
          name="genre"
          class="genre"
          type="text"
          placeholder="Genre"
        />

        <label for="description" class="vhide">Description</label>
        <textarea
          name="description"
          class="description"
          placeholder="Description"
        ></textarea>

        <button class="add-album" type="submit">Add New Album</button>
      </div>
    </fieldset>
  </form>
</section> `;

export function createPage(ctx) {
  console.log("create");
  ctx.render(templateCreate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name").trim();
    const description = formData.get("description").trim();
    const imgUrl = formData.get("imgUrl").trim();
    const price = formData.get("price").trim();
    const releaseDate = formData.get("releaseDate").trim();
    const artist = formData.get("artist").trim();
    const genre = formData.get("genre").trim();
    if (
      name !== "" &&
      description !== "" &&
      imgUrl !== "" &&
      price !== "" &&
      releaseDate !== "" &&
      artist !== "" &&
      genre !== ""
    ) {
      const option = {
        name,
        imgUrl,
        price,
        releaseDate,
        artist,
        genre,
        description,
      };
      console.log(option);
      const user = JSON.parse(localStorage.getItem("user"));
      createAlbum(option, user.accessToken);
      e.target.reset();
      ctx.page.redirect("/catalog");
    } else {
      alert("All fields are required");
    }
  }
}
