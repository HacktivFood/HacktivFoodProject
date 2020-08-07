const axios = require('axios')

class nutritionController {
    static countNutrition(req, res, next) {
        const food = req.params.food
        axios({
                url: `https://api.edamam.com/api/nutrition-data?app_id=${process.env.APP_ID_nutrition}&app_key=${process.env.API_KEY_nutrition}&ingr=1%20medium%20${food}`,
                method: 'get',
            })
            .then((response) => {
                res.status(200).json({nutrition: response.data})
            })
            .catch((err) => {
                res.status(404).json({errors: err})
            })
        
    }
}

module.exports = {nutritionController}