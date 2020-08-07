const baseUrl = `http://localhost:3000`

let ingredients = ['banana', 'strawberry', 'butter']

// let ingredients = []

$(document).ready(function () {
    checkAuth()
})

function addIngredients(event){
    event.preventDefault()

    let ingredient = $('#search').val()
    ingredients.push(ingredient)
    fetchIngredients()

}

function fetchIngredients(){
    $('#ingredients-container').empty()
    ingredients.forEach(element => {
        $('#ingredients-container').append(`
        <tr>
            <td>${element}</td>
            <td>5 cals</td>
            <td><a class="btn-flat" href="#"><i class="material-icons">delete</i></a></td>
            </tr>
        `)
    })

    // JUmlah total calories
    let totalCals = '35 cals'
    $('#ingredients-container').append(`
            <tr>
                <td></td>
                <td><b>${totalCals}</b></td>
                <td></td>
            </tr>
    `)
}

function checkAuth() {
    if (localStorage.getItem('token')) {
        $('#login-page').hide()
        $('#home-page').show()
        fetchIngredients()
        $('#fetch-recipes').show()
    } else {
        $('#login-page').show()
        fetchIngredients()  //nnti klo mau pkek login logout ini di comment y
        $('#home-page').hide()
        $('#fetch-recipes').hide()
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

function fetchFoodRecipe(event){
    event.preventDefault()

    $('#cobaDataRecipe').text(JSON.stringify(ingredients))

    // $.ajax({
    //     url : `${baseUrl}/recipes`,
    //     method : 'get',
    //     data : {ingredients}
    // })
    // .done((response) => {
    //     console.log(response)
    // })
    // .fail((err) => {
    //     console.log(err)
    // })

}