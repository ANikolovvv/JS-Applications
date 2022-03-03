const url = "http://localhost:3030/jsonstore/collections/books";

const loadBook = document.getElementById("loadBooks");
const tbody = document.querySelector("tbody");
const form = document.querySelector("form");
//console.log(form)

form.addEventListener("submit", postBook);

async function postBook(e) {
  e.preventDefault();
  //console.log(e.currentTarget)
  const target = e.currentTarget;

  const formData = new FormData(e.currentTarget);
  const title = formData.get("title").trim();
  const author = formData.get("author").trim();
  if (title !== "" && author !== "") {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, author}),
    });

    target.reset();
    const data = await res.json();
  }
}
tbody.replaceChildren("");

loadBook.addEventListener("click", load);

async function load(e) {
  e.preventDefault();
  const res = await fetch(url);
  const data = Object.values(await res.json());
  tbody.replaceChildren("");
  //console.log('yes')
  data.forEach((book) => {
    const tr = document.createElement("tr");

    const td = document.createElement("td");
    td.textContent = book.title;
    const td1 = document.createElement("td");
    td1.textContent = book.author;
    const tdBtns = document.createElement("td");
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.addEventListener("click", (e) => {
      e.preventDefault();
      const info = { title: book.title, author: book.author };
      console.log(info)
      putData(book._id, info);
    });

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.addEventListener("click", (e) => {
      e.preventDefault();
     const id = book._id;
      console.log("yes");
      remove(id);
    });

    tdBtns.appendChild(btnEdit);
    tdBtns.appendChild(btnDelete);
    tr.appendChild(td);
    tr.appendChild(td1);
    tr.appendChild(tdBtns);
    tbody.appendChild(tr);
  });
}

{/* <form>
<h3>FORM</h3>
<label>TITLE</label>
<input type="text" name="title" placeholder="Title...">
<label>AUTHOR</label>
<input type="text" name="author" placeholder="Author...">
<button>Submit</button>
</form> */}
async function putData(id, info) {
  form.replaceChildren('');

  const h3 =document.createElement("h3");
  h3.textContent = "Edit FORM";
  const label =document.createElement("label");
  label.textContent = "TITLE";
  const inputT =document.createElement("input");
  inputT.type='text';
  inputT.name='title';
  inputT.placeholder="Title...";
  

  const labelA =document.createElement("label");
  labelA.textContent = "AUTHOR";
  const inputA =document.createElement("input");
  inputA.type='text';
  inputA.name='author';
  inputA.placeholder="Author";


  const button = document.createElement("button");
  button.textContent = "Save";
  form.appendChild(h3);
  form.appendChild(label);
  form.appendChild(inputT);
  form.appendChild(labelA);
  form.appendChild(inputA);
  form.appendChild(button);


  
  button.addEventListener('click',(e)=>{
    const option = { title: inputT.value, author: inputA.value };
    inputT.value='';
    inputA.value='';
    e.preventDefault();
    resEdit(id,option)
  });
  async function resEdit(id,option) {
    console.log(id)
    console.log(option)

    const res = await fetch(
      `http://localhost:3030/jsonstore/collections/books/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(option),
      }
    );
 
  }

}
// async function getBook(id) {
//   const books = await fetch(
//     `http://localhost:3030/jsonstore/collections/books/${id}`
//   );

//   return await books.json();
// }
async function remove(id) {
  console.log(id);
  const response = await fetch(
    `http://localhost:3030/jsonstore/collections/books/${id}`,
    {
      method: "delete",
    }
  );

  const res = await response.json();
  return res;
}
