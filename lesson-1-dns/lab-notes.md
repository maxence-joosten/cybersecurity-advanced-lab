## 1. Recap DNS (`nslookup` & `dig`)

* **Basic lookup using default host DNS server:**

  ```bash
  nslookup www.ugent.be
  ```
  
  *Output:*

  ```text
  Server:		9.9.9.9
  Address:	9.9.9.9#53

  Non-authoritative answer:
  Name:	www.ugent.be
  Address: 157.193.43.50
  ```

*Explanation:* Uses the host's default DNS server (`9.9.9.9` - Quad9) on port `53` to resolve `www.ugent.be` to `157.193.43.50`. It is a "Non-authoritative answer" because `9.9.9.9` is a recursive resolver returning a cached/forwarded result rather than being the official nameserver for `ugent.be`.

* **Lookup using a specific external DNS server:**

  ```bash
  nslookup www.ugent.be 1.1.1.1
  ```
  
  *Output:*

  ```text
  Server:		1.1.1.1
  Address:	1.1.1.1#53

  Non-authoritative answer:
  Name:	www.ugent.be
  Address: 157.193.43.50
  ```

*Explanation:* Overrides the host's default DNS configuration and explicitly queries `1.1.1.1` (Cloudflare).

* **Querying Authoritative Nameservers (`NS`):**

  ```bash
  dig +short NS ugent.be
  ```
  
  *Output:*

  ```text
  ns2.ugent.be.
  ns1.ugent.be.
  ns2.belnet.be.
  ns1.belnet.be.
  ns3.belnet.be.
  ```

*Explanation:* Returns the authoritative nameservers responsible for the `ugent.be` domain.

* **Reverse DNS Lookup (`PTR` record):**

  ```bash
  dig +short -x 157.193.43.50
  ```

  *Output:*

  ```text
  portlvs.ugent.be.
  ```

*Explanation:* Performs a reverse lookup (`50.43.193.157.in-addr.arpa`) to resolve the IP address `157.193.43.50` to its hostname `portlvs.ugent.be.`.

## 2. Recap Wireshark (`capture-lab1.pcap`)

```bash
wget -O /tmp/capture-lab1.pcap https://hogenttin.github.io/cybersecurity-advanced/lesson-1/capture-lab1.pcap

wireshark /tmp/capture-lab1.pcap &
```

* **What layers of the OSI model are captured in this capturefile?**
  * **Layer 1 (Physical):** `Frame` metadata (frame number, wire length, capture interface).
  * **Layer 2 (Data Link):** `Ethernet II` (Source/Destination MAC addresses) and `ARP`.
  * **Layer 3 (Network):** `IPv4` (99.8% of packets), `IPv6`, and `ICMP`.
  * **Layer 4 (Transport):** `TCP` (98.1% of packets) and `UDP` (1.5% of packets).
  * **Layers 5–7 (Session/Presentation/Application):** `SSH`, `HTTP` (including `PNG`, `JSON`, `Line-based text data`), `DNS`, `mDNS`, `SSDP`, `LDAP`, `Kerberos`, `DCE/RPC` (Active Directory), and raw `Data`.

* **Take a look at the conversations. What do you notice?**
  * **IPv4 Conversations:** There are 8 IPv4 conversations. The conversation between `172.30.128.10` and `172.30.42.2` dominates the capture with **10415 packets (2 MB)** out of 10815 total packets (+-96.3%).
  * **TCP Conversations (17 streams):**
    * `172.30.128.10:37700` <-> `172.30.42.2:22` (Stream 15): The massive 10415-packet conversation is an SSH session.
    * `172.30.128.11` <-> `172.30.42.2:80` (Streams 0–3): HTTP web traffic.
    * `172.30.128.11` <-> `172.30.42.4` on ports `88` (Kerberos), `135` (RPC), `389` (LDAP), and `49668`: Shows that `172.30.42.4` is an Active Directory Domain Controller.
    * `172.30.128.10` <-> `172.30.128.126:9001` (Streams 4, 14, 16): Only 2 packets (128 bytes) per stream (failed connection attempts / `SYN` -> `RST,ACK`).
    * `192.168.56.199` <-> `172.30.128.10:9999` (Streams 12 & 13): Suspicious traffic on non-standard TCP port `9999` from an external subnet (`192.168.56.0/24`).

* **Take a look at the protocol hierarchy. What are the most "interesting" protocols listed here?**
  * Under **UDP**: `DNS`, `mDNS`, `SSDP`.
  * Under **TCP**:
    * `SSH Protocol` (68% of all packets, encrypted).
    * `LDAP`, `Kerberos`, and `DCE/RPC (Active Directory Replication)` indicating Windows Domain traffic.
    * `Hypertext Transfer Protocol (HTTP)` containing `Portable Network Graphics (PNG)`, `Line-based text data`, and `JSON`.
    * Raw `Data` (11 packets, 5254 bytes) not matching any standard application dissector—indicating raw TCP payload transfer (e.g., `netcat`).

* **Can you spot an SSH session that got established between 2 machines?**
  * **Filter:** `ssh` (TCP Stream 15)
  * **SSH Client:** `172.30.128.10` using source port `37700` (`SSH-2.0-OpenSSH_8.9p1 Ubuntu-3`).
  * **SSH Server:** `172.30.42.2` listening on destination port `22` (`SSH-2.0-OpenSSH_8.7`).
  * **Transport Protocol:** `TCP`.

* **Some cleartext data was transferred between two machines. Can you spot the data? Can you deduce what happened here?**
  * **How to find it:** Filter for `data` (from the Protocol Hierarchy) or inspect TCP Port `9999` (`tcp.port == 9999`) between `192.168.56.199` and `172.30.128.10` and select **Follow > TCP Stream** (Stream 13).
  * **What happened:** An unencrypted remote shell (e.g., via `netcat` on port `9999`) was established between `172.30.128.10` and `192.168.56.199` (`Linux red 5.18.0-kali5-amd64`, running as `root` in `/home/vagrant`). Commands executed in cleartext include `ls /`, `pwd`, `whoami`, `uname -a`, and `cat /etc/passwd`, exposing the system's user accounts.

* **Someone used a specific way to transfer a png on the wire. Is it possible to export this png easily? Is it possible to export other HTTP related stuff?**
  * **Raw TCP PNG Transfer (Stream 12 on Port `9999`):** In TCP Stream 12 (`192.168.56.199` <-> `172.30.128.10:9999`), a PNG file (1,715 bytes, starting with `.PNG` / `IHDR` and ending with `IEND`) was transferred directly over raw TCP (e.g., using `nc`).
    * *How to export it:* Open **Follow > TCP Stream** for Stream 12, change **Show as** from `ASCII` to **`Raw`**, and click **`Save as...`** with a `.png` extension.
  * **HTTP Objects (`www.insecure.cyb` on Port `80`):** Other HTTP-related files (including `poweredby.png`, `/`, `cmd`, `index.js`, and `exec` JSON/plain text responses) can be exported easily via **File > Export Objects > HTTP...** and clicking **Save** or **Save All**.

## 3. Capture Traffic Using the CLI (`tcpdump`)

* **IP Configurations (`dns`, `employee`, `companyrouter`):**
  * `companyrouter`: `eth1` = `192.168.62.253/24` (Internet/WAN), `eth2` = `172.30.255.254/16` (Internal LAN).
  * `dns`: `eth1` = `172.30.0.4/24` (Gateway: `172.30.255.254`).
  * `employee`: `eth1` = `172.30.0.123/24` (Gateway: `172.30.255.254`).

* **Interface on `companyrouter` for `dns` -> Internet:** `eth1` (`192.168.62.253`).
* **Interface on `companyrouter` for `dns` -> `employee`:** `eth2` (`172.30.255.254`).

* **Ping test observations (`employee` -> `companyrouter` vs `employee` -> `dns`):**
  * Pinging `companyrouter` from `employee` traverses `eth2` and is captured.
  * Pinging `dns` from `employee` does **not** appear on `companyrouter` because both machines reside on the same local subnet (`172.30.0.0/24`) and communicate directly via Layer 2 ARP over the switch.

* **Save capture to file & copy to host:**
  * Capture command on router: `sudo tcpdump -i eth2 -c 10 -w /tmp/router-capture.pcap`
  * Copy command from host: `scp companyrouter:/tmp/router-capture.pcap lesson-1-dns/assets/`
  * Verified locally in Wireshark.

* **Filter out SSH traffic:**
  * Command: `sudo tcpdump -i eth2 -n not port 22`
  * Result: Successfully filters out active terminal SSH streams, leaving only background protocols (NTP, ARP).

* **Capture only HTTP traffic to/from `web` (`172.30.0.10`):**
  * Command: `sudo tcpdump -i eth2 -n host 172.30.0.10 and port 80`
  * Result: When curling from an external gateway like `isprouter` (`192.168.62.254`), traffic routes across `companyrouter` and is fully captured. When curling from a machine on the same internal subnet (`employee`), traffic goes direct and bypasses the router entirely.

## 4. Attacker Machine (`red`) Setup

- **OS & Setup Method:** Kali Linux VM deployed with two network interfaces (`eth0` for NAT internet access, `eth1` for the lab host-only network).
- **Network, Routing & DNS Configuration:** 
  - `eth0`: DHCP (NAT, `10.0.2.15/24`) providing external internet access.
  - `eth1`: Static IP (`192.168.62.100/24`) attached to the lab network.
  - **Persistent Routing:** Configured via NetworkManager to route internal traffic through the company router (`172.30.0.0/16 via 192.168.62.253 dev eth1`).
- **Ping test to `web` (IP vs Hostname):** Successful via IP once routing was established; hostname resolution requires configuring the local DNS resolver or hosts file to point to the internal DNS server (`172.30.0.4`).

## 5. Vulnerability Assessment: DNS Zone Transfer (AXFR)

- **What the attack involves:** An `AXFR` (Asynchronous Full Transfer Zone) query requests a primary DNS server to copy its entire zone file to a secondary/client. When misconfigured, unauthorized hosts can pull all internal records, exposing internal network infrastructure, server hostnames, and sensitive TXT notes.
- **How to test / exploit (Linux & Windows):**
  - **Linux:** `dig @<DNS_IP> <domain> AXFR`
  - **Windows:** Using `nslookup`, setting the server type, and issuing `ls -d <domain>` or `server <DNS_IP>` followed by `ls -d <domain>`.
- **Insecure Configuration (Vulnerable State):** Missing or overly permissive `allow-transfer` directives (e.g., defaulting to allow transfers to any host or unauthenticated clients).
- **Remediation (Secured State):** Explicitly restricting zone transfers in the BIND configuration via `allow-transfer { none; };` (or limiting it strictly to authorized secondary name server IPs).
- **How to Revert to Vulnerable State:** Change the directive in `/etc/bind/named.conf` back to allow transfers (`allow-transfer { any; };` or removing the restriction block) and reload the service using `named`.
