const firstN=document.querySelector('input[name="firstName"]');
const lastN=document.querySelector('input[name="lastName"]');
const facultyNum=document.querySelector('input[name="facultyNumber"]');
const grade=document.querySelector('input[name="grade"]');
const tbody=document.querySelector('tbody');
const btn=document.getElementById('submit');

const url='http://localhost:3030/jsonstore/collections/students';

async function getAll() {
    const res=await fetch(url);
    const data=Object.values(await res.json());

    data.forEach(p=>{
        const tr=document.createElement('tr');

        const td=document.createElement('td');
        td.textContent=p.firstName;
        const td1=document.createElement('td');
        td1.textContent=p.lastName;
        const td2=document.createElement('td');
        td2.textContent=p.facultyNumber;
        const td3=document.createElement('td');
        td3.textContent=p.grade;

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
       
    })
}
  btn.addEventListener('click',newPerson);
  async function newPerson(e) {
      e.preventDefault();
      if(firstN.value!==''&& lastN.value!=='' && !isNaN(facultyNum.value)&& !isNaN(grade.value)){
          const info={
              firstName:firstN.value,
              lastName:lastN.value,
              facultyNumber:facultyNum.value,
              grade:grade.value
          };
          firstN.value='';
          lastN.value='';
          facultyNum.value='';
          grade.value='';
          
          const res=await fetch(url,{
              method:'post',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify(info)
          });
          try {
              if(!res.ok){
                  alert('Error')
              }
              const data=await res.json();
              tbody.replaceChildren('');
              getAll();
          } catch (error) {
              
          }
          //console.log(isNaN(grade.value))
      }

  }
getAll();