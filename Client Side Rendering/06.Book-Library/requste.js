const url = "http://localhost:3030/jsonstore/collections/books";
async function getAllBooks() {
  const res = await fetch(url);
  return await res.json();
}
async function getBook(id) {
  const u=`http://localhost:3030/jsonstore/collections/books/${id}`
  const res = await fetch(u);
  return await res.json();
}
async function postdata(text) {
  const res = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(text),
  });
  try {
    if (!res.ok) {
      throw new Error();
    }

    return res.json();
  } catch (error) {
    alert("Houston we have a problem!!!");
    console.log(error.message);
  }
}
async function putdata(text,id) {
  const u=`http://localhost:3030/jsonstore/collections/books/${id}`
  const res = await fetch(u, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(text),
  });
  try {
    if (!res.ok) {
      throw new Error();
    }

    return res.json();
  } catch (error) {
    alert("Houston we have a problem!!!");
    console.log(error.message);
  }
}
async function deleteId(id) {
  const u=`http://localhost:3030/jsonstore/collections/books/${id}`
  const response =await fetch(u, {
    method: "delete",
  
  });

  return  await response.json()
}
export { getAllBooks,getBook, postdata ,putdata,deleteId};
