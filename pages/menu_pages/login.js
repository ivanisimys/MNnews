'use strict'

let form = document.querySelector('#login')
form.addEventListener("submit", function(event) {
    event.preventDefault();
    // Собираем все данные с формы одной командой
    let data = new FormData(form);
    // Считываем данные с каждого поля по его имени, используя метод get()
    let username = data.get("us");
    let userPassword = data.get("password");
    console.log(username);
    console.log(userPassword)
})

