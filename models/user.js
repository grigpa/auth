'use strict';

const mysql = require('mysql');
const bcrypt = require('bcrypt');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeapp'
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});


class User {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }

    save(cb) {
        if (this.id) {
            this.update(cb);
        } else {
            // db.incr('user:ids', (err, id) => {
            //   if (err) return cb(err);
            //   this.id = id;
            //   this.hashPassword((err) => {
            //     if (err) return cb(err);
            //     this.update(cb);
            //   });
            // });
        }
    }

    update(cb) {
        const id = this.id;
        // db.set(`user:id:${this.name}`, id, (err) => {
        //   if (err) return cb(err);
        //   db.hmset(`user:${id}`, this, (err) => {
        //     cb(err);
        //   });
        // });
    }

    hashPassword(cb) {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) return cb(err);
            this.salt = salt;
            bcrypt.hash(this.pass, salt, (err, hash) => {
                if (err) return cb(err);
                this.pass = hash;
                cb();
            });
        });
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            testField: this.testField
        };
    }

    static getByLogin(login, cb) {
        let findUserQuery = 'SELECT * FROM users WHERE login=?';
        let params = [login];
        conn.query(findUserQuery, params, function (err, rows, fields) {
            if (err) {
                cb(true, null);
            } else {
                cb(null, rows.length > 0 ? rows[0] : null);
            }
        });
    }

    static getByName(name, cb) {
        User.getId(name, (err, id) => {
            if (err) return cb(err);
            User.get(id, cb);
        });
    }

    static getId(name, cb) {
        // db.get(`user:id:${name}`, cb);
    }

    static get(id, cb) {
        // db.hgetall(`user:${id}`, (err, user) => {
        //   if (err) return cb(err);
        //   cb(null, new User(user));
        // });
    }

    static authenticate(name, pass, cb) {
        User.getByName(name, (err, user) => {
            if (err) return cb(err);
            if (!user.id) return cb();
            bcrypt.hash(pass, user.salt, (err, hash) => {
                if (err) return cb(err);
                if (hash == user.pass) return cb(null, user);
                cb();
            });
        });
    }
}

module.exports = User;
