const adminOptions = document.getElementById('admin-options')

// se llama desde validations

const checkAdmin = (isAdmin) => {
  // tengo que crear user admin!!!
  if (!isAdmin) {
    adminOptions.classList.remove('d-none')
  }
}