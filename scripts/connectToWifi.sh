#!/bin/bash

confName="/etc/wpa_supplicant/wpa_supplicant.conf"

sudo ifdown --force wlan0

numLine=$(awk '/network/{ print NR; exit }' $confName)

ssid=$1
pwd=$2

if [ -z "$ssid" ] || [ -z "$pwd" ]; then
	echo "Missing ssid or password exiting"
	exit 1
fi

echo "Connecting to "$ssid" with password "$pwd

if [ ! -z $numLine ]; then
	head -n -$numLine $confName > temp.txt ; sudo mv temp.txt $confName
fi

echo "network={" >> $confName
echo "    ssid=\"$ssid\"" >> $confName
echo "    psk=\"$pwd\"" >> $confName
echo "    id_str=\"AP1\"" >> $confName
echo "}" >> $confName

sudo ifup wlan0
