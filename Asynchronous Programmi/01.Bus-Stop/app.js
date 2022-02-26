function getInfo() {

  const stop = document.getElementById("stopId");
  const stopName=document.getElementById('stopName');
  const bus = document.getElementById("buses");

  const url = "http://localhost:3030/jsonstore/bus/businfo/";
   busStop();

  async function busStop() {
    const id = stop.value;
    const res = await fetch(`${url}${id}`);
    bus.replaceChildren("");
    try {
      if (res.status!=200) {
        throw new Error();
        
      }
      const data = await res.json();
      stopName.textContent = `${data.name}`;
      const buses = data.buses;
      Object.entries(buses).forEach(([k, v]) => {
        const li = document.createElement("li");
        li.textContent = `Bus ${k} arrives in ${v}`;
        bus.appendChild(li);
      });
    
    } catch (e) {
        stopName.textContent = e;
      //console.log(e);
    }
    stop.value='';
  }
}
