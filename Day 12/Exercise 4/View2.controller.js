sap.ui.define([
	'emc/fin/ar/controller/BaseController',
	'sap/m/MessageBox',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
	'sap/ui/model/FilterOperator',
	'sap/ui/model/Filter'
], function(BaseController, MessageBox, MessageToast, Fragment, FilterOperator, Filter) {
	'use strict';
	return BaseController.extend("emc.fin.ar.controller.View2", {
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();
			//We need a method which is triggered EVERYTIME route changes
			this.oRouter.getRoute("detail").attachMatched(this.herculis, this);
		},
		herculis: function(oEvent) {
			var sPath = "/fruits/" + oEvent.getParameter("arguments").fruitId;
			MessageToast.show("Herculis is called Path is : " + sPath);
			this.getView().bindElement(sPath);
		},
		onBack: function() {
			this.getView().getParent().to("idView1");
		},
		onSave: function() {
			MessageBox.confirm("Are you sure?", {
				title: "Confirm Me!",
				onClose: function(status) {
					if (status === "OK") {
						MessageToast.show("Dude, I saved your order now!!");
					} else {
						MessageBox.error("OMG!! You cancelled it");
					}
				}
			});
		},
		onItemPress: function(oEvent) {

			var sPath = oEvent.getParameter("listItem").getBindingContextPath();
			var sIndex = sPath.split("/")[sPath.split("/").length - 1];
			this.oRouter.navTo("supplier", {
				suppId: sIndex
			});

			MessageToast.show("TODO: Next view navigation to be implemented here");
		},
		onSuppFilterPress: function(oEvent) {

			if (!this.oSuppFragment) {
				//Step1: Create object of the xml Fragment Popup Fragment
				this.oSuppFragment = new sap.ui.xmlfragment("id1", "emc.fin.ar.fragments.Popup", this);

				this.getView().addDependent(this.oSuppFragment, this);

				var sSuppTitle = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("Supp_Filter_Dialog_Title");
				this.oSuppFragment.setTitle(sSuppTitle);

			}

			this.oSuppFragment.bindAggregation("items", {
				path: '/suppliers',
				template: new sap.m.DisplayListItem({
					label: "{name}",
					value: "{sinceWhen}"
				})
			});
			//Step4: Open fragment object
			this.oSuppFragment.open();
		},
		onValueHelpRequest: function(oEvent) {
			this._CityField = oEvent.getSource();
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();

			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = Fragment.load({
					id: oView.getId(),
					name: "emc.fin.ar.fragments.ValueHelpDialog",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this._pValueHelpDialog.then(function(oDialog) {
				// Create a filter for the binding
				oDialog.getBinding("items").filter([new Filter("city", FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				oDialog.open(sInputValue);
			});
		},
		onValueHelpSearch: function(oEvent) {

			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("city", FilterOperator.Contains, sValue);

			oEvent.getSource().getBinding("items").filter([oFilter]);
		},

		onValueHelpClose: function(oEvent) {

			var oSelectedItem = oEvent.getParameter("selectedItem");
			oEvent.getSource().getBinding("items").filter([]);

			if (!oSelectedItem) {
				return;
			}
			var sTitle = oSelectedItem.getTitle();
			this._CityField.setValue(sTitle);
			// this.byId("idCityField").setValue(oSelectedItem.getTitle());

		}

	});
});