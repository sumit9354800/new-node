const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");

exports.getLogin = (req, res, next) => {
  res.render('auth/login', { currentPage: 'Login', title: 'Login Page', isLoggedIn: false });
}
exports.postLogin = (req, res, next) => {

  req.session.isLoggedIn = true
  res.redirect('/')
}
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
}

exports.getSignUp = (req, res, next) => {
  // Pass empty oldInput and errorMessages so template can safely access them
  res.render('auth/sign-up', {
    currentPage: 'sign up',
    title: 'sign up Page',
    isLoggedIn: false,
    oldInput: { firstName: '', lastName: '', email: '', userType: '' },
    errorMessages: []
  })
}


exports.postSignUp = [
  check('firstName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First Name should be atleast 2 character long')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('First Name should contain only alphabats'),

  check('lastName')
    // 0 or more than character if add *
    .matches(/^[A-Za-z\s]*$/)
    .withMessage('Last Name should contain only alphabats'),

  check('email')
    .isEmail()
    .withMessage('Plase enter a valid Email')
    .normalizeEmail(),

  check('password')
    .isLength({ min: 8 })
    .withMessage('Password Should be atleast 8 character long')
    .matches(/[A-Z]/)
    .withMessage('password Should be atleast one upper case character')
    .matches(/[a-z]/)
    .withMessage('password should be atleast one lower case character')
    .matches(/[0-9]/)
    .withMessage('password should be atleast one number')
    .matches(/[!@#$&%]/)
    .withMessage('password should be atleast once Special Character')
    .trim(),

  check('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password do not match')
      }
      return true
    }),
  check('userType')
    .notEmpty()
    .isIn(['guest', 'host']),

  check('terms')
    .notEmpty()
    .withMessage('please Accept the term and conditions')
    .custom((value, { req }) => {
      if (value !== 'on') {
        throw new Error('Please accept the term and conditions')
      }
      return true
    }),

  (req, res, next) => {

    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(442).render('auth/sign-up', {
        currentPage: 'sign up',
        title: 'sign up Page',
        isLoggedIn: false,
        errorMessages: errors.array().map(err => err.msg),
        oldInput: { firstName, lastName, email, userType, }
      })
    }

    const user = new User({ firstName, lastName, email, password, userType })
    user.save().then((result) => {
      console.log('value post', result)
      res.redirect('/login')
    }).catch((err) => {
      console.log('some error', err)
      return res.status(442).render('auth/sign-up', {
        currentPage: 'sign up',
        title: 'sign up Page',
        isLoggedIn: false,
        errorMessages: [err.message],
        oldInput: { firstName, lastName, email, userType, }
      })
      // res.redirect('/sign-up')
    })

    // res.redirect('/login')
  }]