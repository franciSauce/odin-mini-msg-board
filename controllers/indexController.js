const { messages, users } = require('../db');
const Message = require('../models/Message');
const User = require('../models/User');

let currentUser = null;
let authError = null;

module.exports = {
    get: (req, res) => {
        res.render('index', { currentUser, authError, open: false });
    },
    newMsg: (req, res) => {
        const {text} = req.body;

        messages.push(new Message(
            crypto.randomUUID(),
            text,
            new Date().toLocaleString(),
            currentUser ? currentUser.id : null
        ));

        res.redirect('/');
    },
    newUser: (req, res) => {
        const { name, password } = req.body;
        const existingUser = users.find(user => user.name === name);

        if (!existingUser) {
            const newUser = new User(
                crypto.randomUUID(),
                name,
                password,
                '/guest.svg'
            );
            users.push(newUser);
            currentUser = newUser;
            authError = null;
            return res.redirect('/');
        }

        if (password != existingUser.password) {
            authError = 'Wrong password';
            return res.render('index', { currentUser, authError, open: true });
        }

        currentUser = existingUser;
        authError = null;
        return res.redirect('/');
    },

    logout: (req, res) => {
        currentUser = null;
        authError = null;

        res.json({ ok: true });
    }
}