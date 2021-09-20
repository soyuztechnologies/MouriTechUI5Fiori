sap.ui.define([
	'emc/fin/ar/controller/BaseController',
	"emc/fin/ar/util/formatter",
	"sap/ui/model/Filter",

	"sap/ui/model/FilterOperator"
], function(BaseController, Formatter, Filter, FilterOperator) {
	'use strict';
	return BaseController.extend("emc.fin.ar.controller.View1", {
		formatter: Formatter,
				onInit: function() {
		},
		
		onDelete: function(oEvent) {
			var oItemToBeDeleted = oEvent.getParameter("listItem");
			//list object
			//var oList = this.getView().byId("idList");
			var oList = oEvent.getSource();
			oList.removeItem(oItemToBeDeleted);
		},
		onSearch: function(oEvent) {
			//step 1: create a query parameter
			var whatWasSearched = oEvent.getParameter("query");
			if (!whatWasSearched) {
				whatWasSearched = oEvent.getParameter("newValue");
			}
			//step 2: use the query data to build a filter (condition)
			var oFilter = new Filter("name", FilterOperator.Contains, whatWasSearched);
			var oFilter2 = new Filter("type", FilterOperator.Contains, whatWasSearched);
			//step 3: get the list object
			var aFilter = [oFilter, oFilter2];
			var oNewFilter = new Filter({
				filters: aFilter,
				and: false
			});
			var oList = this.getView().byId("idList");
			//step 4: get the list Binding and inject our filter into the same
			oList.getBinding("items").filter(oNewFilter);
		}
	});
});
