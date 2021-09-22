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
            var oView = this.getView();
            var that = this;
			if (!this.supplierPopup) {
				Fragment.load({
					id: 'supplier',
					name: "emc.fin.ar.fragments.ValueHelpDialog",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog);
                    that.supplierPopup = oDialog;
                    that.supplierPopup.bindAggregation("items", {
                        path: '/suppliers',
                        template: new sap.m.DisplayListItem({
                            label: '{name}'
                        })
                    });
                    that.supplierPopup.open();
                });
			}else{
                this.supplierPopup.open();
            }
        },
        onHandleConfirm: function(oEvent){
            var sId = oEvent.getSource().getId();
            if(sId.indexOf("supplier") !== -1){
                var aSelItem = oEvent.getParameter("selectedItems");
                var aFilters = [];
                for (let i = 0; i < aSelItem.length; i++) {
                    const oItem = aSelItem[i];
                    aFilters.push(new Filter("name", FilterOperator.EQ, oItem.getLabel()))
                }
                var oFilter = new Filter({
                    filters: aFilters,
                    and: false
                });
                this.getView().byId("idTable").getBinding("items").filter(oFilter);
            }else{
                var oSelItem = oEvent.getParameter("selectedItem");
                this._CityField.setValue(oSelItem.getLabel());
            }
            
        },
        _pValueHelpDialog: null,
		onValueHelpRequest: function(oEvent) {
			this._CityField = oEvent.getSource();
			var sInputValue = oEvent.getSource().getValue(),
            oView = this.getView();
            var that = this;
			if (!this._pValueHelpDialog) {
				Fragment.load({
					id: 'cities',
					name: "emc.fin.ar.fragments.ValueHelpDialog",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog);
                    that._pValueHelpDialog = oDialog;
                    that._pValueHelpDialog.bindAggregation("items", {
                        path: '/cities',
                        template: new sap.m.DisplayListItem({
                            label: '{name}'
                        })
                    });
                    that._pValueHelpDialog.open();
                });
			}else{
                this._pValueHelpDialog.open();
            }
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
