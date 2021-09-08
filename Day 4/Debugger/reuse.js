
function onPress(){
	var oInpUsr = document.getElementById("usr").value;
	var oPass = document.getElementById("password").value;
	if(oInpUsr === oPass){
		debugger;
		document.write("<h1>Your Name is: </h1>" + oInpUsr + "<h1>Your Password is: </h1>" + oPass);
	}

	else {
		debugger;
		alert("Your Name and Password are not same")
	}


}
