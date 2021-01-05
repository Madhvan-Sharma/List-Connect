// making express module available and defining port 
const { urlencoded } = require('body-parser');
const express = require('express');
const port = 8000;
// making path module available
const path = require('path');

// firing up express
const app = express();

// Making server.js connect with mongoose.js
const db = require('./config/mongoose.js');
// getting task Schema 
const tasks = require('./models/tasks.js');

// changing view folder and assigning ejs as template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares:

// setting up static files folder
app.use(express.static('assets'));
// using parser
app.use(express.urlencoded());

// Object containing month number and their respective string values
let months = {
    '01' : 'Jan ',
    '02' : 'Feb ',
    '03' : 'March ',
    '04' : 'April ',
    '05' : 'May ',
    '06' : 'June ',
    '07' : 'July ',
    '08' : 'Aug ',
    '09' : 'Sep ',
    '10' : 'Oct ',
    '11' : 'Nov ',
    '12' : 'Dec '
};

// this is passed to ejs file to write the innerText of the button 
let categoryRelations = {
    success : 'Personal',
    primary : 'Work',
    info : 'Cleaning',
    danger : 'School',
    secondary : 'Other'
}


// Requests and their controllers

// Homepage
app.get('/', function(req,res){
    // getting all the tasks
    tasks.find({}, function(err, taskList){
        
        if(err){
            console.log('There is an error in fetching the tasks');
            return;
        }

        return res.render('index', {
            tasks : taskList,
            categories : categoryRelations
        });
    });
});

// Form post request for adding Tasks
app.post('/addtask',function(req,res){
    console.log(req.body);

    // Formatting date in suitable format
    let arr = req.body.date.split('-');
    let dateFormatted = arr[2] + ' ' + months[arr[1]] + arr[0];

    tasks.create({

        description : req.body.description,
        date : dateFormatted,
        category : req.body.category

    },function(err, newTask){
        if(err){

            console.log('Error in creating new Task');
            return;
        }

        console.log('New Task Saved : ', newTask);

        return res.redirect('back');
    });
});


// request and response for Deltion of tasks
app.post('/delete-tasks', function(req,res){
    
    // getting the task Ids in an array 
    let ids = req.body['task-id'];

    // console.log(ids);

    // Checking if only one element is there in ids i.e. it is not an array but a string
    if(typeof ids == 'string'){
        tasks.findByIdAndDelete(ids, function(err){
            if(err){
                console.log(`error in deleting from DB : ${err}`);
                return;
            }
        });
    }else{
        
        // finding all task id in DB and deleting them
        for(let i = 0 ;i < ids.length ; i++){
            tasks.findByIdAndDelete(ids[i], function(err){
                
                if(err){
                    console.log(`error in deleting from DB : ${err}`);
                    return;
                }
            });
        }
    }

    return res.redirect('back');
});



// making app listen to port 8000
app.listen(port, function(err){
    if(err){
        console.log(`Error in firing up server : ${err}`);
        return;
    }

    console.log(`Server is up and running at port ${port}`);
});

