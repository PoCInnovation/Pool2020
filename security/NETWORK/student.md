Network forensic can be defined as the investigation of **network** traffic patterns and data captured in transit between computing devices—can provide insight into the source and extent of an attack. It also can supplement investigations focused on information left behind on computer hard drives following an attack.

Identifying attack patterns requires a thorough understanding of common application and network protocols. For example:

-   Web protocols, such as http and https
-   File transfer protocols, such as Server Message Block (SMB) and Network File System (NFS)
-   Email protocols, such as Simple Mail Transfer Protocol (SMTP)
-   Network protocols, such as Ethernet, WiFi, and Transmission Control Protocol/Internet Protocol (TCP/IP)

The investigator must understand the normal form and behavior of these protocols to discern the anomalies associated with an attack.

# Before we start

Network forensic investigators examine two primary sources: **full-packet data capture,** and **log files** from devices such as routers, proxy servers, and web servers—these files identify traffic patterns by capturing and storing source and destination IP addresses, TCP port, Domain Name Service (DNS) site names, and other information.

The advantage of full-packet capture is that the content, and therefore the meaning and value, of data being transferred can be determined. Packet capture is not usually implemented on networks full-time because of the large amount of storage required for even an hour’s worth of data on a typical business network. But it's perfect to learn, so that's what we will use today.

Wireshark is a network analysis tool, also called sniffer, that will allow you to visualize all the data that transit on a device. It can also be used to back up all this data for later analysis via PCAP or PCAPNG file.

** The challenge of this part starts with the "Professional Column Manager" challenge.**

SPOILER ALERTE /!\ THIS FILE HAS BEEN USED DURING A HALLOWEEN CTF, SO DON'T BE SURPRISED BY THE JACK-O-LANTERNS /!\

## Challenge 1:

First challenge is very simple. You just have to find the first jack-o-lantern in the file. Just use what we saw in the introduction to display it clearly on the screen, and give me the IP address which it has been sent too and the size of the principal packets (you'll understand).

flag format : PoC{xxx.xxx.xx.xxx;sss}

## Challenge 2:

Some files had been exchanged while we were capturing the packets. Find a way to get them back using only Wireshark. (no binwalk authorized :P)
I want the name of one image ... I bet you already now what's on it.

flag format : PoC{xxxxxxxxxxxxx.xxx}

## Challenge 3:
There was a message exchanged via the tcp protocol. This exchange's data contains the pumpkin that you need to find. Give me the size of the entire conversation and the two main characters that prints the jack-o-lantern.

flag format: PoC{cc.ssss}

## Challenge 4:
There is an audio conversation that has been sent to an unknown IP address on port 1313. Find it, and give me the duration of the conversation, and the place where the sender had to wait for the receiver of the message.

flag: PoC{dd.XxxXxxxxXxxxxxx}

## Challenge 5:
The last one is a little bit more difficult.
Find the pre-master key which will permit you to read the TLS traffic. Find the last pumpkin and give me the size of the file data in bytes.

flag format: PoC{sss}

Hint: packet n°3
