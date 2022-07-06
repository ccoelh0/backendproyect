const nameAndLastname = document.getElementById('name')
const email = document.getElementById('email')
const alias = document.getElementById('alias')
const messageContent = document.getElementById('message')
const avatar = document.getElementById('avatar')
const age = document.getElementById('age')
const form = document.getElementById('form')
const chatContainer = document.getElementById('chat-container')

const authorSchema = new normalizr.schema.Entity('authors')
const commentSchema = new normalizr.schema.Entity('comments')

const postSchema = new normalizr.schema.Entity('posts', {
  comments: [commentSchema]
});

const socket = io();

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
  onSubmit(url).catch(err => console.log(err))
})

const compression = (norm, denorm) => ((denorm.length / norm.length) * 100).toFixed()

const norm = async () => {
  const res = await fetch('/api/chat/')
  const data = await res.json()
  const dataDesnormalize = normalizr.denormalize(data.result, postSchema, data.entities)

  return document.getElementById('chat-compresion').innerHTML = 
    `Compresion: ${compression(JSON.stringify(data), JSON.stringify(dataDesnormalize))}%`
}

norm()

socket.on('data-chat', data => console.log(data) ) 

