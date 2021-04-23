const User = require('../models/user');

exports.form = (req, res) => {
  res.render('register', { title: 'Регистрация' });
};

exports.submitForm = (req, res, next) => {
  var data = req.body;

  User.getByLogin(data.login, (err, user) => {
    if (err) return next(err);

    if (user?.id) {
      res.error('Пользователь уже существует!');
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

      user.save((err, id) => {
        if (err) return next(err);
        req.session.uid = id;
        res.end({success: true})
      });

    }
  });
};
