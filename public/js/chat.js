const nameAndLastname = document.getElementById('name')
const email = document.getElementById('email')
const alias = document.getElementById('alias')
const messageContent = document.getElementById('message')
const avatar = document.getElementById('avatar')
const age = document.getElementById('age')
const form = document.getElementById('form')
const chatContainer = document.getElementById('chat-container')

const socket = io();

socket.on('data-chat', data => renderData(data))
socket.on('update-chat', data => renderData(data))

const authorSchema = new normalizr.schema.Entity('authors')
const commentSchema = new normalizr.schema.Entity('comments')

const postSchema = new normalizr.schema.Entity('posts', {
  comments: [commentSchema]
});

const url = '/api/chat/'

const getData = async (api) => {
  const data = await fetch(api)
  return await data.json()
}

const renderData = data => {
  const render = data?.map(x => {
      return `
      <div>
        <div>${x.author.name} | ${x?.message}</div>
      </div>
    `
  }).join(' ')

  return chatContainer.innerHTML = render

}

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

  await fetch(api, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  })

  socket.emit('new-message', true)
}

form.addEventListener('submit', e => {
  e.preventDefault()
  onSubmit(url).catch(err => console.log(err))
})

const norm = async () => {
  const res = await fetch('/api/chat/')
  const data = await res.json()
  const dataDesnormalize = normalizr.denormalize(data.result, postSchema, data.entities)

  document.getElementById('chat-compresion').innerHTML = 
    `Compresion: ${compression(JSON.stringify(data), JSON.stringify(dataDesnormalize))}%`
}

const compression = (norm, denorm) => ((denorm.length / norm.length) * 100).toFixed()

norm()
renderData()