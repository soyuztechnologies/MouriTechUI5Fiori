sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter"
], function(BaseController, MessageBox, MessageToast, Fragment, Filter) {
    'use strict';
    return BaseController.extend("emc.fin.ar.controller.View2",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            //We need a method which is triggered EVERYTIME route changes
            this.oRouter.getRoute("detail").attachMatched(this.herculis, this);
        },
        herculis: function(oEvent){
            var sPath = "/" + oEvent.getParameter("arguments").fruitId;
            MessageToast.show("Herculis is called Path is : " + sPath);
            this.getView().bindElement({
                path: sPath,
                parameters : { expand : 'To_Supplier' }
            });
        },
        onBack: function(){
            this.getView().getParent().to("idView1");
        },
        oSupplierPopup: null,
        oCityPopup: null,
        onFilter: function(){
            //MessageToast.show("This functionality is under construction....")
            if(!this.oSupplierPopup){
                Fragment.load({
                    name: "emc.fin.ar.fragments.popup",
                    controller: this,
                    id: "idSupp"
                })
                //then is a promise, because UI5 Fragment module will be loading our 
                //fragment asynchronously
                .then(this.onCallBack.bind(this));
            }else{
                this.oSupplierPopup.open();
            }
        },
        oNCall: function(){

            //CORS issue
            $.ajax("http://stcfin.st.com:8021/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/ProductSet",{
                success: function(){

                }
            });
        },
        onCallBack: function(oFragment){
            debugger;
            //setting the global variable to avoid creation of object again and again
            this.oSupplierPopup = oFragment;
            //Allow access to Immune system - Explicily allow resources (model) access to these fragments
            this.getView().addDependent(this.oSupplierPopup);
            //doing agg. binding to load all the data
            this.oSupplierPopup.bindAggregation("items",{
                path: '/SupplierSet',
                template: new sap.m.StandardListItem({
                    icon: 'sap-icon://supplier',
                    title: '{COMPANY_NAME}',
                    description: '{CITY}'
                })
            });
            //this.oSupplierPopup is our remote control to fragment
            this.oSupplierPopup.setTitle("Suppliers");
            //open the popup
            this.oSupplierPopup.open();
        },
        inpField: null,
        onF4Help: function(oEvent){
            //MessageToast.show("This functionality is under construction....")
            this.inpField = oEvent.getSource();
            if(!this.oCityPopup){
                Fragment.load({
                    name: "emc.fin.ar.fragments.popup",
                    controller: this,
                    id: "idCity"
                })
                //then is a promise, because UI5 Fragment module will be loading our 
                //fragment asynchronously
                .then(this.onCallBackCity.bind(this));
            }else{
                this.oCityPopup.open();
            }
        },
        onConfirm: function(oEvent){
            var sId = oEvent.getParameter("id");
            debugger;
            //differentiate between whether this event triggered for city or supplier
            if(sId.indexOf("City") !== -1){
                var oSelectedItem = oEvent.getParameter("selectedItem");
                var sCityName = oSelectedItem.getTitle();
                this.inpField.setValue(sCityName);
            }else{
                var aSelectedItems = oEvent.getParameter("selectedItems");
                var aFilter = [];
                for (let index = 0; index < aSelectedItems.length; index++) {
                    const element = aSelectedItems[index];
                    const sTitle = element.getTitle();
                    var oFilter = new Filter("name", "Contains", sTitle);
                    aFilter.push(oFilter);
                }
                var oFilterFinal = new Filter({
                    filters: aFilter,
                    and: false
                });
                this.getView().byId("idTable").getBinding("items").filter(oFilterFinal);
            }
            
        },
        onCallBackCity: function(oFragment){
            debugger;
            //setting the global variable to avoid creation of object again and again
            this.oCityPopup = oFragment;
            //Allow access to Immune system - Explicily allow resources (model) access to these fragments
            this.getView().addDependent(this.oCityPopup);
            //doing agg. binding to load all the data
            this.oCityPopup.bindAggregation("items",{
                path: '/cities',
                template: new sap.m.StandardListItem({
                    icon: 'sap-icon://home',
                    title: '{name}',
                    description: '{otherName}'
                })
            });
            //this.oCityPopup is our remote control to fragment
            this.oCityPopup.setTitle("Cities");
            this.oCityPopup.setMultiSelect(false);
            //open the popup
            this.oCityPopup.open();
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