const baseUrl="http://localhost:3030"
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
  const response = await fetch(`http://localhost:3030/data/pets?sortBy=_createdOn%20desc&distinct=name`);

  return await response.json();
}

async function createPets(data, token) {
  const response = await fetch(`http://localhost:3030/data/pets`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });
  
}


async function getMyData(userId) {
  const response = await fetch(`http://localhost:3030/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);

  return response.json();
}
async function getData(id) {
  const response = await fetch(`http://localhost:3030/data/pets/${id}`);

  return response.json();
}

async function updatePets(data, id, token) {
  const response = await fetch(`http://localhost:3030/data/pets/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

async function deletePets(id, token) {
  const response = await fetch(`http://localhost:3030/data/pets/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  });

  return await response.json();
}

async function getPetDonateNumber(petId) {
  const response = await fetch(
    `http://localhost:3030/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`
  );

  return await response.json();
}

async function getIfUserDonate(petId, userId) {
  const response = await fetch(
    `${baseUrl}/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count
    `
  );

  return await response.json();
}

async function addDonate(data, token) {
  const response = await fetch(`${baseUrl}/data/donation`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
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
  createPets,
  updatePets,
  deletePets,
  getPetDonateNumber,
  getIfUserDonate,
  addDonate,
  logoutRequest,
  getData,
  
};
