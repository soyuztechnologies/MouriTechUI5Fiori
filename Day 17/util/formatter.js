sap.ui.define([

], function() {
    'use strict';
    return {
        getStatusText: function (status) {
            switch (status){
                case 'Available':
                    return "Success";
                case 'Out of Stock':
                    return "Warning";
                case "Discontinued":
                    return "Error";
            }
        }
    };
});