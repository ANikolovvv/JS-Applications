const baseUrl = "http://localhost:3030";
async function regUsers(option) {
  const url = `http://localhost:3030/users/register`;
  const res = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(option),
  });
  try {
    if (res.ok) {
      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
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
      localStorage.clear();
      throw new Error();
    }
  } catch (error) {
    console.log(error.message);
  }

  localStorage.clear();
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

    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.log(error.message);
  }

  return res;
}
async function getAll() {
  const response = await fetch(
    `http://localhost:3030/data/albums?sortBy=_createdOn%20desc&distinct=name`
  );

  return await response.json();
}

async function createAlbum(data, token) {
  const response = await fetch(`http://localhost:3030/data/albums`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });
}

async function getMyData(userId) {
  const response = await fetch(
    `http://localhost:3030/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );

  return response.json();
}
async function getData(id) {
  const response = await fetch(`http://localhost:3030/data/albums/${id}`);

  return response.json();
}

async function updateAlbum(data, id, token) {
  const response = await fetch(`http://localhost:3030/data/albums/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

async function deleteAlbum(id, token) {
  const response = await fetch(`http://localhost:3030/data/albums/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  });

  return await response.json();
}

async function getAlbumSearch(search) {
  const query = encodeURIComponent(`name LIKE "${search}"`);
  const response = await fetch(`${baseUrl}/data/albums?where=${query}`);

  return await response.json();
}

async function logoutRequest() {
  const response = await fetch(`http://localhost:3030/users/logout`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": sessionStorage.getItem("accessToken"),
    },
  });
}
export {
  regUsers,
  resLogout,
  onLogin,
  getAll,
  getMyData,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumSearch,
  logoutRequest,
  getData,
};
