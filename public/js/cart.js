const api = '/api/cart/'
const idBuyer = '62a0bfe4930fcf6b70fe2200'

const renderCart = async (api, id) => {
    const cart = await fetch(`${api}${id}`, {method: 'GET'})
    const res = await cart.json()
    const map = res.data.items.map((x, i) => {
        return `
        <tr>
            <th scope="row">${i}</th>
            <td><img src=${x.image} class="card-img-top" alt="${x.name}"></td>
            <td>${x.name}</td>
            <td>${x.price}</td>
        </tr>
        `
    })
    return document.getElementById('tbody').innerHTML = map
}

renderCart(api, idBuyer)