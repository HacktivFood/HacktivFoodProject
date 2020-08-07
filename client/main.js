const baseUrl = `http://localhost:3000`

$(document).ready(function () {
    checkAuth()
})

function checkAuth() {
    if (localStorage.getItem('token')) {
        $('#login-page').hide()
        $('#home-page').show()
    } else {
        $('#login-page').show()
        $('#home-page').hide()
    }
}

function login(event) {
    event.preventDefault()
    const email = $('#login-email').val()
    const password = $('#login-password').val()

    $.ajax({
        url: `${baseUrl}/users/login`,
        method: 'post',
        data: {
            email,
            password
        }
    })
        .done((response) => {
            console.log(response)
            localStorage.setItem('token', response.token)
            checkAuth()
        })
        .fail((err) => {
            console.log(err)
        })
}

function logout() {
    console.log('coba')
    localStorage.clear()
    checkAuth()
}

function fetchNutrition(food) {
    $.ajax({
        url: `${baseUrl}/nutrition/${food}`,
        method: 'get',
        headers: {
            token: localStorage.token
        }
    })
    .done((response) => {
        console.log(response)
    })
    .fail((err) => {
        console.log(err)
    })
}