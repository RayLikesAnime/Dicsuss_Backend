var db = require('../models');

//GET /api/users
async function index(req, res) {
    try {
      const foundUsers = await db.User.find({});
      res.json(foundUsers);
    } catch (err) {
      console.log("WHERE ALL DA PPL AT!?", err);
      res.status(500).json({ error: "Error getting users" });
    }
  }
  
  // GET /api/users/:userId
  async function show(req, res) {
    try {
      const id = req.params.userId;
      console.log('THIS IS MY REQUEST ', id);
      const foundUser = await db.User.find({ idFromAuth0: id });
      res.json(foundUser);
    } catch (err) {
      console.log("Error getting that user: ", err);
      res.status(500).json({ error: "Error getting that user" });
    }
  }
  
  // GET /api/user/:username
  async function showOne(req, res) {
    try {
      const username = req.params.username;
      console.log('getting user now ', username);
      const foundUser = await db.User.findOne({ username });
      console.log("FOUNNDD USER in controller", foundUser);
      res.json(foundUser);
    } catch (err) {
      console.log("Error getting that user: ", err);
      res.status(500).json({ error: "Error getting that user" });
    }
  }
  
  // POST /api/users
  async function create(req, res) {
    try {
      const newUser = new db.User(req.body);
      const createdUser = await db.User.create(newUser);
      res.json(createdUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error creating user" });
    }
  }
  
  // PUT /api/users/:username
  async function update(req, res) {
    try {
      console.log('User update: ', req.params);
      const username = req.params.username;
      const user = await db.User.findOne({ username });
  
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
  
      console.log(user, "this is found user");
  
      user.imageUrl = req.body.imageUrl;
      user.aboutMe = req.body.aboutMe;
      user.currentCity = req.body.currentCity;
  
      const savedUser = await user.save();
      console.log("we saved the user", savedUser.email);
      res.json(savedUser);
    } catch (err) {
      console.log('user update error!: ', err);
      res.status(500).json({ error: "Error updating user" });
    }
  }
  
  // DELETE /api/users/:username
  async function destroy(req, res) {
    try {
      console.log('THIS USER IS BEING DELETED:', req.params);
      const username = req.params.username;
      const deletedUser = await db.User.findOneAndRemove({ username });
  
      if (!deletedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }
  
      res.json(deletedUser);
    } catch (err) {
      console.log('ERROR DELETING A USER: ', err);
      res.status(500).json({ error: "Error deleting user" });
    }
  }
  
module.exports = {
  index:index,
  show:show,
  showOne:showOne,
  create: create,
  update: update,
  destroy: destroy
};