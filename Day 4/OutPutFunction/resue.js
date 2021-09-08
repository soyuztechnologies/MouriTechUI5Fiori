function mySecondFunction(){
	//Obtaining the object of our input field from DOM
	var oInp = document.getElementById("num");
	var emp = {"empid":100};
	emp.salary = 9000;
	console.log(emp);
	var empStr = JSON.stringify(emp);
	console.log(empStr);
	empStr = '{"x":10, "y":"abc"}';
	emp = JSON.parse(empStr);
	console.log(emp);

	alert(oInp.value);
}


function onPress(){
	var oInpUsr = document.getElementById("usr");
		document.write("<h1>Your Name is: </h1>" + "<em style='color:red' />" + oInpUsr.value);

}

function onPressValue(){
	var oInpUsr = document.getElementById("msg");

		document.getElementById("msg").innerText = "This is the JavaScript";
}
