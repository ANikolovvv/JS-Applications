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
      if(res.status===403){
        localStorage.clear();
        throw new Error()
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
    if (res.status===403) {
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
  const response = await fetch(`http://localhost:3030/data/catalog`);

  return await response.json();
}

async function createMovie(data, token) {
  const response = await fetch(`http://localhost:3030/data/catalog`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });
  
}


async function getMyData(userId) {
  const response = await fetch(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`);

  return response.json();
}
async function getData(id) {
  const response = await fetch(`http://localhost:3030/data/catalog/${id}`);

  return response.json();
}

async function updateMovie(data, id, token) {
  const response = await fetch(`http://localhost:3030/data/catalog/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

async function deleteMovie(id, token) {
  const response = await fetch(`http://localhost:3030/data/catalog/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  });

  return await response.json();
}

async function getMovieLikesNumber(movieId) {
  const response = await fetch(
    `${baseUrl}/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`
  );

  return await response.json();
}

async function getIfUserLikedMovie(movieId, userId) {
  const response = await fetch(
    `${baseUrl}/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`
  );

  return await response.json();
}

async function addLike(data, token) {
  const response = await fetch(`${baseUrl}/data/likes`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

async function removeLike(id, token) {
  const response = await fetch(`${baseUrl}/data/likes/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  });

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
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieLikesNumber,
  getIfUserLikedMovie,
  addLike,
  removeLike,
  logoutRequest,
  getData,
  
};
