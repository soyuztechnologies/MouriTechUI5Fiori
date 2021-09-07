function myFirstDemoFunction() {
	alert('welcome to inline js');
}
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
function onLogin() {
	var oInpUsr = document.getElementById("usr");
	var valUser = oInpUsr.value;
	var valPwd = document.getElementById("pwd").value; //chaining example
	if(valUser === "Anubhav" && valPwd === "Anubhav"){
		///Login successs
		//debugger;
		document.write("<h1>Login was a Success!! <em style='color:red'>Roger</em></h1>");
	} else {
		 ///logon failed
		//alert("login failed");
		document.getElementById("msg").innerText = "Your login was abandoned due invalid CRED";
	}
}
function onMagic(){
	//step 1: get all the elements with class name box-title ---> array 
	var aBoxTitle = document.getElementsByClassName("box-title");
	//step 2: loop over the array elements (ui) --> inside each loop pass, we will process
	for(var i=0; i<aBoxTitle.length; i++){
		//Step 3: each loop pass, we get access to individual elements one by one
		var oTitleElement = aBoxTitle[i];
		oTitleElement.style.backgroundColor = "black";
		oTitleElement.style.color = "white";
	}
	
}
function loadJson(){
	var x = {
				"empTab": [{
						"empId": 100,
						"empName": "Anubhav",
						"salary": 5000
					},
					{
						"empId": 200,
						"empName": "Riyaz",
						"salary": 6800
					},
					{
						"empId": 300,
						"empName": "Max",
						"salary": 9000
					},
					{
						"empId": 400,
						"empName": "Stefeny",
						"salary": 14000
					}
				],
				"empStr": {
					"empId": 999,
					"empName": "Mario",
					"salary": 1470
				}
			};
	return x;
}
function onJSONLoop(){
	var sample = loadJson();
	var aEmpTab = sample.empTab;
	for(var i=0;i<aEmpTab.length;i++){
		console.log(aEmpTab[i].empName);
	}
}
function onDraw(){
	var oNewElement = document.createElement("h4");
	var oText = document.createTextNode(document.getElementById("got").value);
	oNewElement.appendChild(oText);
	
	var oCanvas = document.getElementById("canvas");
	oCanvas.appendChild(oNewElement);
}
