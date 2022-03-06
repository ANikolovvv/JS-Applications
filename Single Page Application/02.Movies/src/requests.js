const baseUrl = "http://localhost:3030";
const moviesUrl = `${baseUrl}/data/movies`;
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
      localStorage.setItem('user', JSON.stringify(user));
    //   localStorage.setItem("accessToken", user.accessToken);
    //   localStorage.setItem("_id", user._id);
    //   localStorage.setItem("email", user.email);
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
    if (res.ok) {
      const user = await res.json();
      localStorage.setItem('user', JSON.stringify(user));
      //localStorage.setItem("accessToken", user.accessToken);
     //localStorage.setItem("_id", user._id);
      //localStorage.setItem("email", user.email);
    }
  } catch (error) {
    alert(error.message);
  }

  return res;
}
async function getMovies() {
  const response = await fetch(moviesUrl);

  return await response.json();
}

async function createMovie(data,token) {
  const response = await fetch(moviesUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });
}

async function getMovieData(id) {
  const response = await fetch(`${moviesUrl}/${id}`);

  return response.json();
}

async function updateMovie(data, id,token) {
  const response = await fetch(`${moviesUrl}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

async function deleteMovie(id,token) {
  const response = await fetch(`${moviesUrl}/${id}`, {
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

async function addLike(data,token) {
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

async function removeLike(id,token) {
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
  getMovies,
  getMovieData,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieLikesNumber,
  getIfUserLikedMovie,
  addLike,
  removeLike,
  logoutRequest,
};
