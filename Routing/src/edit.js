import { html } from "./lib.js";
import { getData, updateMovie } from "./requests.js";

const templateEdit = (onSubmit, data) => html` <div class="row space-top">
    <div class="col-md-12">
      <h1>Edit Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <input
            class="form-control"
            id="new-make"
            type="text"
            name="make"
            value=${data.make}
          />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input
            class="form-control is-valid"
            id="new-model"
            type="text"
            name="model"
            value=${data.model}
          />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input
            class="form-control is-invalid"
            id="new-year"
            type="number"
            name="year"
            value=${data.year}
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description"
            >Description</label
          >
          <input
            class="form-control"
            id="new-description"
            type="text"
            name="description"
            value=${data.description}
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input
            class="form-control"
            id="new-price"
            type="number"
            name="price"
            value=${data.price}
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input
            class="form-control"
            id="new-image"
            type="text"
            name="img"
            value=${data.img}
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material"
            >Material (optional)</label
          >
          <input
            class="form-control"
            id="new-material"
            type="text"
            name="material"
            value=${data.material}
          />
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
      </div>
    </div>
  </form>`;

export function editPage(ctx) {
  console.log("edit", ctx.params.id);
  async function data() {
    const dataFur = await getData(ctx.params.id);
    ctx.render(templateEdit(onSubmit, dataFur));
  }

  data();

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = [...formData.entries()].reduce(
      (a, [k, v]) => Object.assign(a, { [k]: v }),
      {}
    );
    const parent = e.target;
    const inputs = Array.from(parent.querySelectorAll("input"));

    if (data.make.length > 3) {
      inputs[0].className = "form-control is-valid";
    } else {
      inputs[0].className = "form-control is-invalid";
    }
    if (data.model.length > 3) {
      inputs[1].className = "form-control is-valid";
    } else {
      inputs[1].className = "form-control is-invalid";
    }
    if (Number(data.year) >= 1950 && Number(data.year) <= 2050) {
      inputs[2].className = "form-control is-valid";
    } else {
      inputs[2].className = "form-control is-invalid";
    }
    if (data.description.length > 10) {
      inputs[3].className = "form-control is-valid";
    } else {
      inputs[3].className = "form-control is-invalid";
    }
    if (Number(data.price) >= 0) {
      inputs[4].className = "form-control is-valid";
    } else {
      inputs[4].className = "form-control is-invalid";
    }
    if (data.img !== "") {
      inputs[5].className = "form-control is-valid";
    } else {
      inputs[5].className = "form-control is-invalid";
    }
    const some = inputs.map((x) => x.className === "form-control is-invalid");
    if (some.includes(true) === false) {
      data.make = inputs[0].value;
      data.model = inputs[1].value;
      data.year = inputs[2].value;
      data.description = inputs[3].value;
      data.price = inputs[4].value;
      data.img = inputs[5].value;
      data.material = inputs[6].value;
      console.log(data);
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await updateMovie(data, ctx.params.id, user.accessToken);
      try {
        if (res.status !== 200) {
          throw new Error();
        }
      } catch (error) {
        console.log(error.message);
      }
      e.target.reset();
      ctx.page.redirect("/");
    }
  }
}
