var db = require('../models');

//GET /api/cities
async function index(req, res) {
    try {
      const cities = await db.City.find({});
      res.json(cities);
    } catch (err) {
      console.log("error getting cities", err);
      res.status(500).json({ error: "Error getting cities" });
    }
  }
  

//GET /api/cities/:cityName
async function show(req, res) {
    try {
      const name = req.params.cityName;
      const foundCity = await db.City.find({ name: { '$regex': name, '$options': 'i' } });
      res.json(foundCity);
    } catch (err) {
      console.log("error finding city", err);
      res.status(500).json({ error: "Error finding city" });
    }
  }
  

//GET /api/cities/:cityName/posts
async function showPosts(req, res) {
    try {
      const cityName = req.params.cityName;
      console.log(cityName, "this is cityName");
      
      const foundCity = await db.City.find({ name: { '$regex': cityName, '$options': 'i' } });
      
      if (foundCity.length === 0) {
        return res.status(404).json({ error: "City not found" });
      }
      
      console.log(foundCity[0].name, "this is found city");
  
      const posts = await db.Post.find({ city: foundCity[0].name });
      res.json(posts);
    } catch (err) {
      console.log("error finding city or posts", err);
      res.status(500).json({ error: "Error finding city or posts" });
    }
  }
  



module.exports = {
  index:index,
  show:show,
  showPosts:showPosts
};