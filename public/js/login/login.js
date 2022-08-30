const rootIndex = '/index'
const login = document.getElementById('form-login')
const register = document.getElementById('form-register')
const username = document.getElementById('username')
const password = document.getElementById('password')
const submitButton = document.getElementById('submitLogin')
const registerButton = document.getElementById('buttonCreateNewUser')
const alertSuccess = document.getElementById('alertInfo')
const alertError = document.getElementById('alertInfoError')
const maintitle = document.getElementById('main-title')

const onSubmit = async () => {
  const data = await fetch('/api/sessions/validateLogin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username.value, password: password.value })
  })

  return await data.json()
}

const activeAlert = (text, alert) => {
  alert.innerHTML = text
  alert.classList.remove('display-none')
  setTimeout(() => alert.classList.add('display-none'), 4000)
}

login.addEventListener('submit', (e) => {
  e.preventDefault()
  username.value.length !== 0 && password.value.length !== 0 &&
    onSubmit().then(() => window.location = rootIndex).catch(() => activeAlert('Email o contrasena incorrecto', alertError))
})

registerButton.addEventListener('click', e => {
  e.preventDefault()
  maintitle.innerHTML = 'Crear usuario'
  register.classList.remove('display-none')
  login.classList.add('display-none')
})