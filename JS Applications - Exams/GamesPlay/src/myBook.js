import { html, until } from "./lib.js";
import { getAll, getMyData } from "./requests.js";

const templateBook = (items,len) => html`
  <section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    ${len>0 ? html`<ul class="my-books-list">
      ${items.map(x=>tempMyBooks(x))}
    </ul>`:html`
    <!-- Display paragraph: If the user doesn't have his own books  -->
    <p class="no-books">No books in database!</p>`}
  </section>
`;
const tempMyBooks = (item) => html` <li class="otherBooks">
  <h3>${item.title}</h3>
  <p>Type: ${item.type}</p>
  <p class="img"><img src=${item.imageUrl} /></p>
  <a class="button" href="/details/${item._id}">Details</a>
</li>`;
export async function bookPage(ctx) {

  const user = JSON.parse(localStorage.getItem("user"));
  let  items = await getMyData(user._id);
  ctx.render(templateBook(items,items.length));

  console.log("myBook");
  console.log(items)
}

