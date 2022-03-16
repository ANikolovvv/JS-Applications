import { body, front } from "./app.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import { getBook, putdata } from "./requste.js";
export async function editFunc(x) {
  const book = Object.values(await getBook(x.t._id));
  //console.log(book);
  const temp = () => html` <form id="edit-form">
    <input type="hidden" name="id" />
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." />
    <input type="submit" value="Save" />
  </form>`;

  render(temp(), body);
  const form = body.querySelector("form");
  const title = form.querySelector('input[name="title"]');
  const author = form.querySelector('input[name="author"]');
  title.value = book[0];
  author.value = book[1];
  const btn = form.querySelector('input[type="submit"]');

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const option = { title: title.value, author: author.value };
    putdata(option, book[2]);
    front();
  });
}
