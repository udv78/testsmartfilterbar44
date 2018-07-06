sap.ui.define([
	"smartfilterbar44/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/m/Input",
	'sap/ui/model/Filter',
	'sap/ui/core/Fragment',
], function(BaseController, History, MessageToast, Input, Filter, Fragment) {
	"use strict";
	
	return BaseController.extend("smartfilterbar44.controller.EditMASTERTBL", {
		inputId: '',

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the add controller is instantiated.
		 * @public
		 */
		onInit: function() {

			// Register to the add route matched
			this.getRouter().getRoute("editMASTERTBL").attachPatternMatched(this._onRouteMatched, this);

		},
		
		onAfterRendering: function() {
			var oView = this.getView();
			var input = oView.byId("sprtblField");
			alert("onAfterRendering " + input.getValue());
			var i = input.getInnerControls()[0];
			if (i){
				alert("to be setTextFormatter");
				//debugger;
				i.mBindingInfos.value.formatter = function() {
					console.log("i.mBindingInfos.value.formatter  executed");
					//debugger;
					return "909";
				};
				i.setTextFormatter(".formatsprid");
				/*function(val) {
					alert("setTextFormatter");
					return "456";
				}*/
				
			};
			var i2=oView.byId("idsprid2");
			i2.setTextFormatter(".formatsprid");
			
			i2.mBindingInfos.value.formatter = function() {
					console.log("i2.mBindingInfos.value.formatter  executed");
					//debugger;
					return "101";
				};
			debugger;
			//i2.setValue("555");
		},
		
		formatsprid: function(aSrpid) {
		//	alert("formatsprid");
			return "321";
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		_onRouteMatched: function(oEvent) {

			//here goes your logic which will be executed when the "add" route is hit
			//will be done within the next unit

			var sObjectId =  oEvent.getParameter("arguments").objectId;
			var oView = this.getView();
			 oView.bindElement({
			 	path : "/MASTERTBL(" + sObjectId + ")"	
			 });
			 
			var Model=this.getView() .getModel();
			//debugger;
			
			
			this.getRouter().getRoute("editMASTERTBL").attachPatternMatched(this._onObjectMatched, this);
			
			 var input = oView.byId("sprtblField");
			 input.attachInitialise(function(oMyEvent) {
			 	//alert("initialise");
			 	oMyEvent.getSource().getInnerControls()[0].setDescriptionKey("CODE");
			 	//debugger;
			 });
			// alert(input);
			
			
			var oModel = this.getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));			
			
			var oInput = new Input({
			value: {
			parts: [{path: "SPRID"}],
				  	formatter: function(sCost){
				  		//debugger;
				  		return "789";
				  	}
				}
			});
			oView.byId("page").addContent(oInput);
			
			//debugger;
		},
		
		handleValueHelp : function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"smartfilterbar44.view.Dialog",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}

			// create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter([new Filter(
				"ID",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
		},
		
		_handleValueHelpSearch : function (evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter(
				"ID",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},		
		
		
		_handleValueHelpClose : function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.getView().byId(this.inputId),
					//oText = this.getView().byId('selectedKey'),
					sDescription = oSelectedItem.getDescription();

			alert("sDescription=" + sDescription);
			debugger;

				productInput.setSelectedKey(sDescription);
				//oText.setText(sDescription);
			}
			evt.getSource().getBinding("items").filter([]);
		},

		suggestionItemSelected: function (evt) {

			var oItem = evt.getParameter('selectedItem'),
				oText = this.getView().byId('selectedKey'),
				sKey = oItem ? oItem.getKey() : '';
			alert ("oText="+ oText + "sKey="+sKey);
			debugger;
			oText.setText(sKey);
		},
		
		
		_onObjectMatched : function (oEvent) {
			var sObjectId =  oEvent.getParameter("arguments").objectId;
			var sObjectPath = "/MASTERTBL(" + sObjectId + ")";
			//alert(sObjectPath);
			var oView = this.getView();
				//  oView.bindElement({
				//  	path : "/MASTERTBL(" + sObjectId + ")"	
				//  });
				// this._bindView("/" + sObjectPath);
		},

		_bindView : function (sObjectPath) {
			var oDataModel = this.getModel();
			
			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oDataModel.metadataLoaded().then(function () {
						});
					},
					dataReceived: function () {
					}
				}
			});
		},
		
		_onMetadataLoaded: function() {
			var oView = this.getView();
			var input = oView.byId("sprtblField");
			//alert(input);	
		},
		
		onCancel: function() {
			this.getModel().resetChanges();
			this.onNavBack();
		},

		/**
		 * Event handler for the save action
		 * @public
		 */
		onSave: function() {
			this.getModel().submitChanges();
			
			var sMessage = this.getResourceBundle().getText("SPRTBLUpdated", [this.getView().getBindingContext().getProperty("NAME")]);
			MessageToast.show(sMessage, {
				closeOnBrowserNavigation : false
			});		
			
			var sId = this.getView().getBindingContext().getProperty("ID");
			this.getRouter().navTo("mastertblobj", {
				objectId : sId
			}, true);
			
		},		

		/**
		 * Event handler for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack : function() {
			//this.getModel().deleteCreatedEntry(this._oContext);

			var oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("mastertbl", {}, bReplace);
			}
		}

	});
});