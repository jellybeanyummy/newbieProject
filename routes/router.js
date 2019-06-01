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
    if (req.query.id.length === 0) {
      console.log('Wrong input');
      return res.redirect('/find_pw');
    }
    User.deleteOne({id: req.query.id}, (err) => {
      if (err) {
        console.log(err);
        return res.redirect('/delete');
      }
      console.log('data successfully deleted');
      return res.redirect('/');
    });
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
      if (err) return res.redirect('/sign_up');
      else if (user !== null) {
        console.log('ID already exists');
        return res.redirect('/sign_up');
      }
      else {
        const newuser = new User();
        newuser.id = req.body.id;
        newuser.pw = req.body.pw;
        newuser.nickname = req.body.nickname;
    
        newuser.save(err => {
          if (err) {
            console.log(err);
            return res.redirect('/sign_up');
          }
          console.log('good database created');
          return res.redirect('/');
        });
      }
    });
  });

  app.post('/api/update_pw', (req, res) => {
    if (req.body.id.length === 0 || req.body.pw.length === 0 || req.body.pwcheck.length === 0) {
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
        user.pw = req.body.pw;
    
        user.save(err => {
          if (err) {
            console.log(err);
            return res.redirect('/update_pw');
          }
          console.log('database successfully updated');
          return res.redirect('/');
        });
      }
    });
  });
  
}
