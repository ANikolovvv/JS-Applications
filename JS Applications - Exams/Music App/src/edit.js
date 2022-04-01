import { html } from "./lib.js";
import { getData, updateAlbum } from "./requests.js";

const templateEdit = (onSubmit, dataAlbum) => html`<section class="editPage">
  <form @submit=${onSubmit}>
    <fieldset>
      <legend>Edit Album</legend>

      <div class="container">
        <label for="name" class="vhide">Album name</label>
        <input
          id="name"
          name="name"
          class="name"
          type="text"
          value=${dataAlbum.name}
        />

        <label for="imgUrl" class="vhide">Image Url</label>
        <input
          id="imgUrl"
          name="imgUrl"
          class="imgUrl"
          type="text"
          value=${dataAlbum.imgUrl}
        />

        <label for="price" class="vhide">Price</label>
        <input
          id="price"
          name="price"
          class="price"
          type="text"
          value=${dataAlbum.price}
        />

        <label for="releaseDate" class="vhide">Release date</label>
        <input
          id="releaseDate"
          name="releaseDate"
          class="releaseDate"
          type="text"
          value=${dataAlbum.releaseDate}
        />

        <label for="artist" class="vhide">Artist</label>
        <input
          id="artist"
          name="artist"
          class="artist"
          type="text"
          value=${dataAlbum.artist}
        />

        <label for="genre" class="vhide">Genre</label>
        <input
          id="genre"
          name="genre"
          class="genre"
          type="text"
          value=${dataAlbum.genre}
        />

        <label for="description" class="vhide">Description</label>
        <textarea
          name="description"
          class="description"
          rows="10"
          cols="10"
          .value=${dataAlbum.description}
        ></textarea>

        <button class="edit-album" type="submit">Edit Album</button>
      </div>
    </fieldset>
  </form>
</section>`;

export async function editPage(ctx) {
  console.log("edit", ctx.params.id);

  const dataAlbum = await getData(ctx.params.id);
  console.log(dataAlbum);
  ctx.render(templateEdit(onSubmit, dataAlbum));

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

    const user = JSON.parse(localStorage.getItem("user"));
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
      const res = await updateAlbum(option, ctx.params.id, user.accessToken);
      try {
        if (res.status !== 200) {
          throw new Error();
        }
      } catch (error) {
        console.log(error.message);
      }
      e.target.reset();
      ctx.page.redirect(`/details/${ctx.params.id}`);
    } else {
      alert("All fields are require");
    }
  }
}
