const User = require('../models/user');

exports.info = (req, res) => {
  res.render('info', { title: 'Сведения о пользователе' });
};

exports.update = (req, res, next) => {
  var data = req.body.user;
User.get(data.id, (err, user) => {
  user.testField = data.testField;
      user.update((err) => {
        if (err) return next(err);
        req.session.uid = user.id;
        res.redirect('/')
      });
})


  // User.getByName(data.name, (err, user) => {
  //   if (err) return next(err);
  //
  //   if (user.id) {
  //     res.error('Пользователь уже существует!');
  //     res.redirect('back');
  //   } else {
  //     user = new User({
  //       name: data.name,
  //       pass: data.pass,
  //       testField: data.testField
  //     });
  //     user.save((err) => {
  //       if (err) return next(err);
  //       req.session.uid = user.id;
  //       res.redirect('/')
  //     });
  //   }
  // });

};
