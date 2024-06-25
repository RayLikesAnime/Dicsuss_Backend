var db = require('../models');

// GET /api/users/posts
async function index(req, res) {
    try {
      const posts = await db.Post.find({});
      res.json(posts);
    } catch (err) {
      console.log("error", err);
      res.status(500).json({ error: "Error getting posts" });
    }
  }
  
  // GET /api/posts/:postId
  async function show(req, res) {
    try {
      const id = req.params.postId;
      const foundPost = await db.Post.findById(id);
      res.json(foundPost);
    } catch (err) {
      console.log('error', err);
      res.status(500).json({ error: "Error finding post" });
    }
  }
  
  // GET /api/users/:userName/posts
  async function indexProfile(req, res) {
    try {
      const username = req.params.userName;
      const foundUser = await db.User.findOne({ username });
      console.log("found user", foundUser);
      const foundPosts = await db.Post.find({ author: foundUser.username });
      console.log("found post", foundPosts);
      res.json(foundPosts);
    } catch (err) {
      console.log("error", err);
      res.status(500).json({ error: "Error getting user's posts" });
    }
  }
  
  // POST /api/user/:username/city/:cityname/posts
  async function post(req, res) {
    try {
      const username = req.params.username;
      console.log('username', username);
      const foundUser = await db.User.findOne({ username });
      console.log('foundUser:', foundUser);
  
      const newPost = new db.Post({
        title: req.body.title,
        content: req.body.content,
        author: foundUser.username,
        authorImg: foundUser.imageUrl
      });
  
      const cityname = req.params.cityname;
      const foundCity = await db.City.findOne({ name: cityname });
      newPost.city = foundCity.name;
  
      const savedPost = await newPost.save();
      res.json(savedPost);
    } catch (err) {
      console.log('error', err);
      res.status(500).json({ error: "Error creating post" });
    }
  }
  
  // PUT '/api/posts/:postId'
  async function update(req, res) {
    try {
      const id = req.params.postId;
      const foundPost = await db.Post.findById(id);
  
      foundPost.title = req.body.title;
      foundPost.content = req.body.content;
      foundPost.city = req.body.city;
      foundPost.author = foundPost.author;
  
      const savedPost = await foundPost.save();
      res.json(savedPost);
    } catch (err) {
      console.log("error", err);
      res.status(500).json({ error: "Error updating post" });
    }
  }
  
  // DELETE /api/posts/:postId
  async function destroy(req, res) {
    try {
      const id = req.params.postId;
      const foundPost = await db.Post.findOneAndRemove({ _id: id });
      res.json(foundPost);
    } catch (err) {
      console.log('err', err);
      res.status(500).json({ error: "Error deleting post" });
    }
  }
  



module.exports = {
  index:index,
  show:show,
  indexProfile:indexProfile,
  post:post,
  update:update,
  destroy:destroy
};