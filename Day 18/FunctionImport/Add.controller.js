sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    "emc/fin/ar/util/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
], function(BaseController, Formatter, Filter, FilterOperator, JSONModel, MessageToast,
    MessageBox, Fragment) {
    'use strict';
    return BaseController.extend("emc.fin.ar.controller.View1",{
        formatter: Formatter,
        onInit: function(){
            //obtain the router object
            //We need to ask our Component.js to give us the router object
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oLocalModel = new JSONModel();
            this.oLocalModel.setData({
                "productData": {
                                    "PRODUCT_ID": "",
                                    "TYPE_CODE": "PR",
                                    "CATEGORY": "Notebooks",
                                    "NAME": "",
                                    "DESCRIPTION": "",
                                    "SUPPLIER_ID": "0100000051",
                                    "SUPPLIER_NAME": "TECUM",
                                    "PRICE": "",
                                    "CURRENCY_CODE": "EUR",
                                    "DIM_UNIT": "CM"
                                }
            });
            this.getView().setModel(this.oLocalModel,"data");
        },
        productId: null,
        onEnter: function (oEvent) {
            //Step 1: What is the Product ID user entered on screen
            this.productId = oEvent.getParameter("value");
            //Step 2: Get the odata model object
            var oDataModel = this.getView().getModel();
            //Step 3: Read single record from odata
            var that = this;
            oDataModel.read("/ProductSet('" + this.productId + "')",{
                success: function(data){
                    //Step 4: in Success call back populate my data - set local model
                    that.oLocalModel.setProperty("/productData", data);
                },
                error: function(oError){
                    //Step 5: Error handling if you love it ;)
                    MessageBox.error("Dude there is a situation here!");
                }
            });
            
            
        },
        onLoad: function(oEvent){
            var oDataModel = this.getView().getModel();
          
            var that = this;
            oDataModel.callFunction("/GetMostExpensiveProduct",{
                urlParameters: {
                    "I_CATEGORY": 'Notebooks'
                },
                success: function(data){
                    
                    that.oLocalModel.setProperty("/productData", data);
                },
                error: function(oError){
                
                    MessageBox.error("Dude there is a situation here!");
                }
            });
        },
        onDelete: function(){
          
            var oDataModel = this.getView().getModel();
          
            var that = this;
            oDataModel.remove("/ProductSet('" + this.productId + "')",{
                success: function(data){
                    
                    MessageToast.show("Product has been deleted now");
                },
                error: function(oError){
                  
                    MessageBox.error("Dude there is a situation here!");
                }
            });
        },
       
        
        onSave: function () {
            debugger
            //MessageToast.show("Save is yet to come!");
            //Step 1: Get the odata model object
            var oDataModel = this.getView().getModel();
            //Step 2: Prepare Payload
            var payload = this.oLocalModel.getProperty("/productData");
            //Step 3: send the POST Call
            oDataModel.create("/ProductSet", payload, {
                success: function(data){
                    MessageToast.show("Product has been created successfully!");
                },
                error: function(oErr){
                    console.log(oErr);
                    MessageBox.error(JSON.parse(oErr.responseText).error.innererror.errordetails[0].message);
                }
            });
        }
        
    });
});