exports.error404 = (req, res, next) => {
  console.log('404 - no route matched for:', req.originalUrl);
  res.status(404).render('404', { currentPage: '404', title: 'Page Not Found' });
}