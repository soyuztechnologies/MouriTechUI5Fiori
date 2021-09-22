sap.ui.define([
    'emc/fin/ar/anubhav/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("emc.fin.ar.anubhav.controller.App",{
        onInit: function(){
            console.log("Hey folks!! the App Controller is ready Now");
        }
    });
});