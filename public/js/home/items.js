const itemContainer = document.getElementById('item-container')
let userCart

const getEmail = async () => {
  const response = await fetch('/api/sessions/user', {method: 'GET'})
  return await response.json()
}

const getCarts = async (email) => {
  const response = await fetch('/api/cart/', {method: 'GET'})
  const data = await response.json()
  const carts = await data
  const isCartCreate = carts.data.find(x => x.email === email)
  
  if (isCartCreate === undefined) {
    const newCart = await createCart(email)
    return userCart = newCart
  }

  return userCart = isCartCreate
}

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

getUsername()
  .then(res => {
    const email = res.data.email
    return getCarts(email)
  })
  .catch(err => console.log(err))

const showItem = async (api) => {
  const data = await fetch(api, { method: 'GET' })
  const items = await data.json()

  const render = items.data.map(x => {
    return (`
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${x.image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${x.name}</h5>
        <p class="card-text">${x.price}</p>
        <button onclick="(e) => addToCart(e)" class="btn btn-primary btn-card">Add to cart</a>
      </div>
    </div>`
    )
  }).join(' ')
  return itemContainer.innerHTML = render
}

showItem('api/items/')



