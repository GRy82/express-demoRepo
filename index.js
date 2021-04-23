const express = require('express');
const courses = require('./routes/courses');
const home = require('./routes/home');
const Joi = require('joi');
const app = express();
const logger = require('./middleware/logger');
const authenticator = require('./middleware/authenticator');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

app.set('view engine', 'pug');
app.set('views', './views');
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

//if NODE_ENV is not defined, app.get returns dev env by default.
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Mogran enabled...');
}
app.use(logger);
app.use(authenticator);

//----------------------------------------------------

dbDebugger('Connected to the Database...');
//Db work...

const port = process.env.PORT || 3000;
router.listen(port, () => console.log(`Listening on port ${port}...`));