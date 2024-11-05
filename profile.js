const logout = document.querySelector('.logout')
const profileName = document.querySelector('.profile-self')
const userEmail = document.querySelector('.email-self')
const username = localStorage.getItem("username").split(`"`)[1];
const email = localStorage.getItem("user-email").split(`"`)[1];
const token = localStorage.getItem('jwtToken')

if (!token) {
  window.location.replace("index.html");
}
logout.addEventListener('click', ()=>{
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user-email");
  window.location.replace("signin.html");
})
profileName.textContent = username
userEmail.textContent = email
