#
# Copyright (C) 2021 NetPing <support@netping.ru>
# 
include $(TOPDIR)/rules.mk

LUCI_TITLE:=OWRT-WEB-pingers
LUCI_DEPENDS:=

include ../../luci.mk

# call BuildPackage - OpenWrt buildroot signature
