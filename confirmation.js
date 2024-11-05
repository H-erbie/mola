
const meterNum = document.querySelector('#meter')
const meterName = document.querySelector('#meter-name')
const meterAddress = document.querySelector('#meter-address')
const meterReading = document.querySelector('#meter-readings')
const meterNumber = document.querySelector('#meter-num')
const saveBtn = document.querySelector('.save')
const updateBtn = document.querySelector('.save-edit')
const err = ''
const token = localStorage.getItem('jwtToken')
const overlay = document.querySelector('.overlay')
const cls = document.querySelector('.cls-btn')
const oName = document.querySelector('.overlay-name')
const logout = document.querySelector('.logout')
const oRead = document.querySelector('.overlay-read')
const oNum = document.querySelector('.overlay-num')
const editConf = document.querySelector('.conf-edit-form')
const pop = document.querySelector('.pop-win')
const editBtn = document.querySelector('.edit-btn')
const cancelBtn = document.querySelector('.cancel-btn')
const oAddress = document.querySelector('.overlay-address')
if (!token) {
  window.location.replace("index.html");
}
let dd;
cls.addEventListener('click', () => overlay.classList.remove('show'))
saveBtn.addEventListener('click', async () => {
  saveBtn.classList.add('show')

  if(meterNum.value === ''){
    saveBtn.setAttribute('disable', true)
  }
  try {
    const data = await fetch(`http://localhost:5000/api/v1/sherp/${meterNum.value}`);
    dd = await data.json();


    if (dd.msg) {
      err.textContent = dd.msg;
      saveBtn.classList.remove('show')
      meterNum.value = ''
    } else {
      overlay.classList.add('show')
      oName.textContent = `Meter Name: ${dd.sherp.name}`
      oAddress.textContent = `Meter Address: ${dd.sherp.address}`
      oRead.textContent = `Meter Readings: ${dd.sherp.meterRead}`
      oNum.textContent = `Meter Number: ${dd.sherp.meterNum}`
      meterNum.value = ''

      // window.location.replace("dashboard.html");
    }
  } catch (error) {
    console.log(error);
    saveBtn.classList.remove('show')
    meterNum.value = ''

  }

})

logout.addEventListener('click', () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user-email");
  window.location.replace("signin.html");
})


editBtn.addEventListener('click', () => {
  editConf.classList.add('show')
  pop.classList.add('hide')
  meterName.value = dd.sherp.name
  meterAddress.value = dd.sherp.address
  meterNumber.value = dd.sherp.meterNum
  meterReading.value = dd.sherp.meterRead
  console.log(dd)
})
cancelBtn.addEventListener('click', () => {
  editConf.classList.remove('show')

  pop.classList.remove('hide')

})

updateBtn.addEventListener('click', async () => {
  try {
    const data = await fetch(`http://localhost:5000/api/v1/sherp/${meterNumber.value}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: meterName.value,
        address: meterAddress.value,
        meterRead: meterReading.value,
        meterNum: meterNumber.value
      }),
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token}`
      },
    });
 const res = await data.json();
    console.log(dd, res, meterNumber.value, meterReading.value)

    if (res.msg) {
      err.textContent = res.msg;
      saveBtn.classList.remove('show')

    } else {


   
    overlay.classList.add('show')
    oName.textContent = `Meter Name: ${res.sherp.name}`
    oAddress.textContent = `Meter Address: ${res.sherp.address}`
    oRead.textContent = `Meter Readings: ${res.sherp.meterRead}`
    oNum.textContent = `Meter Number: ${res.sherp.meterNum}`
      // window.location.replace("dashboard.html");
      editConf.classList.remove('show')
      pop.classList.remove('hide')

    }
  } catch (error) {
    console.log(error);
    saveBtn.classList.remove('show')

  }


})