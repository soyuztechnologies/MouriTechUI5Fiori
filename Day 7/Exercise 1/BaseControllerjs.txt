//scaffolding template 
//AMD Like Syntax - Asynchronous Module Loading
sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function(Controller) {
    'use strict';
    return Controller.extend("mickey.controller.BaseController",{
        //oCore: sap.ui.getCore(),
        //x: 20,
        calculateSal: function(sal){
            return (sal * .70);
        },
        onInit: function(){
            //here some code
            console.log("Parent Class Constructor");
        }
    });
});