const express = require('express');
const Account = require('../models/account');
const bkfd2Password = require('pbkdf2-password');

const hasher = bkfd2Password();
const router = express.Router();

router.post('/signup', (req, res) => {

  let usernameRegex = /^[a-z0-9]+$/;
  
  if (!usernameRegex.test(req.body.username)) {
    return res.status(400).json({
      error: "BAD USERNAME", 
      code: 1
    });
  }

  if (req.body.password.length < 4 || typeof req.body.password !== "string") {
    return res.status(400).json({
      error: "BAD PASSWORD",
      code: 2
    });
  }

  Account.findOne({ username: req.body.username }, (err, exists) => {
    if (err) throw err;
    if (exists) {
      return res.status(400).json({
        error: "EXISTING USERNAME",
        code: 3
      });
    }
    
    hasher({ password: req.body.password }, function(err, pass, salt, hash) {
      let account = new Account({
        username: req.body.username,
        password: hash,
        salt: salt
      });
      account.save(err => {
        if (err) throw err;
        return res.json({ success:true });
      });
    });
  });
});

router.post('/login', (req, res) => {
  if (typeof req.body.password !== "string") {
    return res.status(401).json({
      error: "PASSWORD IS NOT STRING", 
      code: 1
    });
  }

  Account.findOne({ username: req.body.username }, (err, account) => {
    if (err) throw err;
    if (!account) {
      return res.status(401).json({
        error: "THERE IS NO USER", 
        code: 2
      });
    }
    const validate = hasher({ password: req.body.password, salt: account.salt }, function(err, pass, salt, hash) {
      if (hash === account.password) {
        let session = req.session;
        session.loginInfo = {
          _id: account._id, 
          username: account.username
        };
        return res.json({
          success: true
        });
      } else {
        return res.status(401).json({
          error: "PASSWORD IS NOT CORRECT", 
          code: 3
        });
      }
    });
  });
});

router.get('/getinfo', (req, res) => {
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: "THERE IS NO LOGIN DATA", 
      code: 1
    });
  }

  res.json({ info: req.session.loginInfo });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => { if (err) throw err; });
  return res.json({ success: true });
});

module.exports = router;
