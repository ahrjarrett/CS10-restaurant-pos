if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv'); // eslint-disable-line global-require
  dotenv.config();
}

const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const { mongoURI: db, clientURI } = require('./config/keys');
// Route Imports
const employeeRoutes = require('./api/routes/employeeRoutes');
const itemRoutes = require('./api/routes/itemRoutes');
const restaurantRoutes = require('./api/routes/restaurantRoutes');
const orderRoutes = require('./api/routes/orderRoutes');
const partyRoutes = require('./api/routes/partyRoutes');
const stripeRoutes = require('./api/routes/stripeRoutes');
const tableRoutes = require('./api/routes/tableRoutes');

// TODO: Setup morgan and helmet
const corsOptions = { origin: clientURI, credentials: true };

// Initialize Server
const server = express();


// Middleware
server.use(express.json());
server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: false }));

// Connect to MongDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Passport Middleware
server.use(passport.initialize());

// Passes passport to passport.js
require('./config/passport.js')(passport);

// Initialize PORT
const PORT = process.env.PORT || 5000;

// Test route
server.post('/api', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 'Success' });
});

// Routes
<<<<<<< HEAD
employeeRoutes(server);
itemRoutes(server, passport.authenticate('jwt', { session: false }));
restaurantRoutes(server, passport.authenticate('jwt', { session: false }));
orderRoutes(server, passport.authenticate('jwt', { session: false }));
partyRoutes(server, passport.authenticate('jwt', { session: false }));
stripeRoutes(server, passport.authenticate('jwt', { session: false }));
tableRoutes(server, passport.authenticate('jwt', { session: false }));
=======
server.use('/api/employees', employees);
server.use('/api/restaurants', passport.authenticate('jwt', { session: false }), restaurants);
server.use('/api/items', passport.authenticate('jwt', { session: false }), items);
server.use('/api/party', passport.authenticate('jwt', { session: false }), party);
server.use('/api/orders', passport.authenticate('jwt', { session: false }), orders);
server.use('/api/tables', passport.authenticate('jwt', { session: false }), tables);
server.use('/api/subscriptions', passport.authenticate('jwt', { session: false }), subscriptions);
>>>>>>> de22ca27c043df9ed05eb40b33adb9a219d13ae4

server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server running on port: ${PORT}`);
});

<<<<<<< HEAD
module.exports = server;
=======
// * This must be at the bottom of the file
// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
>>>>>>> de22ca27c043df9ed05eb40b33adb9a219d13ae4
