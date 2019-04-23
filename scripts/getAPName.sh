#!/bin/bash

MAC=$(cat /sys/class/net/wlan0/address) && read A B C D E F <<<"${MAC//:/ }" && echo -n "MovIT+ ${D^^}${E^^}${F^^}"
