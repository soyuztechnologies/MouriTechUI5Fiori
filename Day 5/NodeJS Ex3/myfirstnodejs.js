var reuse = require('./reuse.js');

const express = require('express')
const app=express()
 
app.use(express.static('webapp'));
// app.get("/mydemo.html",function(req,res){
// 	res.sendFile(__dirname + "/mydemo.html")
// });

app.get('/', function (req, res) {
  res.send('Hello Anubhav!')
});

app.get("/employees", function(req,res){
    res.send([{
		"empId": 1000,
		"empName": "Anubhav ",
		"salary": 2500,
		"currency": "USD"
	}, {
		"empId": 1001,
		"empName": "Raghav",
		"salary": 9999,
		"currency": "EUR"
	}, {
		"empId": 1002,
		"empName": "Syed",
		"salary": 8500,
		"currency": "AED"
	}]);
});

app.get("/employees/:id",function (req,res) {
    var id = req.params.id;
    var empTab = [{
		"empId": 1000,
		"empName": "Anubhav ",
		"salary": 2500,
		"currency": "USD"
	}, {
		"empId": 1001,
		"empName": "Raghav",
		"salary": 9999,
		"currency": "EUR"
	}, {
		"empId": 1002,
		"empName": "Syed",
		"salary": 8500,
		"currency": "AED"
    }];
    for (let i = 0; i < empTab.length; i++) {
        const element = empTab[i];
        if(element.empId == id){
            res.send(element);
            break;
        }
    }
    res.send("could not find employee with id - "+ id);
});

console.log("the webserver is running on http://localhost:3080");
app.listen(3080)





// console.log("welcome to anubhav trainings");

// reuse.printMyName();
// console.log(reuse.addNumbers(6,9));
// console.log(reuse.manipulate(7,7,'*'));
// console.log(reuse.calculateSize(["apple","banana","cherry"]));