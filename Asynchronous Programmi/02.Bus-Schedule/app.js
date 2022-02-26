function solve() {
    const departs = document.getElementById("depart");
    const arrives = document.getElementById("arrive");
    const span = document.querySelector("#info span");
    let stop = {
      next: "depot",
    };
  
    async function depart() {
      departs.disabled = true;
      const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
      const res = await fetch(url);
      try {
          if(res.status !==200){
              throw new Error('');
          }
          
        stop = await res.json();
        //console.log(stop)
        span.textContent = `Next stop ${stop.name}`;
        arrives.disabled = false;
      } catch (err) {
        span.textContent = err;
      }
    }
  
    function arrive() {
      span.textContent = `Arriving at ${stop.name}`;
  
      departs.disabled = false;
      arrives.disabled = true;
      //console.log("Arrive TODO...");
    }
  
    return {
      depart,
      arrive,
    };
  }
  
  let result = solve();