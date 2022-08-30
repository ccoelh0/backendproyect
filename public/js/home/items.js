let userCart
const itemContainer = document.getElementById('item-container')
const cartContainer = document.getElementById('cart-container')

///////////// CART ////////////////

// Traigo el email
const getEmail = async () => {
  const data = await fetch('/api/sessions/user', {method: 'GET'})
  const res = await data.json()
  return userHasCart(res.data.email)
}

// El usuario tiene cart? 
const userHasCart = async (email) => {
  const response = await fetch('/api/cart/', {method: 'GET'})
  const carts = await response.json()
  const isUserCart = carts.data.find(x => x.email === email)
  
  if (isUserCart === undefined) {
    const res = await createCart(email)
    userCart = res.data
    return renderCart(userCart._id)
  }

  userCart = isUserCart
  return renderCart(userCart._id)
}

// Si el usuario no tiene cart... 
const createCart = async (email) => {
  const response = await fetch('/api/cart', {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email})
  })
  return await response.json()
}

const renderCart = async (idCart) => {
  const data = await fetch(`/api/cart/${idCart}`, {method: 'GET'})
  const response = await data.json()
  const items = response.data.items

  const render = items.map(x => {
    return (
      `
      <div>Producto: ${x.name}</div>
      `
    )
  }).join(' ')
  return cartContainer.innerHTML = render
}


///////////// ITEMS ////////////////

//render items
const showItem = async (api) => {
  const data = await fetch(api, { method: 'GET' })
  const items = await data.json()

  const render = items.data.map(x => {
    return (`
    <div class="card" style="width: 18rem;" id='prod'>
      <div class="card-body" id='${x._id}'>
        <img class="card-img-top" src="${x.image}" alt="Card image cap">
        <h5 class="card-title">${x.name}</h5>
        <p class="card-text">${x.price}</p>
        <button onclick="addItem()" class="btn btn-primary btn-card">Add to cart</a>
      </div>
    </div>`
    )
  }).join(' ')
  return itemContainer.innerHTML = render
}

//addITems
const addItem = async () => {
  const prod = document.getElementById('prod')
  const idProd = prod.parentElement.firstElementChild.firstElementChild.id
  userCart.items.push(idProd)
  
  await fetch(`/api/cart/${userCart._id}/items/${idProd}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userCart})
  })
  return renderCart(userCart._id)
}


///////////// FUNCIONES LLAMADO ////////////////
getEmail()
showItem('api/items/')



// const buy = () => {

// }


