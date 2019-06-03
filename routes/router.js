const bcrypt = require('bcrypt');

module.exports = (app, User) => {
  
  app.get('/', (req, res) => {
    return res.render('home.html');
  });

  app.get('/log_in', (req, res) => {
    res.render('log_in.html');
  });
  
  app.get('/sign_up', (req, res) => {
    res.render('sign_up.html');
  });

  app.get('/find_pw', (req, res) => {
    res.render('find_pw.html');
  });

  app.get('/update_pw', (req, res) => {
    res.render('update_pw.html');
  });

  app.get('/delete', (req, res) => {
    res.render('delete.html');
  });

  app.get('/profile', (req, res) => {
    res.render('profile.html');
  });

  app.get('/logout', (req, res) => {
    res.redirect('/api/logout');
  });

  app.get('/api/find_pw', (req, res) => {
    if (req.query.id.length === 0) {
      console.log('Wrong input');
      return res.redirect('/find_pw');
    }
    User.findOne({id: req.query.id}, (err, user) => {
      if (err) {
        console.log(err);
        return res.redirect('/find_pw');
      }
      else if (user === null) {
        console.log('ID does not exists');
        return res.redirect('/find_pw');
      }
      else {
        return res.send("Your password is " + user.pw);
      }
    });
  });

  app.get('/api/retrieve', (req, res) => {
    User.find({}, (err, user) => {
      if (err) {
      }
      else {
        res.json(user);
      }
    });
  });

  app.get('/api/delete', (req, res) => {   
    if (req.query.id.length === 0 || req.query.pw.length === 0 || req.query.pwcheck.length === 0) {
      console.log('Wrong input');
      return res.redirect('/delete');
    }
    else if (req.query.pw !== req.query.pwcheck) {
      console.log('PW and Retype PW is different');
      return res.redirect('/delete');
    }
    else {
      User.authenticate(req.query.id, req.query.pw, function (err, user) {
        if (err || !user) {
          var err = new Error('Wrong email or password!');
          err.status = 401;
          console.log(err);
          return res.redirect('/delete');
        } else {
          User.deleteOne({id: req.query.id}, (err) => {
            if (err) {
      	      console.log(err);
  	      return res.redirect('/delete');
 	    }
	    console.log('user successfully deleted');
	    return res.redirect('/');
	  });
        }
      });
    }
  });

  app.post('/api/add', (req, res) => {
    if (req.body.name.length === 0 || req.body.id.length === 0 || req.body.pw.length === 0 || req.body.pwcheck.length === 0) {
      console.log('Wrong input');
      return res.redirect('/sign_up');
    }
    if (req.body.pw !== req.body.pwcheck) {
      console.log('PW and Retype PW is different');
      return res.redirect('/sign_up');
    }

    User.findOne({id: req.body.id}, (err, user) => {
      if (err) {
	return res.redirect('/sign_up');
      }
      else if (user !== null) {
        console.log('ID already exists');
        return res.redirect('/sign_up');
      }
      else {	
        bcrypt.hash(req.body.pw, 10, function(err, hash) {
	if (err) {
	    console.log(err);
	  }
	  new User({"id":req.body.id, "pw":hash, "name":req.body.name}).save((err)=>{
	    if(err){
	      console.log(err);
	      return res.redirect('/sign_up');	
	    }
	    console.log('good database created');
            return res.redirect('/log_in');
	  })
	});
      }
    });
  });

  app.post('/api/update_pw', (req, res) => {
    if (req.body.id.length === 0 || req.body.oldpw.length === 0 || req.body.pw.length === 0 || req.body.pwcheck.length === 0) {
      console.log('Wrong input');
      return res.redirect('/update_pw');
    }

    if (req.body.pw !== req.body.pwcheck) {
      console.log('PW and Retype PW is different');
      return res.redirect('/update_pw');
    }
    
    User.findOne({id: req.body.id}, (err, user) => {
      if (err) return res.redirect('/update_pw');
      else if (user === null) {
        console.log('ID does not exists');
        return res.redirect('/update_pw');
      }
      else {
        User.authenticate(req.body.id, req.body.oldpw, function (err, user) {
        if (err || !user) {
          var err = new Error('Wrong email or password!');
          err.status = 401;
          console.log(err);
          return res.redirect('/update_pw');
        } else {
        bcrypt.hash(req.body.pw, 10, (err, hash) => {
        user.pw = hash;
	user.save(err => {
          if (err) {
            console.log(err);
            return res.redirect('/update_pw');
          }
          console.log('database successfully updated');
          return res.redirect('/');
        });
	});
        }
      });
      }
    });
  });

  app.post('/api/login', (req, res) => {
    if (req.body.id && req.body.pw) {
      User.authenticate(req.body.id, req.body.pw, function (err, user) {
	if (err || !user) {
	  var err = new Error('Wrong email or password!');
	  err.status = 401;
	  console.log(err);
          return res.redirect('/log_in');
        } else {
          req.session.user_id = user.id;
	  req.session.user_name = user.name;
          return res.redirect('/profile');
        }
      });
    } else {
      var err = new Error('All fields are required!');
      err.status = 400;
      console.log(err);
      return res.redirect('/log_in');
    }
  });

  app.get('/api/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });
}
