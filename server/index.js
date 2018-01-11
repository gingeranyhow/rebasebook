const express = require('express');
let app = express();
const db = require('../database-postgres/index.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


let port = 3000;

// Get all posts
app.get('/:username/posts', function(req, res) {
  res.json(`hi from GET all posts, ${req.params.username}, here are all the posts`);
});

// Get posts by a certain user
app.get('/:username/posts/:otherusername', function(req, res) {
  res.json(`hi from GET user posts, ${req.params.username}, here are ${req.params.otherusername}'s posts`);
});

// Add new post to database
app.post('/:username/posts', function(req, res) {
  console.log(req.params.username);
  console.log(req.body.text);		
  db.createPost(req.params.username, req.body.text, (err, data) => {
    if (err) {		
      res.sendStatus(404);		
    } else {		
      res.status(200).json(data);		
    }		
  })		
  // res.send(`hi from POST new post, ${req.params.username}, I made a post with this text "${req.body.text}"`);		
  res.send(`hi from POST new post, ${req.params.username}, I made a post with this text "${req.body.text}"`);
});

app.get('/:username/profile/:user', function(req, res) {
  db.searchSomeone(req.params.user, (err, res) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(res);
    }
  });
});

app.listen(process.env.PORT || port, function() {
  console.log(`listening on port ${port}`);
});
