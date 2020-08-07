const baseUrl = `http://localhost:3000`

let totalIngredients = [], totalCalories = []

$(document).ready(function () {
    checkAuth()
})

function checkAuth() {
    if (localStorage.getItem('token')) {
        $('#login-page').hide()
        $('#home-page').show()
        $('#fetch-recipes').show()
        showIngredients()
        showTotalCalories()
        $('#ingredients-page').show()
        $('#recipe-page').hide()
        $('#restaurant-page').hide()
    } else {
        $('#login-page').show()
        $('#home-page').hide()
        $('#fetch-recipes').hide()
        $('#ingredients-page').hide()
        $('#recipe-page').hide()
        $('#restaurant-page').hide()
    }
}

function login(event) {
    event.preventDefault()
    const email = $('#login-email').val()
    const password = $('#login-password').val()

    console.log('coba')
    console.log(email, password)

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
    localStorage.clear()
    checkAuth()
}

function addIngredient(event) {
    event.preventDefault()
    const ingredient = $('#input-ingredient').val()

    $.ajax({
        url: `${baseUrl}/nutrition/${ingredient}`,
        method: 'get',
        headers: {
            token: localStorage.token
        }
    })
    .done((response) => {
        console.log(response)

        totalIngredients.push(ingredient)
        totalCalories.push(response.nutrition.calories)
        showIngredients()
        showTotalCalories()
        $('#input-ingredient').val('')
    })
    .fail((err) => {
        console.log(err)
    })
}

function showIngredients() {
    $('#show-ingredients').empty()
    for (let i = 0; i < totalIngredients.length; i++) {
        let addedIngredient = 
        `
        <tr>
        <td>${totalIngredients[i]}</td>
        <td>${totalCalories[i]} cal</td>
        <td><a class="btn-flat" href="#"><i class="material-icons">delete</i></a></td>
        </tr>
        `
        $('#show-ingredients').append(addedIngredient)  
    }
}

function showTotalCalories() {
    $('#total-calories').empty()

    let showedTotalCalories = 0
    for (let i = 0; i < totalCalories.length; i++) {
        showedTotalCalories += Number(totalCalories[i])
    }

    $('#total-calories').append(showedTotalCalories)
}