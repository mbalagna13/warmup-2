const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const queries = require('../db/queries')
const User = require('../db/queries');


function validateUser(user) {
  const validEmail = typeof user.email == 'string' &&
    user.email.trim() != '';
  const validPassword = typeof user.password == 'string' &&
    user.password.trim() != '' &&
    user.password.trim().length >= 6;

  return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
  if(validateUser(req.body)) {
    User
    .getUserByEmail(req.body.email)
    .then(user => {
      if(!user) {
        bcrypt.hash(req.body.password, 4)
          .then((hash) => {
            const user = {
              name:req.body.name,
              email: req.body.email,
              password: hash
            }
            User
            .createUser(user)
            .then(user => {
              res.json(user)
            })
          })
      } else {
        next(new Error('Invalid user'))
      }
    })
  } else {
    next( new Error('Invalid Password or Email'))
  }
})

router.post('/login', (req, res, next) => {
  if (validateUser(req.body)) {
    Person
      .getUserByEmail(req.body.email)
      .then(person => {
        console.log('person', person);
        if (person) {
          console.log('if');
          bcrypt.compare(req.body.password, person.password)
            .then((id) => {res.json({
                      person,
                      id,
                      token,
                      message: 'ok'
                    });
                    alert('Sign-IN Successful!')
                  });
              } else {
                console.log('else');
                next(new Error('Invalid user'))
              }console.log('missed');
            })
          } else {
            next( new Error('Invalid user'))
          }
        })
  } else {
    next( new Error('Invalid Password or Email'))
  }
});

router.get('/', (req,res) => {
  queries.getAlluers().then(users => {
    res.json(users)
  })
})
