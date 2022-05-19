const socket = io();

socket.on('be-connection', (data) => {
    console.log(data)
    // showItems(data)
});

socket.emit('fe-connection', "user conectado")
// const showItems = array => {
//     let itemMapped = array.map(x => `
//         <tr>
//             <td>${x.name}</td>
//             <td>${x.price}</td>
//             <td><img style='width: 100px' src='${x.img}'></td>
//         </tr>
//         `
//     ).join(' ')
//     document.getElementById('itemsTable').innerHTML = itemMapped
// }; 

// const addItem = () => {
//     let name = document.getElementById('itemName').value
//     let price = document.getElementById('itemPrice').value
//     let img = document.getElementById('itemImg').value
//     const obj = {
//         name: name, price: price, img: img
//     }
//     name = document.getElementById('itemName').value = ''
//     price = document.getElementById('itemPrice').value = ''
//     img = document.getElementById('itemImg').value = ''
//     socket.emit('new-item', obj)
// }

// document.querySelector('#formToAddItem').addEventListener('submit', (e) => {
//     e.preventDefault()
//     addItem()
// })

// //-------------------------------------------

// // CHAT

// socket.on('datachat', (data) => {
//     showMessages(data)
// });

// const showMessages = array => {
//     let messages = array.map(x => `
//         <div style='border: 1px solid black; padding: 5px; display: flex; align-items: center;'>
//             <h3>${x.email}</h3>
//             <p style="margin: 0 0 0 5px;">[${x.time}]: ${x.msj}</p>
//         </div>
//         `
//     ).join(' ')
//     document.querySelector('#mensajes').innerHTML = messages;
// }

// const onSubmitForm = () => {
//     let email = document.querySelector('#emailform').value
//     let msj = document.querySelector('#msjform').value
//     let time = new Date()

//     if (email.length !== 0 && msj.length !== 0) {
//         const obj = {
//             email,
//             time: `${time.getDay()}/${time.getMonth()}/${time.getFullYear()} || ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
//             msj
//         }
//         socket.emit('msjFromChat', obj)
//     } 
//     else {
//         document.querySelector('#alertError').innerHTML = `<span style='color: red; border: 1px solid red; padding: 5px;'>Complete todos los datos!</span>`
//         setTimeout(() => {
//             document.querySelector('#alertError').innerHTML = ''
//         }, 5000)

//     }
// }

// document.querySelector('#messagesForm').addEventListener('submit', (e) => {
//     e.preventDefault()
//     onSubmitForm()
// })