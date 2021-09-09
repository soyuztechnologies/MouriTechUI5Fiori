//CSS Using jQuery
function onMagic() {

	$(".box-title").css("background-color", "brown").css("color", "white");
	$("input").css("background-color", "black").css("color", "aqua").css("font-family", "cursive");
	//step 1: get all the elements with class name box-title ---> array 
	// var aBoxTitle = document.getElementsByClassName("box-title");
	//step 2: loop over the array elements (ui) --> inside each loop pass, we will process
	// for(var i=0; i<aBoxTitle.length; i++){
	// 	//Step 3: each loop pass, we get access to individual elements one by one
	// 	var oTitleElement = aBoxTitle[i];
	// 	oTitleElement.style.backgroundColor = "black";
	// 	oTitleElement.style.color = "white";
	// }

}