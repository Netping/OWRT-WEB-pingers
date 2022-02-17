function settings_click(object) {
buttons_settings = document.getElementsByClassName('settings_link');
div_settings = document.getElementsByClassName('div_settings');
var i = 0; var button_number = 0;
    for (let element of buttons_settings)  {	i++; if (object==element) button_number = i;    } 
    i = 0; for (let setting_block of div_settings)  
    { i++; if (i==button_number)  { if (setting_block.style.display!="block") setting_block.style.display="block"; else setting_block.style.display="none";}}
}

function pinger_settings_hide () {
background_settings_div = document.getElementById('div_gray_background');
background_settings_div.style.display = "none";
settings_div = document.getElementById('div_settings_window');
settings_div.style.display = "none";
ajax_request = window.setInterval(pinger_refresh.bind(), 5000);
}

function rule_settings_hide () {
background_settings_div = document.getElementById('div_gray_background');
background_settings_div.style.display = "none";
settings_div = document.getElementById('div_settings_window');
settings_div.style.display = "none";
ajax_request = window.setInterval(rule_refresh.bind(), 5000);
}

function pinger_settings_unhide () {
background_settings_div = document.getElementById('div_gray_background');
scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight,
document.body.offsetHeight, document.documentElement.offsetHeight,
document.body.clientHeight, document.documentElement.clientHeight);
background_settings_div.style.height = (scrollHeight + 25)+ "px";
}

function pinger_settings_commit (pinger_id) {
document.getElementById('pinger_for_change_commit').value=pinger_id;
document.getElementById('pinger_change_form').submit(); 
}

function pinger_settings(pinger_id) {
document.getElementById('pinger_for_change').value= pinger_id;
document.getElementById('pinger_checkbox_form').submit(); 
}

function pinger_add() {
document.getElementById('pinger_for_add').value="1"
document.getElementById('pinger_checkbox_form').submit(); }

function pinger_delete(pinger_id, text_del) {
clearInterval(ajax_request);
if (confirm (text_del)) {
document.getElementById('pinger_for_delete').value = pinger_id;
document.getElementById('pinger_checkbox_form').submit(); } 
ajax_request = window.setInterval(pinger_refresh.bind(), 5000); }

function pinger_refresh() {
    var stat_ref = new XMLHttpRequest(); 
    stat_ref.open("GET", "/cgi-bin/pinger_status.cgi", true);
    stat_ref.onreadystatechange = function () { 
    if (stat_ref.readyState === XMLHttpRequest.DONE && stat_ref.status === 200) {
    	    var lines_ref = stat_ref.responseText.split("\n");
	if ((lines_ref[lines_ref.length - 2])!=config_mtime) { document.getElementById('pinger_refresh_form').submit(); }
	for (let i=0; i < (lines_ref.length-1); i=i+3) {
	name = lines_ref[i]; state = lines_ref[i+1]; status = lines_ref[i+2]; status_view ="";
	    if (state == 0) { status_view = "--"; }
	    else {
	    if (status == 1) { status_view = "<span style='color: green;'>Ok</span>"; }
	    else { status_view = "<span style='color: red;'>Error</span>"; }
		}
		document.getElementById('status_' + name).innerHTML = status_view; }
	}}
stat_ref.send();
}

function rule_refresh() {
    var stat_ref = new XMLHttpRequest(); 
    stat_ref.open("GET", "/cgi-bin/rule_status.cgi", true);
    stat_ref.onreadystatechange = function () { 
    if (stat_ref.readyState === XMLHttpRequest.DONE && stat_ref.status === 200) {
    	    var lines_ref = stat_ref.responseText.split("\n");
	if ((lines_ref[lines_ref.length - 2])!=config_mtime) { document.getElementById('pinger_refresh_form').submit(); }
	for (let i=0; i < (lines_ref.length-1); i=i+3) {
	name = lines_ref[i]; state = lines_ref[i+1]; status = lines_ref[i+2]; status_view ="";
	    if (state == 0) { status_view = "--"; }
	    else {
	    if (status == 1) { status_view = "<span style='color: green;'>Ok</span>"; }
	    else { status_view = "<span style='color: red;'>Error</span>"; }
		}
		document.getElementById('status_' + name).innerHTML = status_view; }
	    }}
stat_ref.send();
}
