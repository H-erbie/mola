const email = document.querySelector('#email')
const password = document.querySelector('#password')
const err = ''
const logInBtn = document.querySelector('.log-in-btn')
const token = localStorage.getItem('jwtToken')
const spinner = document.querySelector('.spinner')
if(token){
  window.location.replace("dashboard.html");
}

logInBtn.addEventListener('click', async() => {
  logInBtn.classList.add('show')
  try {
    const data = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
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
      spinner.classList.remove('show')

    } else {
      localStorage.setItem("jwtToken", JSON.stringify(dd.token));
      localStorage.setItem("user-email", JSON.stringify(dd.user.email));
      localStorage.setItem("username", JSON.stringify(dd.user.name));
      console.log(dd);
      password.value = "";
      email.value = "";
      window.location.replace("dashboard.html");
      spinner.classList.remove('show')

    }
  } catch (error) {
    console.log(error);
    password.value = "";
    email.value = ""    ;
    spinner.classList.remove('show')

  }
})

