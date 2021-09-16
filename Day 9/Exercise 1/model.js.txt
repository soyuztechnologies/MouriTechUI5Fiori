sap.ui.define([
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/xml/XMLModel',
    'sap/ui/model/resource/ResourceModel'
], function(JSONModel, XMLModel, ResourceModel) {
    'use strict';
    
    return {
        createJSONModel: function(sFilePath) {
            //Step 1: Create brand new model object
            var oModel = new JSONModel();
            //Step 2: Set Data
            //oModel.setData( );
            oModel.loadData(sFilePath);
            //oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },
        createXMLModel: function() {
            var oModel = new XMLModel();
            oModel.loadData("model/mockdata/mydata.xml");
            return oModel;
        },
        createResourceModel: function() {
            var oModel = new ResourceModel({
                bundleUrl : 'i18n/i18n.properties'
            });
            
            return oModel;
        }
    };


});