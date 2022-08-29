const nameUser = document.getElementById('new-name')
const newPassword = document.getElementById('new-password')
const email = document.getElementById('new-email')
const phone = document.getElementById('new-phone')
const age = document.getElementById('new-age')
const adress = document.getElementById('new-adress')
const avatar = document.getElementById('new-avatar')
const comeback = document.getElementById('comebackButton')

// const isDataReady =
//   newPassword.value.length !== 0
//   && nameUser.value.length !== 0
//   && email.value.length !== 0
//   && phone.value.length !== 0
//   && age.value.length !== 0
//   && adress.value.length !== 0

const onSubmitNewUser = async () => {
  const data = await fetch('/api/sessions/createUser', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: email.value,
      password: newPassword.value,
      adress: adress.value,
      name: nameUser.value,
      phone: phone.value,
      age: age.value
    })
  })
  return await data.json()
}

register.addEventListener('submit', e => {
  e.preventDefault()
  // if (!isDataReady) {
  //   activeAlert('Debes completar todos los datos', alertError)
  //   return false
  // }
  onSubmitNewUser()
    .then((res) => {
      res.data && activeAlert('Usuario creado correctamente', alertSuccess)
      maintitle.innerHTML = 'Iniciar sesión'
      register.classList.add('display-none')
      login.classList.remove('display-none')
    })
    .catch(() => activeAlert('Email ya registrado', alertError))
})

comeback.addEventListener('click', e => {
  e.preventDefault()
  maintitle.innerHTML = 'Iniciar sesión'
  register.classList.add('display-none')
  login.classList.remove('display-none')
})