import { alert } from "../utils/alert.js"

const form = document.querySelector('.form')
const input_login = document.querySelector('.input-login')
const input_password = document.querySelector('.input-password')
const alert_wrapper = document.querySelector('.alert_wrapper')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if(alert_wrapper.childElementCount <= 2){
        alert_wrapper.appendChild(alert('asdfasdads~asdasd', 10, 'danger'))
    }
})