function addNode()
     {var newP = document.createElement("p");
	  var textNode = document.createTextNode(" This is a new text node");
	  newP.appendChild(textNode);
      document.getElementById("firstP").appendChild(newP);
 }

      function onDraw(){
          var oNewElement = document.createElement("h4");
          var oText = document.createTextNode(document.getElementById("got").value);
          oNewElement.appendChild(oText);
          
          var oCanvas = document.getElementById("canvas");
          oCanvas.appendChild(oNewElement);
     }