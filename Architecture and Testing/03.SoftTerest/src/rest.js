const url = "http://localhost:3030/users/register";
async function regUsers(option) {
  const res = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(option),
  });
  try {
    if (res.ok) {
      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));

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
async function resLogout(token) {
  const res = await fetch(`http://localhost:3030/users/logout`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  });
  try {
    if (res.status === 403) {
      const reds = await res.json();
      localStorage.removeItem("user", JSON.stringify(reds));

      throw new Error(reds);
    }
    localStorage.clear();
  } catch (error) {
    alert(error.message);
    console.log(error.message);
  }

  return res;
}

async function onLogin(data) {
  const u = `http://localhost:3030/users/login`;

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
      localStorage.setItem("user", JSON.stringify(user));
    }
  } catch (error) {
    alert(error.message);
  }

  return res;
}
async function all() {
  let url = `http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc`;

  let res = await fetch(url);
  return await res.json();
}
async function idea(data, token) {
  let createUrl = "http://localhost:3030/data/ideas";
  const response = await fetch(createUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });
}
async function getIdea(id) {
  let getmy = `http://localhost:3030/data/ideas/${id}`;
  const response = await fetch(getmy);

  return await response.json();
}
async function deleteId(id, token) {
  const response = await fetch(`http://localhost:3030/data/ideas/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  });

  return await response.json();
}

export { deleteId, all, regUsers, resLogout, onLogin, idea, getIdea };
