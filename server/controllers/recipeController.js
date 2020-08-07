const axios = require("axios")

class RecipeController {
    static getRecipe(req, res){
        
        const ingredients = JSON.parse(req.body.ingredients); // format ==> butter,+strawberry,+banana
        let maxData = 10

        // console.log(JSON.parse(req.body.ingredients))

        axios({
            method: 'get',
            url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${maxData}&apiKey=${process.env.API_KEY_SPOONACULAR}`
        })
            .then(response =>{
                console.log(response)
                res.status(200).json({recipe: response.data})
            })
            .catch(error =>{
                console.log(error);
            })
    }
}

module.exports = RecipeController