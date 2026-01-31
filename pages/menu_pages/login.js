'use strict'
function showLoginError(message) {
    // Получаем элементы
    const popup = document.getElementById('loginErrorPopup');
    const popupMessage = document.getElementById('popupMessage');
    const closeBtn = document.querySelector('.popup-close');

    popupMessage.textContent = message;

    popup.classList.add('popup-visible');

    // Обработчик закрытия по кнопке
    closeBtn.onclick = function() {
        popup.classList.remove('popup-visible');
    };

    popup.onclick = function(e) {
        if (e.target === popup) {
            popup.classList.remove('popup-visible');
        }
    };
}
let exit = document.querySelector('#exit')
let log = document.querySelector('.columns')
let player_card = document.querySelector('.player-card')
let form = document.querySelector('#login')
let rank_value = document.querySelector('#rank')
let name_value = document.querySelector('#name')
let adminpanel = document.querySelector('#admin_panel')
let adminpanel2 = document.querySelector('#admin_panel2')
let reputation_value = document.querySelector('#rep')
let clan_value = document.querySelector('#clan')
let notes_value = document.querySelector('#notes')
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
                let rep = data[us+'_reputation']
                let clan = data[us+'_clan']
                let note = data[us+'_notes']
                log.style.display = 'none'   
                player_card.style.display = 'block'      
                rank_value.innerText = rank    
                name_value.innerText = us
                reputation_value.innerText = rep
                clan_value.innerText = clan
                notes_value.innerText = note

                if (data[us+'_isadmin'] == 1){
                    adminpanel.style.display = 'block'
                    adminpanel2.style.display = 'block'
                }
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
                showLoginError('Неверные данные❌') 
            }
        })
    
})

adminpanel.addEventListener("submit", function(event) {
    event.preventDefault();
    // Собираем все данные с формы одной командой
    let data = new FormData(adminpanel);
    // Считываем данные с каждого поля по его имени, используя метод get()
    let admplname = data.get('plname');
    let admposition = data.get('position')
    let repadm = data.get('reputation')
    let admguild = data.get('guild')
    let admnotes = data.get('notes')
    const adm_form = {}
    if (admposition){
        adm_form[admplname+'_rank'] = admposition
    }
    if (repadm){
        adm_form[admplname+'_reputation'] = repadm
    }
    if (admguild){
        adm_form[admplname+'_clan'] = admguild
    }
    if (admnotes){
        adm_form[admplname+'_notes'] = admnotes
    }


    fetch('http://web4.informatics.ru:82/api/81eabc863ed6d21e46f5b1988c463467/users_data', {
        method: 'PATCH', // Указываем метод PATCH
        body: JSON.stringify(adm_form),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));

    adm_form = {}
    showLoginError('Форма отправленна') 
});
adminpanel2.addEventListener("submit", function(event) {
    event.preventDefault();
    // Собираем все данные с формы одной командой
    let data = new FormData(adminpanel2);
    // Считываем данные с каждого поля по его имени, используя метод get()
    let new_name = data.get('new_plname')
    let new_pass = data.get('new_password')
    const create_user = {
        [new_name]:new_pass
    }
    fetch('http://web4.informatics.ru:82/api/81eabc863ed6d21e46f5b1988c463467/login', {
        method: 'PATCH', // Указываем метод PATCH
        body: JSON.stringify(create_user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));    
});
