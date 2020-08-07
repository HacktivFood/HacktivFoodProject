const baseUrl = `http://localhost:3000`

let ingredients = ['banana', 'strawberry', 'butter']

// let ingredients = []

$(document).ready(function () {
    checkAuth()
    fetchIngredients2()
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

    // $('#cobaDataRecipe').text(ingredients)
    console.log(ingredients)
    fetchIngredients2()

    // $.ajax({
    //     url : `${baseUrl}/recipes`,
    //     method : 'post',
    //     data : {ingredients : JSON.stringify(ingredients)}
    // })
    // .done((response) => {
    //     console.log(response)
    //     fetchIngredients2(response)
    // })
    // .fail((err) => {
    //     console.log(err)
    // })
}

// function fetchIngredients2(data){
function fetchIngredients2(){
    let data = [
    {
        id: 178349,
        title: 'Mixed Berry Yogurt Oat Treats',
        image: 'https://spoonacular.com/recipeImages/178349-312x231.jpg',
        imageType: 'jpg',
        usedIngredientCount: 3,
        missedIngredientCount: 3,
        missedIngredients: [Array],
        usedIngredients: [Array],
        unusedIngredients: [Array],
        likes: 13
      },
      {
        id: 58015,
        title: 'Strawberry Banana Muffins', 
        image: 'https://spoonacular.com/recipeImages/58015-312x231.jpg',
        imageType: 'jpg',
        usedIngredientCount: 3,
        missedIngredientCount: 3,
        missedIngredients: [Array],
        usedIngredients: [Array],
        unusedIngredients: [],
        likes: 3
      },
      {
        id: 178349,
        title: 'Mixed Berry Yogurt Oat Treats',
        image: 'https://spoonacular.com/recipeImages/178349-312x231.jpg',
        imageType: 'jpg',
        usedIngredientCount: 3,
        missedIngredientCount: 3,
        missedIngredients: [Array],
        usedIngredients: [Array],
        unusedIngredients: [Array],
        likes: 13
      },
      {
        id: 58015,
        title: 'Strawberry Banana Muffins', 
        image: 'https://spoonacular.com/recipeImages/58015-312x231.jpg',
        imageType: 'jpg',
        usedIngredientCount: 3,
        missedIngredientCount: 3,
        missedIngredients: [Array],
        usedIngredients: [Array],
        unusedIngredients: [],
        likes: 3
      }
    ]

    // console.log(data.recipe)
    $('#imageRecipe').empty()
    // for (let i = 0; i < data.recipe.length; i++) {
    for (let i = 0; i < data.length; i++) {
        console.log('coba',i)
        $('#imageRecipe').append(`
            <p class="header" id="cobaDataRecipe">${data[i].title}</p>
            <img class="activator" src="${data[i].image}">
        `)
    }

    // <p class="flow-text">List of Foods</p>
        // <h2 class="header" id="cobaDataRecipe">List of Foods</h2>
        // <div class="card">
        // <!-- <div class="card-panel hoverable"> -->
        //     <div class="card-image waves-effect waves-block waves-light" >
        //     </div>
        //     <div class="card-content">
        //       <span class="card-title activator grey-text text-darken-4" id="recipe-title" >Eclair<i class="material-icons right">more_vert</i></span>
        //       <p><a href="#">Get recipe here</a></p><br><br>
        //         <a class="waves-effect waves-light btn" onclick="logout()" style=" background-color: #f57f17 ;"><i class="material-icons left"></i>Find Nearby Restaurant</a>
        //     </div>
        //     <div class="card-reveal">
        //       <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
        //       <p>Here is some more information about this product that is only revealed once clicked on.</p>
        //     </div>

            //     <div class="card-image waves-effect waves-block waves-light" >
        //         <img id="imageRecipe" class="activator" src="${data.recipe[i].image}">
        //     </div>
        //     <div class="card-content">
        //         <span class="card-title activator grey-text text-darken-4" id="recipe-title" >Eclair<i class="material-icons right">more_vert</i></span>
        //         <p><a href="#">Get recipe here</a></p><br><br>
        //         <a class="waves-effect waves-light btn" onclick="logout()" style=" background-color: #f57f17 ;"><i class="material-icons left"></i>Find Nearby Restaurant</a>
        //     </div>
        //     <div class="card-reveal">
        //         <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
        //         <p>Here is some more information about this product that is only revealed once clicked on.</p>
        //     </div>

        
    // JUmlah total calories
    // let totalCals = '35 cals'
    // $('#ingredients-container').append(`
    //         <tr>
    //             <td></td>
    //             <td><b>${totalCals}</b></td>
    //             <td></td>
    //         </tr>
    // `)
}