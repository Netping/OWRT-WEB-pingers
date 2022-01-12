module("luci.controller.owrt_web_pingers.index", package.seeall)

function index()
	entry({"admin", "administration"}, firstchild(), "Administration", 30).dependent=true
	entry({"admin", "administration", "owrt_web_pingers"}, alias("admin", "administration", "owrt_web_pingers", "pingers"), _("Whatcher"), 10).dependent=true
	entry({"admin", "administration", "owrt_web_pingers", "pingers"}, template("owrt_web_pingers/pingers"), _(translate("Pingers")), 10).leaf=true
	entry({"admin", "administration", "owrt_web_pingers", "rules"}, template("owrt_web_pingers/rules"), _(translate("Rules")), 20).leaf=true
end