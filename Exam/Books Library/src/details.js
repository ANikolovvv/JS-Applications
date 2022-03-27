import { html } from "./lib.js";
import {
  addLike,
  deleteMovie,
  getData,
  getIfUserLikedMovie,
  getMovieLikesNumber,
} from "./requests.js";

const templateDetails = (item, check, like, onDelete, num, ifLike) => html`
  <section id="details-page" class="details">
    <div class="book-information">
      <h3>${item.title}</h3>
      <p class="type">Type: ${item.type}</p>
      <p class="img"><img src=${item.imageUrl} /></p>
      <div class="actions">
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
        ${check
          ? html`<a class="button" href="/edit/${item._id}">Edit</a>
              <a class="button" @click=${onDelete} href="javascript:void(0)"
                >Delete</a
              >`
          : ""}

        <!-- Bonus -->
        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        ${like
          ? html`<a id='hid' @click=${likeBtnn} class="button" href="#">Like</a>`
          : ''}

        <!-- ( for Guests and Users )  -->
        <div class="likes">
          <img class="hearts" src="/images/heart.png" />
          <span id="total-likes">Likes: ${num}</span>
        </div>
        <!-- Bonus -->
      </div>
    </div>
    <div class="book-description">
      <h3>Description:</h3>
      <p>${item.description}</p>
    </div>
  </section>
`;
let c = "";
export async function detailsPage(ctx) {
  c = ctx;
  const item = await load(ctx.params.id);
  const user = JSON.parse(localStorage.getItem("user"));
  const num = await getMovieLikesNumber(ctx.params.id);
  console.log(num);
  let ifLike=0
  let check = false;
  let like = false;
  
  if (user === null) {
    check = false;
  } else if (user._id === item._ownerId) {
    check = true;
  } else if (user !== null && user._id !== item._ownerId && ifLike === 0) {
    like = true;
  }
  if(user){
     ifLike = await getIfUserLikedMovie(c.params.id, user._id);
  }
  ctx.render(templateDetails(item, check, like, onDelete, num, ifLike));
  //ctx.render(templateDetails(item, check, onDelete));
  console.log("details", ctx.params.id);
  //console.log(user._id);
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
async function likeBtnn(e) {
  e.preventDefault();
  let bookId = c.params.id;
  const user = JSON.parse(localStorage.getItem("user"));
  let num = await getMovieLikesNumber(c.params.id);
  const total = document.querySelector("#total-likes");
  const hid = document.querySelector("#hid");
 
  const ifLike = await getIfUserLikedMovie(c.params.id, user._id);
  if (ifLike === 0) {
    num+=1
    total.textContent =`Likes: ${num}`;
    const data = { bookId };
    addLike(data, user.accessToken);
    hid.disabled=true
  }
  console.log(total);
}
