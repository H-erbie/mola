const meterName = document.querySelector('#meterName')
const address = document.querySelector('#address')
const meterNum = document.querySelector('#meterNum')
const meterRead = document.querySelector('#meterReadings')
const saveBtn = document.querySelector('.save')
const err = ''
const token = localStorage.getItem('jwtToken')
const overlay = document.querySelector('.overlay')
const cls = document.querySelector('.cls-btn')
const oName = document.querySelector('.overlay-name')
const logout = document.querySelector('.logout')

const oRead = document.querySelector('.overlay-read')
const oNum = document.querySelector('.overlay-num')
const oAddress = document.querySelector('.overlay-address')
if (!token) {
  window.location.replace("index.html");
}

cls.addEventListener('click', () => overlay.classList.remove('show'))
saveBtn.addEventListener('click', async () => {
  saveBtn.classList.add('show')

  const userEmail = localStorage.getItem('user-email')

  try {
    const data = await fetch("http://localhost:5000/api/v1/sherp", {
      method: "POST",
      body: JSON.stringify({
        name: meterName.value,
        address: address.value,
        meterRead: meterRead.value,
        meterNum: meterNum.value,
        initBy: userEmail
      }),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });
    const dd = await data.json();
    overlay.classList.add('show')
    oName.textContent = `Meter Name: ${meterName.value}`
    oAddress.textContent = `Meter Address: ${address.value}`
    oRead.textContent = `Meter Readings: ${meterRead.value}`
    oNum.textContent  = `Meter Number: ${meterNum.value}`
    
    if (dd.msg) {
      err.textContent = dd.msg;

    } else {

      console.log(dd);
      saveBtn.classList.remove('show')

      // window.location.replace("dashboard.html");
    }
  } catch (error) {
    console.log(error);
    saveBtn.classList.remove('show')

  }

})

logout.addEventListener('click', ()=>{
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user-email");
  localStorage.removeItem("username");
  window.location.replace("signin.html");
})
