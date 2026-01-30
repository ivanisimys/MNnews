'use strict'
let exit = document.querySelector('#exit')
let log = document.querySelector('.columns')
let player_card = document.querySelector('.player-card')
let form = document.querySelector('#login')
let rank_value = document.querySelector('#rank')
let name_value = document.querySelector('#name')
if (localStorage.getItem('login') !== '1'){
    exit.style.display = 'none'
}
if (localStorage.getItem('login') == '1'){
    exit.style.display = 'block'
}
exit.addEventListener("click", function(event) {
    localStorage.removeItem('login')
    Location.reload()
});
if (localStorage.getItem('login') !== null){
    if (localStorage.getItem('login') == '1'){

        fetch('http://web4.informatics.ru:82/api/81eabc863ed6d21e46f5b1988c463467/users_data')
            .then(function(response){
                if (response.ok){
                    return response.json();
                }
            })
            .then(function(data){
                let us = localStorage.getItem('name')
                let rank = data[us+'_rank']
                log.style.display = 'none'   
                player_card.style.display = 'block'      
                rank_value.innerText = rank    
                name_value.innerText = us
            })
    }
}
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
                console.log('Вход выплнен!')  
                player_card.style.display = 'block'            
                log.style.display = 'none'
                localStorage.setItem("pass", check_pass);
                localStorage.setItem("name", username);
                localStorage.setItem("login", '1');
                location.reload()
            }
            else{
                console.log('Неверные данные!')
            }
        })
    
})

