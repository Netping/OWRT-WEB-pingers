#!/usr/bin/lua

require "luci.cacheloader"
require "luci.sgi.cgi"
print ("Content-type: Text/html\n")

local config, title = "pingerconf", "Whatcher"
cursor_pingers = luci.model.uci.cursor()

cursor_pingers:foreach(config, "pinger", function(s)
if s[".name"] == 'pinger_prototype' then return end
print (s.name)
exec_str = "ubus call owrt_pingers get_pinger_state '{"..'"name":'..'"'..s.name..'"'.."}'"
exec_str_result = luci.sys.exec(exec_str)
parsed_result = luci.jsonc.parse(exec_str_result)
    local key, val
    for key, val in pairs(parsed_result) do
	print (val)
    end
end)
print (nixio.fs.stat("/etc/config/pingerconf").mtime)