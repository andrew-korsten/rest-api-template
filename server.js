
test 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ inits ~~~~~~~~~~~~~~~~~~~~~~~
// B1. require the express
const express = require('express');
// B2. Create the app variable 
const app = express();
// B4. Create the mongoose
const mongoose = require('mongoose');

const config = require('config');

const dbConfig = config.get('Andy.dbConfig.dbName');


// B5. Connect to mongoDB via mongoose
// B5.1 Specify the connection code - B5.2 is in the main file
mongoose.connect(dbConfig)

// B6. Check for errors with server
// B6.1 Create db var
const db = mongoose.connection;

// B6.2 Check for errors
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));


// B7. Enable express to receive json
app.use(express.json())

// B8. Specify the router in the main file
const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter)


// B3. Create the listener
app.listen(3000, () => console.log("Server Started"));