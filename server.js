const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED EXCEPTION! => Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' }); // It only saves during the execution of this piece of code
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true /*,
    useCreateIndex: true,
    useFindAndModify: false,*/,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err));

//LOCAL DATABASE CONNECTION
// mongoose
//   .connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log('DB connection successful!'));

//console.log(app.get('env'));
//process.env['NODE_ENV'] = 'development'; It only saves during th execution of this piece of code
//console.log(process.env.NODE_ENV);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! => Shutting down...');
  server.close(() => {
    process.exit(1); // on production there will be tools to restart the crashed app
  });
});
