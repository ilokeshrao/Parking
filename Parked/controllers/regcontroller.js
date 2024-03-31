const Reg = require('../models/reg');

exports.loginform = (req, res) => {
    res.render('login.ejs', { message: '' });
};

exports.logincheck = async (req, res) => {
    const { us, pass } = req.body;
    const record = await Reg.findOne({ username: us });
    if (record !== null) {
        if (record.password == pass) {
            req.session.isAuth = true
            req.session.username = us
            req.session.userid = record.id
            res.redirect('/parking');
        } else {
            res.render('login.ejs', { message: 'Wrong Credentials' });
        }

    } else {
        res.render('login.ejs', { message: 'Wrong Credentials' });
    }
};
