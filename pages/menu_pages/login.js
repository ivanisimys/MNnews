'use strict'

let form = document.querySelector('#login')
form.addEventListener("submit", function(event) {
    event.preventDefault();
    // Собираем все данные с формы одной командой
    let data = new FormData(form);
    // Считываем данные с каждого поля по его имени, используя метод get()
    let username = data.get("us");
    let userPassword = data.get("password");
    fetch('http://web4.informatics.ru:82/api/81eabc863ed6d21e46f5b1988c463467/login')
        .then(function(response) {
             if (response.ok) {
                return response.json();
            }
        })
        .then(function(data){

            let check_pass = data[username]
            if (userPassword == check_pass){
                log.style.display = 'none'
                console.log('Вход выплнен!')
            }
            else{
                console.log('Неверные данные!')
            }
        })
    
})

