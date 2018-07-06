sap.ui.define([
	"smartfilterbar44/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/m/Input"
], function(BaseController, History, MessageToast, Input) {
	"use strict";

	return BaseController.extend("smartfilterbar44.controller.EditMASTERTBL", {

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
				debugger;
				i.mBindingInfos.value.formatter = function() {
					console.log("i.mBindingInfos.value.formatter  executed");
					debugger;
					return "909";
				};
				i.setTextFormatter(".formatsprid");
				/*function(val) {
					alert("setTextFormatter");
					return "456";
				}*/
				
			};
			var i2=oView.byId("idsprid2");

			
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
			debugger;
			
			
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
				  		debugger;
				  		return "789";
				  	}
				}
			});
			oView.byId("page").addContent(oInput);
			
			debugger;
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