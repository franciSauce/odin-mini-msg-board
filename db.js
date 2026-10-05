const Message = require('./models/Message');
const User = require('./models/User');

const amanda = new User(crypto.randomUUID(), 'Amanda', 'amanda', '/female.svg');
const charles = new User(crypto.randomUUID(), 'Charles', 'charles', '/male.svg');

const users = [ amanda, charles ]

const messages = [
  new Message(
    crypto.randomUUID(),
    'Hi there!',
    new Date().toLocaleString(),
    amanda.id,
  ),
  new Message(
    crypto.randomUUID(),
    'Hello World!',
    new Date().toLocaleString(),
    charles.id,
  )
]

module.exports = {
  messages: messages,
  users: users,
}