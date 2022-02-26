async function lockedProfile() {

    const ulr = `http://localhost:3030/jsonstore/advanced/profiles`;
    let main=document.getElementById('main');
    let fakePerson=document.querySelector('.profile');
    fakePerson.remove();
  
    const res = await fetch(ulr);
    const data = await res.json();
    try {
      if (res.status !== 200) {
        throw new Error();
      }
      Object.keys(data).forEach((k,i)=>{
          let profile=data[k];
          let html=create(i+1,profile.username,profile.email,profile.age);
  
          main.appendChild(html)
      })
    } catch (error) {}
  
    function create(index, username, email, age) {
      let divP = document.createElement("div");
      divP.setAttribute("class", "profile");
  
      let img = document.createElement("img");
      img.src = "./iconProfile2.png";
      img.setAttribute("class", "userIcon");
  
      let lockLabel = document.createElement("label");
      lockLabel.textContent = "Lock";
  
      let lockInput = document.createElement("input");
      lockInput.type = "radio";
      lockInput.name = `user${index}Locked`;
      lockInput.value = "Lock";
      lockInput.checked = true;
  
      let unlockLabel = document.createElement("label");
      unlockLabel.textContent = "Unlock";
  
      let unlockInput = document.createElement("input");
      unlockInput.type = "radio";
      unlockInput.name = `user${index}Locked`;
      unlockInput.value = "unlock";
  
      let br = document.createElement("br");
      let hr = document.createElement("hr");
  
      let userLabel = document.createElement("label");
      userLabel.textContent = "Username";
  
      let userInput = document.createElement("input");
      userInput.type = "text";
      userInput.name = `user${index}Username`;
      userInput.value = username;
      userInput.readOnly = true;
      userInput.disabled = true;
  
      let hiddeDiv = document.createElement("div");
      hiddeDiv.id = `user${index}HiddenFilds`;
  
      let hiddenHr = document.createElement("hr");
  
      let hidenLabel = document.createElement("label");
      hidenLabel.textContent = "Email";
  
      let hiddenInput = document.createElement("input");
      hiddenInput.type = "email";
      hiddenInput.name = `user${index}Email`;
      hiddenInput.value = email;
      hiddenInput.readOnly = true;
      hiddenInput.disabled = true;
  
      let ageLabel = document.createElement("label");
      ageLabel.textContent = "Age";
  
      let hiddenAgeInput = document.createElement("input");
      hiddenAgeInput.type = "email";
      hiddenAgeInput.name = `user${index}Age`;
      hiddenAgeInput.value = age;
      hiddenAgeInput.readOnly = true;
      hiddenAgeInput.disabled = true;
  
      hiddeDiv.appendChild(hiddenHr);
      hiddeDiv.appendChild(hidenLabel);
      hiddeDiv.appendChild(hiddenInput);
      hiddeDiv.appendChild(ageLabel);
      hiddeDiv.appendChild(hiddenAgeInput);
  
      let showMoreBtn = document.createElement("button");
      showMoreBtn.textContent = "Show more";
  
      showMoreBtn.addEventListener('click',show)
  
      divP.appendChild(img);
      divP.appendChild(lockLabel);
      divP.appendChild(lockInput);
      divP.appendChild(unlockLabel);
      divP.appendChild(unlockInput);
      divP.appendChild(br);
      divP.appendChild(hr);
      divP.appendChild(userLabel);
      divP.appendChild(userInput);
      divP.appendChild(hiddeDiv);
      divP.appendChild(showMoreBtn);
  
      return divP
    }
  
    function show(e) {
        let person=e.target.parentElement;
        let tar=e.target
        let hid=e.target.previousElementSibling;
        let radio=person.querySelector('input[type="radio"]:checked')
           
        if(radio.value!=='unlock'){
          return
        }
        tar.textContent=tar.textContent==='Show more' ?'Hide it':'Show more'
        hid.style.display=hid.style.display==='block'?'none': 'block'
    }
  }