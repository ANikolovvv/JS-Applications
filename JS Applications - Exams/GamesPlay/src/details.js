import { html } from "./lib.js";
import { addLike, deleteMovie, getData, getGamesComment } from "./requests.js";

const templateDetails = (
  item,
  onDelete,
  comments,
  onSubmit,
  person,
  user
) => html`
  <section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src=${item.imageUrl} />
        <h1>${item.title}</h1>
        <span class="levels">MaxLevel: ${item.maxLevel}</span>
        <p class="type">${item.category}</p>
      </div>

      <p class="text">${item.summary}</p>

      <!-- Edit/Delete buttons ( Only for creator of this game )  -->
      ${person
        ? html` <div class="buttons">
            <a href="/edit/${item._id}" class="button">Edit</a>
            <a href="#" @click=${onDelete} class="button">Delete</a>
          </div>`
        : ""}

      <div class="details-comments">
        <h2>Comments:</h2>

        <ul>
          <!-- list all comments for current game (If any) -->
          ${comments.length > 0
            ? comments.map(
                (x) => html`<li class="comment">
                  <p>Content: ${x.comment}</p>
                </li>`
              )
            : html`<p class="no-comment">No comments.</p>`}
        </ul>

        <!-- Display paragraph: If there are no games in the database -->
      </div>
    </div>
    ${user && user._id !== item._ownerId
      ? html` <article class="create-comment">
          <label>Add new comment:</label>
          <form @submit=${onSubmit} class="form">
            <textarea
              id="commentInput"
              name="comment"
              placeholder="Comment......"
            ></textarea>
            <input class="btn submit" type="submit" value="Add Comment" />
          </form>
        </article>`
      : ""}

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
  </section>
`;

export async function detailsPage(ctx) {
  const comments = await getGamesComment(ctx.params.id);
  const user = JSON.parse(localStorage.getItem("user"));
  const item = await load(ctx.params.id);
  let person = false;

  if (user === null) {
    person = false;
  } else if (user._id == item._ownerId) {
    person = true;
  }

  ctx.render(templateDetails(item, onDelete, comments, onSubmit, person, user));
  console.log("details", ctx.params.id);
  //console.log(user._id);
  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this furniture!");
    if (choice) {
      await deleteMovie(ctx.params.id, user.accessToken);
      ctx.page.redirect("/home");
    }
  }
  async function load(id) {
    const getById = await getData(id);

    return getById;
  }
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment").trim();
    console.log(comment);
    const user = JSON.parse(localStorage.getItem("user"));
    const data = { gameId: ctx.params.id, comment };

     await addLike(data, user.accessToken);
    const item = await load(ctx.params.id);
    const comments = await getGamesComment(ctx.params.id);
    ctx.render(templateDetails(item, onDelete, comments, onSubmit));

    e.target.reset();
  }
}
