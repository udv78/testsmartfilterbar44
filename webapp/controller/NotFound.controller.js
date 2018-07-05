sap.ui.define([
		"smartfilterbar44/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("smartfilterbar44.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);