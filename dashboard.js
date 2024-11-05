const conts = document.querySelector('.contributors')
const logout = document.querySelector('.logout')
const statVal = document.querySelectorAll('.stat-val')
const token = localStorage.getItem('jwtToken')
let contributors = []
if (!token) {
  window.location.replace("index.html");
}

function logUniqueInitByFromObject(data) {
  const seenInitBys = new Set();
  for (const key in data) {
    const item = data[key];
    const initBy = item.initBy;

    if (!seenInitBys.has(initBy) && initBy) {
      console.log(`initBy: ${initBy}`);
      seenInitBys.add(initBy);
    }
  }    console.log(seenInitBys)
  for (const value of seenInitBys) {
    console.log(value);
    const email = value.split(`"`)
console.log(email)
   const contributor =  document.createElement('div')
   const disc =  document.createElement('div')
   const conName =  document.createElement('p')
   contributor.className ='contributor'
   disc.className ='disc'
   conName.className = 'con-name'
   conName.textContent = email[1]
   contributor.append(disc)
   contributor.append(conName)
   conts.append(contributor)
  }

}
const getAllSherps = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/v1/sherp")
    const data = await res.json()
    logUniqueInitByFromObject(data.sherp)
    for(const item of statVal){
          item.textContent = data.count

    }

  } catch (error) {
    console.log(error);

  }
}


getAllSherps()



logout.addEventListener('click', ()=>{
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user-email");
  window.location.replace("signin.html");
})
