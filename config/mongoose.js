const mongoose = require('mongoose');

// adapting to urlencoded() as new guidelines requires this
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

// connecting mongoose to the localhost 
mongoose.connect('mongodb://localhost/task_list');

// receiving the connection in 'db' variable
const db = mongoose.connection;

// if error occure on connecting
db.on('error', console.error.bind(console, 'Error in connecting to server'));

// Once connection is formed
db.once('open', function(){
    console.log('Success in connecting to mongoDB');
});

