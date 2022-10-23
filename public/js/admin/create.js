const itemName = document.getElementById("name");
const description = document.getElementById("description");
const price = document.getElementById("price");
const image = document.getElementById("image");
const stock = document.getElementById("stock");
const timestamp = document.getElementById("timestamp");
const form = document.getElementById("form-to-create");

const onCreate = (e) => {
  e.preventDefault();

  const validations =
    itemName.value.length !== 0 ||
    description.value.length !== 0 ||
    price.value.length !== 0 ||
    image.value.length !== 0 ||
    stock.value.length !== 0 ||
    timestamp.value.length !== 0;

  if (!validations) return false;

  const newItem = {
    name: itemName.value,
    description: description.value,
    price: price.value,
    image: image.value,
    stock: stock.value,
    timestamp: timestamp.value,
  };

  saveItem(newItem)
    .then(() => getItems())
    .catch((err) => console.log(err));
};

const saveItem = (newItem) => axios.post("api/items/", newItem);

form.addEventListener("submit", (e) => onCreate(e));