const nameUser = document.getElementById('new-name')
const newPassword = document.getElementById('new-password')
const email = document.getElementById('new-email')
const phone = document.getElementById('new-phone')
const age = document.getElementById('new-age')
const adress = document.getElementById('new-adress')
const avatar = document.getElementById('new-avatar')
const comeback = document.getElementById('comebackButton')


const onSubmitNewUser = async () => {
  const formData = new FormData()
  formData.append("username", email.value)
  formData.append("avatar", avatar.files[0])
  const data = await fetch('/api/sessions/createUser', {
    method: 'POST',
    body: formData
    // body: JSON.stringify({
    //   username: email.value,
    //   password: newPassword.value,
    //   adress: adress.value,
    //   name: nameUser.value,
    //   phone: phone.value,
    //   age: age.value,
    //   avatar: avatar.files[0]
    // })
  })
  return await data.json()
}

register.addEventListener('submit', e => {
  e.preventDefault()

  onSubmitNewUser()
    // .then((res) => {      
    //   res.data && activeAlert('Usuario creado correctamente', alertSuccess)
    //   maintitle.innerHTML = 'Iniciar sesión'
    //   register.classList.add('display-none')
    //   login.classList.remove('display-none')
    // })
    // .catch((err) => {
    //   console.log(err)
    //   // activeAlert('Email ya registrado', alertError)
    // })
})

comeback.addEventListener('click', e => {
  e.preventDefault()
  maintitle.innerHTML = 'Iniciar sesión'
  register.classList.add('display-none')
  login.classList.remove('display-none')
})