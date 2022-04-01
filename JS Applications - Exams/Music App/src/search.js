import { html, until } from "./lib.js";
import { getAlbumSearch } from "./requests.js";

const templateSearch = (onClick, find, data, have) => html`
  <section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Enter desired albums's name"
      />
      <button @click=${onClick} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    ${tem(find, data, have)}
  </section>
`;
const album = (item, have) => html`<div class="card-box">
  <img src=${item.imgUrl} />
  <div>
    <div class="text-center">
      <p class="name">Name: ${item.name}</p>
      <p class="artist">Artist: ${item.artist}</p>
      <p class="genre">Genre: ${item.genre}</p>
      <p class="price">Price: ${item.price}</p>
      <p class="date">Release Date: ${item.releaseDate}</p>
    </div>
    ${have
      ? html`<div class="btn-group">
          <a href="/details/${item._id}" id="details">Details</a>
        </div>`
      : ""}
  </div>
</div>`;
const tem = (find, data, have) => html` <div class="search-result">
  ${find
    ? data.map((x) => album(x, have))
    : html`<p class="no-result">No result.</p>`}
</div>`;

export async function searchPage(ctx) {
  const user = JSON.parse(localStorage.getItem("user"));
  //let  items = await getAlbumSearch();
  ctx.render(templateSearch(onClick));

  async function onClick(e) {
    e.preventDefault();
    const query = document.getElementById("search-input").value;
    const data = await getAlbumSearch(query);
    let find = false;
    if (data.length > 0) {
      find = true;
    }
    let have = false;
    if (user === null) {
    } else {
      have = true;
    }
    ctx.render(templateSearch(onClick, find, data, have));
  }
  console.log("search");
}
