sap.ui.define([
    "sap/ui/core/format/NumberFormat"
], function(NumberFormat) {
    'use strict';
    return {
        convertName: function(inp) {
            //return this.anubhav;
            if(inp){
                var sText = inp.toUpperCase();
                return sText;
            }
            
        },
        joinCurrency: function(amount, currency){
            //return amount + " " + currency;
            var oCurrencyFormat = NumberFormat.getCurrencyInstance({
                currencyCode: false
            });
            var sOutput = oCurrencyFormat.format(amount, currency); // output: EUR 12,345.68
            return sOutput;            
        }
    };
});