let itemsData;
const containerItems = document.getElementById("container-items");
const usercart = document.getElementById("your-cart");

const showItems = (data) => {
  itemsData = data;

  const cards = data
    .map(
      (item) => `
      <div class="card" style="width: 18rem;">
        <img src="${item.image}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h3 class="card-text">${item.name}</p>
          ${
            item.stock > 0 &&
            `<button onclick='addToCart("${item.id}")'>Agregar</button>`
          }
        </div>
      </div>
      `
    )
    .join(" ");
  return (containerItems.innerHTML = cards);
};

const addToCart = (itemId) => {
  axios
    .post(`api/cart/${userData.cartId}/items/${itemId}`)
    .then(() => renderCart(itemsData))
    .catch((err) => console.log(err));
};

const renderCart = (availableItems) => {
  axios
    .get(`api/cart/${userData.cartId}`)
    .then((res) => {
      const userCart = res.data.items; // ids
      const info = userCart.map((id) =>
        availableItems.find((item) => item.id === id)
      );
      const render = info.map((i) => 
        `<li>
          ${i.name} - <button onclick='deleteItemFromCart("${i.id}")'>X</button>
        </li>`
      ).join(" ");
      return (usercart.innerHTML = render);
    })
    .catch((err) => console.log(err));
};

const deleteItemFromCart = (itemId) => {
  axios.delete(`api/cart/${userData.cartId}/items/${itemId}`)
    .then(res => renderCart(itemsData))
    .catch((err) => console.log(err));
}

axios
  .get("/api/items/")
  .then((res) => {
    showItems(res.data);
    renderCart(res.data);
  })
  .catch((err) => console.log(err));
