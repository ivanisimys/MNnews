'use srict'
let loggg = document.querySelector('.login p')
let log = localStorage.getItem('login')
if (log == 1){
    loggg.innerText = 'Профиль'
}