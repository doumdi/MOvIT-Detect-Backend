#!/bin/bash

# Configuration file
confName="/etc/wpa_supplicant/wpa_supplicant.conf"

# Force wlan1 (USB dongle) down
ifdown --force wlan1

#Verify script parameters
ssid=$1
pwd=$2

if [ -z "$ssid" ] || [ -z "$pwd" ]; then
	echo "Missing ssid or password exiting"
	exit 1
fi

# Write new configuration
echo "Connecting to "$ssid" with password "$pwd

# This will clear the file and write this line
echo "ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev" > $confName

# The other lines are appended... 
echo "update_config=1" >> $confName
echo "country=CA" >> $confName
echo " " >> $confName
echo "network={" >> $confName
echo "    ssid=\"$ssid\"" >> $confName
echo "    psk=\"$pwd\"" >> $confName
echo "    id_str=\"AP1\"" >> $confName
echo "}" >> $confName

# Restart interface
ifup wlan1
