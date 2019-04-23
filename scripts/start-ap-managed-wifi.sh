#!/bin/bash
sleep 30

sudo systemctl stop hostapd

pwd="movit_plus"

confFile="/etc/hostapd/hostapd.conf"
MAC=$(cat /sys/class/net/wlan0/address) && read A B C D E F <<<"${MAC//:/ }" && apName="MovIT+ ${D^^}${E^^}${F^^}"

echo "ctrl_interface=/var/run/hostapd" > $confFile
echo "ctrl_interface_group=0" >> $confFile
echo "interface=ap0" >> $confFile
echo "driver=nl80211" >> $confFile
echo "ssid="$apName >> $confFile
echo "hw_mode=g" >> $confFile
echo "channel=11" >> $confFile
echo "wmm_enabled=0" >> $confFile
echo "macaddr_acl=0" >> $confFile
echo "auth_algs=1" >> $confFile
echo "wpa=2" >> $confFile
echo "wpa_passphrase="$pwd >> $confFile
echo "wpa_key_mgmt=WPA-PSK" >> $confFile
echo "wpa_pairwise=TKIP CCMP" >> $confFile
echo "rsn_pairwise=CCMP" >> $confFile

sudo systemctl start hostapd

sleep 10

sudo ifdown --force wlan0 && sudo ifdown --force ap0 && sudo ifup ap0 && sudo ifup wlan0
sudo sysctl -w net.ipv4.ip_forward=1
sudo iptables -t nat -A POSTROUTING -s 192.168.10.0/24 ! -d 192.168.10.0/24 -j MASQUERADE
sudo systemctl restart dnsmasq
