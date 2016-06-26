exports.render = function(req, res){
  res.render('index', {
    title: 'MEAN CHAT',
    user: JSON.stringify(req.user)
  });
};
