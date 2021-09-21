sap.ui.define([
    'emc/fin/ar/anubhav/controller/BaseController',
    "emc/fin/ar/anubhav/util/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
], function(BaseController, Formatter, Filter, FilterOperator, JSONModel, MessageToast,
    MessageBox, Fragment) {
    'use strict';
    return BaseController.extend("emc.fin.ar.anubhav.controller.View1",{
        formatter: Formatter,
        onInit: function(){
            //obtain the router object
            //We need to ask our Component.js to give us the router object
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oLocalModel = new JSONModel();
            this.oLocalModel.setData({
                "productData": {
                                       "ProductId" : "JU-1010",
                                        "TypeCode" : "PR",
                                        "Category" : "Notebooks",
                                        "Name" : "Notebook Professional 15",
                                        "Description" : "My product Anubhav",
                                        "SupplierId" : "100000051",
                                        "SupplierName" : "TECUM",
                                        "TaxTarifCode" : 1,
                                        "MeasureUnit" : "EA",
                                        "Price" : "2333.0000",
                                        "CurrencyCode" : "EUR",
                                        "DimUnit" : "CM"
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
            //Step 3: Read single record from odata
            var that = this;
            oDataModel.callFunction("/GetMostExpensiveProduct",{
                urlParameters: {
                    "I_CATEGORY": 'Notebooks'
                },
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
        onDelete: function(){
            //Step 1: What is the Product ID user entered on screen
//            var productId = oEvent.getParameter("value");
            //Step 2: Get the odata model object
            var oDataModel = this.getView().getModel();
            //Step 3: Read single record from odata
            var that = this;
            oDataModel.remove("/ProductSet('" + this.productId + "')",{
                success: function(data){
                    //Step 4: in Success call back populate my data - set local model
                    MessageToast.show("Product has been deleted now");
                },
                error: function(oError){
                    //Step 5: Error handling if you love it ;)
                    MessageBox.error("Dude there is a situation here!");
                }
            });
        },
        inpField: null,
        oSupplierPopup: null,
        onSupplierF4: function(oEvent){
            //MessageToast.show("This functionality is under construction....")
            this.inpField = oEvent.getSource();
            if(!this.oSupplierPopup){
                Fragment.load({
                    name: "emc.fin.ar.anubhav.fragments.popup",
                    controller: this,
                    id: "idSuppliers"
                })
                //then is a promise, because UI5 Fragment module will be loading our 
                //fragment asynchronously
                .then(this.onCallBackCity.bind(this));
            }else{
                this.oSupplierPopup.open();
            }
        },
        onCallBackCity: function(oFragment){
            debugger;
            //setting the global variable to avoid creation of object again and again
            this.oSupplierPopup = oFragment;
            //Allow access to Immune system - Explicily allow resources (model) access to these fragments
            this.getView().addDependent(this.oSupplierPopup);
            //doing agg. binding to load all the data
            this.oSupplierPopup.bindAggregation("items",{
                path: '/SupplierSet',
                template: new sap.m.StandardListItem({
                    icon: 'sap-icon://home',
                    title: '{BP_ID}',
                    description: '{COMPANY_NAME}'
                })
            });
            //this.oCityPopup is our remote control to fragment
            this.oSupplierPopup.setTitle("Suppliers");
            this.oSupplierPopup.setMultiSelect(false);
            //open the popup
            this.oSupplierPopup.open();
        },
        onConfirm: function(oEvent){
            var sId = oEvent.getParameter("id");
            debugger;
            //differentiate between whether this event triggered for city or supplier
            if(sId.indexOf("idSuppliers") !== -1){
                var oSelectedItem = oEvent.getParameter("selectedItem");
                var sCityName = oSelectedItem.getTitle();
                this.inpField.setValue(sCityName);
            }
            
        },
        
        onSave: function () {
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