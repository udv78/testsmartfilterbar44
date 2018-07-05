jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"smartfilterbar44/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"smartfilterbar44/test/integration/pages/Worklist",
		"smartfilterbar44/test/integration/pages/Object",
		"smartfilterbar44/test/integration/pages/NotFound",
		"smartfilterbar44/test/integration/pages/Browser",
		"smartfilterbar44/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "smartfilterbar44.view."
	});

	sap.ui.require([
		"smartfilterbar44/test/integration/WorklistJourney",
		"smartfilterbar44/test/integration/ObjectJourney",
		"smartfilterbar44/test/integration/NavigationJourney",
		"smartfilterbar44/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});