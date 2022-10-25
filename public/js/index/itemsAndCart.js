let itemsData;
const containerItems = document.getElementById("container-items");
const usercart = document.getElementById("your-cart");
const finishPurchase = document.getElementById("finish-purchase");

const getItemsService = () => axios.get("/api/items/");
const addToCartService = (itemId) => axios.post(`api/cart/${userData.cartId}/items/${itemId}`);
const getCartService = () => axios.get(`api/cart/${userData.cartId}`);
const deleteItemService = (itemId) => axios.delete(`api/cart/${userData.cartId}/items/${itemId}`)
const finishPurchaseService = () => axios.post(`api/cart/buy-cart/${userData.cartId}`)
 
const handOutData = (data) => {
  itemsData = data;
  showItems(data);
  renderCart(data);
};

const showItems = (data) => {
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

const addToCart = (itemId) => addToCartService(itemId).then(() => renderCart(itemsData)).catch((err) => console.log(err));

const renderCart = (availableItems) => {
  getCartService()
    .then((res) => {
      const userCart = res.data.items; 
      const info = userCart.map((x) => {
        const data = availableItems.find((item) => item.id === x.id)
        return ({...data, amount: x.amount})
      });
      const render = info.map((x) =>`<li> ${x.name} - cantidad: ${x.amount} <button onclick='deleteItemFromCart("${x.id}")'>X</button></li>`).join(" ");
      return (usercart.innerHTML = render);
    })
    .catch((err) => console.log(err));
};

const deleteItemFromCart = (itemId) => deleteItemService(itemId).then(() => renderCart(itemsData)).catch((err) => console.log(err));

const onFinishPurchase = () => finishPurchaseService().then(() => renderCart(itemsData)).catch((err) => console.log(err));

getItemsService().then((res) => handOutData(res.data)).catch((err) => console.log(err))
finishPurchase.addEventListener("click", () => onFinishPurchase());