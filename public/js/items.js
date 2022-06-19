const apiItems = '/api/items/'
const idBuyer = '62a0bfe4930fcf6b70fe2200'

const renderItems = async (api) => {
    const items = await fetch(api, {method: 'GET'})
    const res = await items.json()

    const itemsMap = res.data.map((x) => `
        <div class="card" style="width: 18rem;">
            <img src=${x.image} class="card-img-top" alt="${x.name}">
            <div class="card-body">
                <h5 class="card-title">${x.name}</h5>
                <button class="btn btn-primary" id="item-${x._id}">Add to cart</a>
            </div>
        </div>
    `)

    return document.getElementById('cards').innerHTML = itemsMap
}

renderItems(apiItems)


