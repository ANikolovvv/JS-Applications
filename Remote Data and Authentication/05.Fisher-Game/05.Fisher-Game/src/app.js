import { all, deleteId, idea, putIdea, resLogout } from "./crud.js";


const links={
    "register":document.getElementById('register'),
    "login":document.getElementById('login'),
    "logout":document.getElementById('logout'),
}
const catches=document.getElementById('catches');
const person=localStorage.getItem('_id');

catches.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.tagName==='BUTTON'){
        if(e.target.textContent==='Update'){
            const array=e.target.parentNode.querySelectorAll('input');
            console.log(array)
           const opti={
            angler:array[0].value,
            weight:array[1].value,
            species:array[2].value,
            location:array[3].value,
            bait:array[4].value,
            captureTime:array[5].value,
           }
           let dataId = e.target.id
           putIdea(dataId,opti)
          
           allData()
           console.log(dataId)
          
        }else{
            let v = e.target.id
            console.log(v)
            deleteId(v)
           // console.log(dataId)
        }
    }
})


const addBtn=document.querySelector('.add');

const addCatch=document.getElementById('addForm');

addCatch.addEventListener('submit',addFish);

async function addFish(e){
    e.preventDefault();
    const formData=new FormData(e.target);
    const angler=formData.get("angler");
    const weight=formData.get("weight");
    const species=formData.get("species");
    const location=formData.get("location");
    const bait=formData.get("bait");
    const captureTime=formData.get("captureTime");
    const option={
        angler,weight,species,location,bait,captureTime
    };
    idea(option);
    addCatch.reset();
    allData();
}

 const btnLogout=document.getElementById('logout');

 btnLogout.addEventListener('click',(e)=>{
     e.preventDefault();
     resLogout()
 })

 links['register'].style.display='none';
 links['login'].style.display='none';

  //console.log(person);
  async function allData() {
      const getData=Object.values(await all());
      const arr=[];
      getData.forEach(x=>{
          arr.push(domElement(x));
      })
    catches.innerHTML=arr.join('\n');
  }


  allData()
 function domElement(info) {
     console.log(person)
 
      let dom=''
      if(info._ownerId===person){
         dom=`<div class="catch">
        <label>Angler</label>
        <input type="text" class="angler" value=${info.angler} >
        <label>Weight</label>
        <input type="text" class="weight" value=${info.weight} >
        <label>Species</label>
        <input type="text" class="species" value=${info.species}>
        <label>Location</label>
        <input type="text" class="location" value=${info.location}>
        <label>Bait</label>
        <input type="text" class="bait" value=${info.bait}>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value=${info.captureTime}>
        <button class="update" id=${info._id} >Update</button>
        <button class="delete" id=${info._id} >Delete</button>
    </div>`;
  
           
      
      }else{
         dom=`<div class="catch">
        <label>Angler</label>
        <input type="text" class="angler" value=${info.angler} disabled>
        <label>Weight</label>
        <input type="text" class="weight" value=${info.weight} disabled>
        <label>Species</label>
        <input type="text" class="species" value=${info.species} disabled>
        <label>Location</label>
        <input type="text" class="location" value=${info.location} disabled>
        <label>Bait</label>
        <input type="text" class="bait" value=${info.bait} disabled>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value=${info.captureTime} disabled>
        <button class="update" data-id=${info._ownerId} disabled>Update</button>
        <button class="delete" data-id=${info._ownerId} disabled>Delete</button>
    </div>`;
      }
      if(person){
         addBtn.disabled=false;
      }
    
   
    return dom
 }
