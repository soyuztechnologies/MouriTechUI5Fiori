sap.ui.define([
    'sap/ui/model/json/JSONModel'
], function(JSONModel) {
    'use strict';
    
    return {
        createJSONModel: function(sFilePath) {
            //Step 1: Create brand new model object
            var oModel = new JSONModel();
            //Step 2: Set Data
            //oModel.setData( );
            oModel.loadData(sFilePath);
            return oModel;
        },
        createXMLModel: function() {
            return "";
        },
        createResourceModel: function() {
            return "";
        }
    };


});