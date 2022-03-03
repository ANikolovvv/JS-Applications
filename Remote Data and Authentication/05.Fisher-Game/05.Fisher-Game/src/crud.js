
async function regUsers(option) {
    const url = "http://localhost:3030/users/register";
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
      localStorage.setItem("email", user.email);
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
async function resLogout() {
  const res = await fetch(`http://localhost:3030/users/logout`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("accessToken"),
    },
  });

  localStorage.clear();
  return res;
}

async function onSubmit(data) {
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
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("_id", user._id);
      localStorage.setItem("email", user.email);
    }
  
  } catch (error) {
    alert(error.message);
  }

  return res;
}
async function all(){
    let url=`http://localhost:3030/data/catches`;

      let res=await fetch(url)
      return await res.json()
}
async function idea (data) {
    let createUrl="http://localhost:3030/data/catches"
	const response = await fetch(createUrl, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': localStorage.getItem('accessToken')
		},
		body: JSON.stringify(data)
	})
    
}
async function putIdea (id,data) {
    let createUrl=`http://localhost:3030/data/catches/${id}`
	const response = await fetch(createUrl, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': localStorage.getItem('accessToken')
		},
		body: JSON.stringify(data)
	})
    
}
async function getIdea (id) {
    let getmy=`http://localhost:3030/data/ideas/${id}`
	const response = await fetch(getmy)

	return await response.json()
}
async function deleteId (id) {
	const response = await fetch(`http://localhost:3030/data/catches/${id}`, {
		method: 'delete',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': localStorage.getItem('accessToken')
		},
	})

	return await response.json()
}

export {deleteId,all, regUsers,putIdea, resLogout, onSubmit,idea ,getIdea};