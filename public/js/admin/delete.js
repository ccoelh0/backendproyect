let itemToDelete;
const selectToDelete = document.getElementById("selecte-to-delete");
const deleteButton = document.getElementById("button-delete");

const showItemsToDelete = (data) => {
  const items = data.map((x) => `<option value="${x.id}">${x.name} - ${x.id}</option>`);
  const render = ['<option selected value="default">Items</option>', ...items];
  return (selectToDelete.innerHTML = render);
};

const onSelect = (value) => {
  if (value !== 'default') {
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.remove("btn-secondary");
    return (itemToDelete = value);
  } else {
    deleteButton.classList.remove("btn-danger");
    deleteButton.classList.add("btn-secondary");
   return (itemToDelete = "default");
  }
};

const onDelete = () => {
  if (itemToDelete !== 'default') {
    axios.delete(`api/items/${itemToDelete}`)
      .then(res => {
        console.log(res)
        getItems()
      })
      .catch(err => console.log(err))
  }
}

selectToDelete.addEventListener("change", (e) => onSelect(e.target.value));
deleteButton.addEventListener("click", () => onDelete());

getItems()