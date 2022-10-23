const socket = io();

socket.on('data-items', data => {
    showItems(data)
})

const showItems = array => {
    let itemMapped = array.map(x => `
        <tr>
            <td>${x.name}</td>
            <td>${x.price}</td>
            <td><img style='width: 100px' src='${x.image}' alt='Imagen ilustrativa del producto'></td>
            <td>${x.description}</td>
            <td>${x.stock}</td>
        </tr>
        `
    ).join(' ')
    document.getElementById('itemsTable').innerHTML = itemMapped
}; 

const addItem = () => {
    let name = document.getElementById('itemName').value
    let price = document.getElementById('itemPrice').value
    let image = document.getElementById('itemImg').value
    let description = document.getElementById('itemDesc').value
    let stock = document.getElementById('itemStock').value
    let code = document.getElementById('itemCode').value
    const obj = {
        name, price, image, description, stock, code
    }
    name = document.getElementById('itemName').value = ''
    price = document.getElementById('itemPrice').value = ''
    img = document.getElementById('itemImg').value = ''
    description = document.getElementById('itemDesc').value = '' 
    stock = document.getElementById('itemStock').value = ''
    code = document.getElementById('itemCode').value = ''
    socket.emit('submit-item', obj)
}

document.querySelector('#formToAddItem').addEventListener('submit', (e) => {
    e.preventDefault()
    addItem()
})

//-------------------------------------------

// CHAT

socket.on('data-chat', data => {
    showMessages(data)
});

const showMessages = array => {
    let messages = array.map(x => `
            <tr>
                <th scope="row">${x.id}</th>
                <td>${x.email}</td>
                <td>${x.time}</td>
                <td>${x.message}</td>
            </tr>
        `
    ).join(' ')
    document.querySelector('#mensajes').innerHTML = messages;
}

const onSubmitForm = () => {
    let email = document.querySelector('#emailform').value
    let message = document.querySelector('#msjform').value
    let time = new Date()

    if (email.length !== 0 && message.length !== 0) {
        const obj = {
            email,
            time: `${time.getDay()}/${time.getMonth()}/${time.getFullYear()} || ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
            message
        }
        socket.emit('submit-chat', obj)
    }
    else {
        document.querySelector('#alertError').innerHTML = `<span style='color: red; border: 1px solid red; padding: 5px;'>Complete todos los datos!</span>`
        setTimeout(() => {
            document.querySelector('#alertError').innerHTML = ''
        }, 5000)

    }
}

document.querySelector('#messagesForm').addEventListener('submit', (e) => {
    e.preventDefault()
    onSubmitForm()
})