const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;
async function makePost(option) {
  const res = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(option),
  });
  try {
    if (res.ok) {
      const user = await res.json();
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("_id", user._id);
      localStorage.setItem("post", user.post);
      //localStorage.setItem('user',JSON.stringify(user))
      //console.log(user)
    } else {
      const ress = await res.json();
      throw new Error(ress);
    }
  } catch (err) {
    console.log(err.message);
  }
  return res;
}


async function myComments(data) {
  const u = `http://localhost:3030/jsonstore/collections/myboard/comments`;

  const res = await fetch(u, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    if (res.status === 403) {
      const reds = await res.json();
      throw new Error(reds);
    }
    if (res.ok) {
      const user = await res.json();
    }
  } catch (error) {
    alert(error.message);
  }

  return res;
}
async function all() {
  let url = `http://localhost:3030/jsonstore/collections/myboard/posts`;

  let res = await fetch(url);
  return await res.json();
}
async function allComen() {
  const url = `http://localhost:3030/jsonstore/collections/myboard/comments`;

  let res = await fetch(url);
  return await res.json();
}




export { allComen, all, makePost, myComments,};
