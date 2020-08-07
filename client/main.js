const baseUrl = `http://localhost:3000`

let totalIngredients = [], totalCalories = [], foodContainer = ''

$(document).ready(function () {
    checkAuth()
})

function checkAuth() {
    if (localStorage.getItem('token')) {
        console.log('token')
        $('#login-page').hide()
        $('#login-form').hide()
        showIngredients()
        showTotalCalories()
        $('#ingredients-page').show()
        $('#restaurants-page').hide()
    } else {
        console.log('else')
        $('#login-page').show()
        $('#login-form').show()

        $('#ingredients-page').hide()
        $('#restaurants-page').hide()
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

function register(event) {
    event.preventDefault()
    const email = $('#register-email').val()
    const password = $('#register-password').val()

    $.ajax({
        url: `${baseUrl}/users/register`,
        method: 'post',
        data: {
            email,
            password
        }
    })
        .done((response) => {
            console.log(response)
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
        <td><a class="btn-flat" href="#" onclick="deleteIngredient(event, ${i})"><i class="material-icons">delete</i></a></td>
        </tr>
        `
        $('#show-ingredients').append(addedIngredient)  
    }
}

function deleteIngredient(event, index) {
    event.preventDefault()
    totalIngredients.splice(index, 1)
    totalCalories.splice(index, 1)
    showIngredients()
    showTotalCalories()
}

function showTotalCalories() {
    $('#total-calories').empty()

    let showedTotalCalories = 0
    for (let i = 0; i < totalCalories.length; i++) {
        showedTotalCalories += Number(totalCalories[i])
    }

    let showUnit = `${showedTotalCalories} cal`

    $('#total-calories').append(showUnit)
}

function fetchFood () {
    $.ajax({
        url : `${baseUrl}/recipes`,
        method : 'post',
        data : {ingredients : JSON.stringify(totalIngredients)}
    })
    .done((response) => {
        console.log(response)
        $('#recipe-list').empty()
        response.recipe.forEach(element => {
            let uniqueRecipe = 
            `
            <div class="col">
                <div class="card text-left mt-3">
                <div class="card-header">
                    <span id="">${element.title}</span>
                </div>
                <div class="card-body row">
                    <div class="col-3">
                    <img src="${element.image}" height="100vh" alt="">
                    </div>
                    <div class="col-9">
                    <p class="card-text">${element.title}</p>
                    <a href="#" id="find-nearby" class="btn btn-outline-success" onclick="toRestaurants(event, '${element.title}')">Find nearby restaurants</a>
                    </div>
                </div>
                </div>
            </div>
            `
            $('#recipe-list').append(uniqueRecipe)
        })
    })
    .fail((err) => {
        console.log(err)
    })
}

// /restaurants?address=slipi tower&keyword=Apple Crumble Recipe

function toRestaurants (event, foodName) {
    event.preventDefault()
    $('#restaurants-page').show()
    $('#ingredients-page').hide()
    foodContainer = foodName
}

function fetchRestaurants(event) {
    const address = $('#address').val()
    event.preventDefault()
    $.ajax({
        url : `${baseUrl}/restaurants?address=${address}&keyword=${foodContainer}`,
        method : 'get'
    })
    .done((response) => {
        $('#restaurant-container').empty()
        console.log(response)
        response.forEach(element => {
            let restaurantTemplate = 
            `
            <div class="col">
            <div class="card text-left mt-3">
              <div class="card-header">
                <span id="">${element.restaurant.name}</span>
              </div>
              <div class="card-body row">
                <div class="col-3">
                  <img src="${element.restaurant.thumb}" height="100vh" alt="">
                </div>
                <div class="col-9">
                  <p class="card-text">${element.restaurant.location.address}</p>
                </div>
              </div>
            </div>
            </div>
            `
            $('#restaurant-container').append(restaurantTemplate)
        })
    })
    .fail((err) => {
        console.log(err)
    })
}