const tbody = document.getElementById('items')
const items = []

const renderItems = async (api) => {
  const data = await fetch(api, { method: 'GET' })
  const items = await data.json()
  const render = items.map(x => {
    return `
      <tr>
        <td>${x.name}</td>
        <td>$${x.price}</td>
        <td>${x.model}</td>
      </tr>
    `
  }).join(' ')
  return tbody.innerHTML = render
}

renderItems('api/items-test')
