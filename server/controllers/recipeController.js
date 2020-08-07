const axios = require("axios")

class RecipeController {
    static getRecipe(req, res){
        
        const ingredients = req.body.ingredients; // still in array => change to this format ==> butter,+strawberry,+banana
        let maxData = 10
        let strKeyword = ''
        for (let i = 0; i < ingredients.length; i++) {
                if(i !== 0){
                    strKeyword += ',+'
                }
            strKeyword += ingredients[i]
        }

        axios({
            method: 'get',
            url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${strKeyword}&number=${maxData}&apiKey=${process.env.API_KEY_SPOONACULAR}`

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