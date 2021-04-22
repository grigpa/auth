const User = require('../models/user');

exports.form = (req, res) => {
  res.render('register', { title: 'Регистрация' });
};

exports.submit = (req, res, next) => {
  var data = req.body;

  User.getByLogin(data.login, (err, user) => {
    if (err) return next(err);

    if (user.id) {
      res.error('Пользователь уже существует!');
      res.redirect('back');
    } else {
      user = new User({
        login: data.login,
        password: data.password,
        surname: data.surname,
        name: data.name,
        patronymic: data.patronymic,
        series: data.series,
        number: data.number
      });
      console.log('User', user);
      return;
      user.save((err) => {
        if (err) return next(err);
        req.session.uid = user.id;
        res.redirect('/')
      });
    }
  });
};
