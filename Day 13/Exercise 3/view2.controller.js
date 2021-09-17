sap.ui.define([
	'emc/fin/ar/controller/BaseController',
	'sap/m/MessageBox',
	'sap/m/MessageToast'
], function(BaseController, MessageBox, MessageToast) {
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
		onRatingChange: function(oEvent) {

			var fValue = oEvent.getParameter("value");
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		}

	});
});