let itemToUpdate = "default";

const selectToUpdate = document.getElementById("select-to-update");
const itemNameToUpdate = document.getElementById("new-name");
const descriptionToUpdate = document.getElementById("new-description");
const priceToUpdate = document.getElementById("new-price");
const imageToUpdate = document.getElementById("new-image");
const stockToUpdate = document.getElementById("new-stock");
const timestampToUpdate = document.getElementById("new-timestamp");
const formToUpdate = document.getElementById("form-to-udpate");

const updateItem = (newItem) => axios.put(`api/items/${itemToUpdate}`, newItem);

const showItemsToUpdate = (data) => {
  const items = data.map(
    (x) => `<option value="${x.id}">${x.name} - ${x.id}</option>`
  );
  const render = ['<option selected value="default">Items</option>', ...items];
  return (selectToUpdate.innerHTML = render);
};

const onChangeToUpdate = (value) => {
  if (value !== "default") return (itemToUpdate = value);
  return (itemToUpdate = "default");
};

const onUpdate = (e) => {
  e.preventDefault();

  let newItem;

  const formInputValues = {
    name: itemNameToUpdate.value,
    description: descriptionToUpdate.value,
    price: priceToUpdate.value,
    image: imageToUpdate.value,
    stock: stockToUpdate.value,
    timestamp: timestampToUpdate.value,
  };

  const arrayOfKeys = Object.keys(formInputValues);

  arrayOfKeys.map(
    (x) =>
      formInputValues[x].length !== 0 &&
      (newItem = { ...newItem, [x]: formInputValues[x] })
  );

  if (itemToUpdate !== "default") {
    return updateItem(newItem)
      .then(() => getItems())
      .catch((err) => console.log(err));
  }
};

formToUpdate.addEventListener("submit", (e) => onUpdate(e));
selectToUpdate.addEventListener("change", (e) =>
  onChangeToUpdate(e.target.value)
);
