sap.ui.define([
    "mickey/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "mickey/model/models"
], function(Controller, JSONModel, myModel) {
    //'use strict';
    return Controller.extend("mickey.controller.MyXML",{
        //Once my Controller object is created then only initialization should happen
        //onInit - like constructor of the class, which gets called once the object is created
        onInit: function(){
            //another way of initializing class level variables
            //base class method which is of same name
            Controller.prototype.onInit.apply(this);
            console.log("Child Class Constructor");
            //a global variable @ class level which can be used by other methods
            this.oView = this.getView();

            var oModel = myModel.createJSONModel("model/mockdata/data.json");

            var oModelGOT = myModel.createJSONModel("model/mockdata/sample.json");
            //Step 3: Make model aware to the app
            sap.ui.getCore().setModel(oModel);
            sap.ui.getCore().setModel(oModelGOT,"got");
            
            var oResource = myModel.createResourceModel();
            sap.ui.getCore().setModel(oResource, "i18n");
            
            var oXMLModel = myModel.createXMLModel();
            sap.ui.getCore().setModel(oXMLModel);

           
            var oTab = this.getView().byId("myTable");
            //oTab.bindAggregation("rows", "/empTab");
            oTab.bindRows("/empTab/row");
            this.getView().byId("myForm").bindElement("/empTab/row/0");
        }
    });
});