sap.ui.define([
    'emc/fin/ar/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("emc.fin.ar.controller.View2",{
        onBack: function(){
            this.getView().getParent().to("idView1");
        }
    });
});