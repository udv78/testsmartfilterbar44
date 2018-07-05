sap.ui.define(["smartfilterbar44/controller/BaseController"],
	function(BaseController) {
	"use strict";

	var PageController = BaseController.extend("smartfilterbar44.controller.Menu", {

		pressWorkList : function(evt) {
				this.getRouter().navTo("worklist");
		},
		pressMaterTbl : function(evt) {
				this.getRouter().navTo("mastertbl");
		}
		
	});

	return PageController;
});