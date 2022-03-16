import { editFunc } from "./edit.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import { deleteId, getAllBooks, postdata } from "./requste.js";

export const body = document.querySelector("body");

export async function front() {
  const dates = Object.values(await getAllBooks());
  const ver = dates.map((t) => ({ t, class: "" }));
  let id = 0;
  for (const key of ver) {
    if (key._id === undefined) {
      id++;
      key._id = id;
    }
  }
  const template = (ver) => html`
    <button id="loadBooks" @click=${(e) => allFunc()}>LOAD ALL BOOKS</button>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${ver.map(
          (x) => html` <tr>
            <td>${x.t.title}</td>
            <td>${x.t.author}</td>
            <td>
              <button @click=${(e) => editFunc(x)}>Edit</button>
              <button @click=${(e) => deleteData(x)}>Delete</button>
            </td>
          </tr>`
        )}
      </tbody>
    </table>
    <form id="add-form">
      <h3>Add book</h3>
      <label>TITLE</label>
      <input type="text" name="title" placeholder="Title..." />
      <label>AUTHOR</label>
      <input type="text" name="author" placeholder="Author..." />
      <input type="submit" value="Submit" />
    </form>
    ;
  `;

  render(template(ver), body);

  const form = body.querySelector("form");
  form.addEventListener("submit", addForm);
  // @click=${(e) => onClick()}
}
front();
async function deleteData(x) {
  deleteId(x.t._id);
  front();
}
function addForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const title = formData.get("title").trim();
  const author = formData.get("author").trim();
  const data = { title, author };
  postdata(data);
  e.target.reset();
  front();
}

function allFunc() {
  front();
}
