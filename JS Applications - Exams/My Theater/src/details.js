import { html } from "./lib.js";
import {
  addLike,
  deleteThe,
  getDataThea,
  getIfUserLikedTheater,
  getTheaterLikesNumber,
} from "./requests.js";

const templateDetails = (
  item,
  check,
  onDelete,
  like,
  onClick,
  numberLike,
  ifLike
) => html`<section id="detailsPage">
  <div id="detailsBox">
    <div class="detailsInfo">
      <h1>Title: ${item.title}</h1>
      <div>
        <img src=${item.imageUrl} />
      </div>
    </div>

    <div class="details">
      <h3>Theater Description</h3>
      <p>${item.description}</p>
      <h4>Date: ${item.date}</h4>
      <h4>Author: ${item.author}</h4>
      <div class="buttons">
        ${check
          ? html`<a class="btn-delete" @click=${onDelete} href="#">Delete</a>
              <a class="btn-edit" href="/edit/${item._id}">Edit</a>`
          : ""}
        ${like && ifLike === 0
          ? html` <a id="like" class="btn-like" @click=${onClick} href="#"
              >Like</a
            >`
          : ""}
      </div>
      <p id="total" class="likes">Likes: ${numberLike}</p>
    </div>
  </div>
</section> `;
let c = "";
export async function detailsPage(ctx) {
  c = ctx;
  const item = await getDataThea(ctx.params.id);
  const user = JSON.parse(localStorage.getItem("user"));
  let numberLike = await getTheaterLikesNumber(item._id);

  console.log(numberLike);
  let ifLike = 0;
  let check = false;
  let like = false;
  if (user) {
    ifLike = await getIfUserLikedTheater(item._id, user._id);
    like = true;
    console.log(`like4${ifLike}`);
  }

  if (user === null) {
    check = false;
  } else if (user._id === item._ownerId) {
    check = true;
  }

  ctx.render(
    templateDetails(item, check, onDelete, like, onClick, numberLike, ifLike)
  );

  async function onClick(e) {
    e.preventDefault();
    numberLike += 1;
    let theaterId = c.params.id;
    const user = JSON.parse(localStorage.getItem("user"));
    ifLike = await getIfUserLikedTheater(item._id, user._id);
    if (ifLike === 0) {
      document.getElementById("total").textContent = `Likes: ${numberLike}`;
      await addLike({ theaterId }, user.accessToken);
      document.getElementById("like").diseble = true;
    }

    console.log(`123${ifLike}`);

    ctx.render(
      templateDetails(item, check, onDelete, like, onClick, numberLike, ifLike)
    );
  }

  console.log("details", ctx.params.id);
  //console.log(user._id);
  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this furniture!");
    if (choice) {
      await deleteThe(ctx.params.id, user.accessToken);
      ctx.page.redirect("/");
    }
  }
}
