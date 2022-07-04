const nameAndLastname = document.getElementById('name')
const email = document.getElementById('email')
const alias = document.getElementById('alias')
const messageContent = document.getElementById('message')
const avatar = document.getElementById('avatar')
const age = document.getElementById('age')
const form = document.getElementById('form')

const url = '/api/chat/'


const onSubmit = async (api) => {
  const message = {
    author: {
      id: email.value,
      name: nameAndLastname.value,
      alias: alias.value,
      avatar: avatar.value,
      age: age.value,
    },
    message: messageContent.value
  }

  const response = await fetch(api, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  })
  return response.json()
}

form.addEventListener('submit', e => {
  e.preventDefault()
  onSubmit(url).then(res => console.log(res)).catch(err => console.log(err))
})