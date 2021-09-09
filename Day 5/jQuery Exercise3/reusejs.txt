//Animation
function Enlarge(){
	$("#monalisa").animate({
		width: '+=5px',
		height: '+=5px'
	});
}


//API call
function getAllCountries(){
	$.get("https://api.covid19api.com/countries",function(data)	{
			var aCountries = data;
			for (var i=0; i<aCountries.length; i++) {
				onDraw(aCountries[i].ISO2 + " - " + aCountries[i].Country);
			}
	});
}

function onDraw(countryVal){
	var oNewElement = document.createElement("h4");
	//var oText = document.createTextNode(document.getElementById("got").value);
	var oText = document.createTextNode(countryVal);
	oNewElement.appendChild(oText);
	
	var oCanvas = document.getElementById("canvas");
	oCanvas.appendChild(oNewElement);
}