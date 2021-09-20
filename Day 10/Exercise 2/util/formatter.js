sap.ui.define([],function(){
	return {
		getStatus: function(inp){
			switch (inp) {
				case "available":
					return "Success";
				case "unavailable":
					return "Error";
				default:
			}
		}	
	};
});