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