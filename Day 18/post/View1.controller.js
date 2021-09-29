sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    "emc/fin/ar/util/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(BaseController, Formatter, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend("emc.fin.ar.controller.View1",{
        formatter: Formatter,
        onInit: function(){
            //obtain the router object
            //We need to ask our Component.js to give us the router object
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        
        onAdd: function(params) {
            this.oRouter.navTo("addProduct");
        }
    });
});