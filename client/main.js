const baseUrl = `http://localhost:3000`

let totalIngredients = ['banana'], totalCalories = [1]

$(document).ready(function () {
    checkAuth()
})

function checkAuth() {
    if (localStorage.getItem('token')) {
        $('#login-page').hide()
        $('#home-page').show()
        $('#fetch-recipes').show()
        showIngredients()
        // $('#ingredients-page').show()
    } else {
        $('#login-page').show()
        $('#home-page').hide()
        $('#fetch-recipes').hide()
        showIngredients()
        // $('#ingredients-page').hide()
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
    localStorage.clear()
    checkAuth()
}

function addIngredient(event) {
    event.preventDefault()
    const ingredient = $('#input-ingredient').val()
    totalIngredients.push(ingredient)

    const calories = fetchNutrition(ingredient)
    totalCalories.push(calories)
}

function showIngredients() {
    console.log(totalIngredients, totalCalories)
    for (let i = 0; i < totalIngredients.length; i++) {
        let addedIngredient = 
        `
        <tr>
        <td>Eclair${totalIngredients[i]}</td>
        <td>${totalCalories[i]} cal</td>
        <td><a class="btn-flat" href="#"><i class="material-icons">delete</i></a></td>
        </tr>
        `
        $('#show-ingredients').append(addedIngredient)
    }
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
        console.log(response.calories)
        return response.calories
    })
    .fail((err) => {
        console.log(err)
    })
}   