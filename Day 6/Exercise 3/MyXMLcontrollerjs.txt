sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function(Controller) {
    'use strict';
    return Controller.extend("mickey.controller.MyXML",{
        onInit: function(){

        },
        clickMe: function(params) {
            //sap.ui.getCore()
            var oView = this.getView();
            var oControl = oView.byId("MyButton");

            //var oControl = sap.ui.getCore().byId("__xmlview0--MyButton");

            oControl.setVisible(false);
        }
    });
});