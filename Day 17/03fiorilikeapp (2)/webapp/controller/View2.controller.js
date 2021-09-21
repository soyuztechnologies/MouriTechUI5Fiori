sap.ui.define([
    'emc/fin/ar/anubhav/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter"
], function(BaseController, MessageBox, MessageToast, Fragment, Filter) {
    'use strict';
    return BaseController.extend("emc.fin.ar.anubhav.controller.View2",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            //We need a method which is triggered EVERYTIME route changes
            this.oRouter.getRoute("detail").attachMatched(this.herculis, this);
            // this.cleanData();

        },
        // cleanData: function(){
        //     var oModel = this.getView().getModel();
        //     aSupplier = oModel.getProperty("/")
        // },
        herculis: function(oEvent){
            debugger;
            var sPath = "/" + oEvent.getParameter("arguments").fruitId;
            MessageToast.show("Herculis is called Path is : " + sPath);
            this.getView().bindElement(sPath);
        },
        field: null,
        oCityPopup: null,
        onF4: function(oEvent){
            //this is my field fromthe table put it ina global variable
            this.field = oEvent.getSource();
            var that = this;
            if(!this.oCityPopup){
                Fragment.load({
                    id: "city",
                    name: "emc.fin.ar.anubhav.fragments.popup",
                    controller: this
                }).then(function(oPopup){
                    that.oCityPopup = oPopup;
                    that.getView().addDependent(oPopup);
                    oPopup.setTitle("City");
                    oPopup.setMultiSelect(false);
                    //binding to load data
                    oPopup.bindAggregation("items",{
                        path: "/cities",
                        template: new sap.m.DisplayListItem({
                            value: "{type}",
                            label: "{name}"
                        })
                    });
                    //open the fragment
                    oPopup.open();
                });
            }else{
                this.oCityPopup.open();
            }          
        },
        onConfirm: function(oEvent){
            var sId = oEvent.getSource().getId();
            if(sId.indexOf("supplier") != -1){

                //get the table object
                var oTable = this.getView().byId("idTable");
                //create filter objects 
                var aSelectedItems = oEvent.getParameter("selectedItems");
                var aFilter = [];
                //prepare single filter
                for (let i = 0; i < aSelectedItems.length; i++) {
                    const element = aSelectedItems[i];
                    var sTitle = element.getLabel();
                    aFilter.push(new Filter("name", "EQ", sTitle));
                }
                //inject the filter inside the table
                if(aFilter){
                    oTable.getBinding("items").filter(aFilter);
                }else{
                    oTable.getBinding("items").filter([]);
                }
                
            }else{
                this.field.setValue(oEvent.getParameter("selectedItem").getLabel());
            }
        },
        oSupplierPopup: null,
        onFilterSupplier: function(){
            //create a fragement object
            var that = this;
            if(!this.oSupplierPopup){
                Fragment.load({
                    id: "supplier",
                    name: "emc.fin.ar.anubhav.fragments.popup",
                    controller: this
                }).then(function(oPopup){
                    that.oSupplierPopup = oPopup;
                    that.getView().addDependent(oPopup);
                    oPopup.setTitle("Suppliers");
                    //binding to load data
                    oPopup.bindAggregation("items",{
                        path: "/suppliers",
                        template: new sap.m.DisplayListItem({
                            value: "{city}",
                            label: "{name}"
                        })
                    });
                    //open the fragment
                    oPopup.open();
                });
            }else{
                this.oSupplierPopup.open();
            }          

        },
        onBack: function(){
            this.getView().getParent().to("idView1");
        },
        onSave: function(){
            MessageBox.confirm("Are you sure?", {
                title: "Confirm Me!",
                onClose: function(status){
                    if(status === "OK"){
                        MessageToast.show("Dude, I saved your order now!!");
                    }else{
                        MessageBox.error("OMG!! You cancelled it");
                    }
                }
            });
        },
        onItemPress: function(oEvent){

            var sPath = oEvent.getParameter("listItem").getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            this.oRouter.navTo("supplier",{
                suppId: sIndex
            });

            MessageToast.show("TODO: Next view navigation to be implemented here");
        }
    });
});