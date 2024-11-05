const email = document.querySelector('#email')
const password = document.querySelector('#password')
const fullname = document.querySelector('#fullname')
const staffId = document.querySelector('#staffID')
const err = ''
const logInBtn = document.querySelector('.submit-btn')
const resetBtn = document.querySelector('.reset-btn')
const token = localStorage.getItem('jwtToken')

if(token){
  window.location.replace("dashboard.html");
}

resetBtn.addEventListener('click', ()=>{
  password.value = "";
  email.value = "";
  fullname.value = "";
  staffId.value = "";
})


logInBtn.addEventListener('click', async() => {
  try {
    const data = await fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        fullname: fullname.value,
        staffId: staffId.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dd = await data.json();
    if (dd.msg) {
      err.textContent = dd.msg;
      email.value = "";
      password.value = "";
      fullname.value = "";
      staffId.value = "";
    } else {

      console.log(dd);
      password.value = "";
      email.value = "";
      fullname.value = "";
      staffId.value = "";
      window.location.replace("index.html");
    }
  } catch (error) {
    console.log(error);
    password.value = "";
    email.value = ""    ;
    fullname.value = "";
      staffId.value = "";
  }
})

