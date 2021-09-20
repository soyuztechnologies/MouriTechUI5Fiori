sap.ui.define([
	'emc/fin/ar/controller/BaseController',
	'sap/m/MessageBox',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment'
], function(BaseController, MessageBox, MessageToast, Fragment) {
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
			//MsgBox.confirm("Supplier Filter is pressed");
			//Check if the Fragment object is alrady created, if not then only perform Step 1 and 2 to avoid duplicate id issue
			if (!this.oSuppFragment) {
				//Step1: Create object of the xml Fragment Popup Fragment
				this.oSuppFragment = new sap.ui.xmlfragment("id1", "emc.fin.ar.fragments.Popup", this);
				//Step2: Allow the fragment object to access the model data by the current View (DAD)
				//       providing access to model (OFFICE GATE) to the fragment object (CHILD)
				//       Add 'this' parameter to point to the current controller
				this.getView().addDependent(this.oSuppFragment, this);
				//Step2.1: Set the title of the SelectDialog Confrol to 'Select Suppliers'
				//this.oSuppFragment.setTitle("Select Suppliers");
				//Step2.1.1: Set same title referring to i18n model entry 'Supp_Filter_Dialog_Title'
				//Step1: Get the text maninatined from the i18n model
				var sSuppTitle = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("Supp_Filter_Dialog_Title");
				this.oSuppFragment.setTitle(sSuppTitle);
				//HOW TO HANDLE multiple controls within fragment and want to set title only for one control
				//	var oSuppPopup = this.oSuppFragment.byId("idPopup");
				//	oSuppPopup.setTitle(sSuppTitle);
			}
			//Step3: Bind the data to the items aggregation of the SelectDialog control inside the fragment object
			//       with the supplier data in the model and display using DisplayItemList control
			this.oSuppFragment.bindAggregation("items", {
				path: '/suppliers',
				template: new sap.m.DisplayListItem({
					label: "{name}",
					value: "{sinceWhen}"
				})
			});
			//Step4: Open fragment object
			this.oSuppFragment.open();
		}
	});
});