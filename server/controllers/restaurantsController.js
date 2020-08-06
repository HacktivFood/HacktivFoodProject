const axios = require('axios');

class restaurantsController {
  static async search(req, res) {
    try {
      const { address, keyword } = req.query;

      const geocoding = await axios({
        url: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json',
        method: 'get',
        headers: {
          'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com',
          'X-RapidAPI-Key':
            'aa651ca0e1msh85058b0376ee4edp152024jsn136b13e5c02f',
          useQueryString: true,
        },
        params: {
          address,
        },
      });
      const location = geocoding.data.results[0].geometry.location;

      // const location = {
      //   lat: -6.2008,
      //   lng: 106.798573,
      // };

      const restaurants = await axios({
        url: 'https://developers.zomato.com/api/v2.1/search',
        method: 'get',
        headers: {
          'user-key': '7296a59dabdfa30121808a0311812896',
        },
        params: {
          q: keyword,
          lat: location.lat,
          lon: location.lng,
          count: 10,
          sort: 'real_distance',
          order: 'desc',
        },
      });

      res.status(200).json(restaurants.data.restaurants);
    } catch (error) {
      console.error({ error });
    }
  }
}

module.exports = restaurantsController;
