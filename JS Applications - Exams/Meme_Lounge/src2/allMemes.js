import { html } from "./lib.js";
import { getAll } from "./requests/crud.js";

const templateAll = (allData) => html`
  <section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
      <!-- Display : All memes in database ( If any ) -->
      ${allData.length > 0
        ? allData.map((x) => templateMeme(x))
        : html`<p class="no-memes">No memes in database.</p>`}
      <!-- Display : If there are no memes in database -->
    </div>
  </section>
`;
const templateMeme = (item) => html` <div class="meme">
  <div class="card">
    <div class="info">
      <p class="meme-title">${item.title}</p>
      <img class="meme-image" alt="meme-img" src=${item.imageUrl} />
    </div>
    <div id="data-buttons">
      <a class="button" href="/details/${item._id}">Details</a>
    </div>
  </div>
</div>`;
export async function showAll(ctx) {
  console.log("all");
  const allData = await getAll();
  console.log(allData);
  ctx.render(templateAll(allData));
}
