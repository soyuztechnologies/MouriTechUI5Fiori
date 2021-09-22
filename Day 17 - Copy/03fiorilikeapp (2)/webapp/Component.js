sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("emc.fin.ar.anubhav.Component",{
        metadata:{
            manifest: "json"
        },
        init: function(){
            //super->constructor()
            //base class constructor by passing child class object which will
            //enriched by base class with extra stuff
            UIComponent.prototype.init.apply(this);

            var oRouter = this.getRouter();
            oRouter.initialize();
        },
        destroy: function(){

        }
    });
});