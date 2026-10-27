# Network Topology & Infrastructure Overview

## 1. Network Segments

| Network Name | Subnet / CIDR | VirtualBox Network Type | Connected Machines |
| :--- | :--- | :--- | :--- |
| Fake Internet | `192.168.62.0/24` | Host-Only (`vboxnet1`) | `host`, `isprouter`, `red` |
| ISP <-> Company | `10.0.1.0/24` | Internal Network | `isprouter`, `companyrouter` |
| ISP <-> Home | `10.0.2.0/24` | Internal Network | `isprouter`, `homerouter` |
| Company LAN / DMZ | `172.30.0.0/16` | Internal Network | `companyrouter`, `dns`, `web`, `database`, `employee` |
| Home LAN | `192.168.1.0/24` | Internal Network | `homerouter`, `remote-employee` |

## 2. Machine Inventory

| Machine | Role / Essential Packages | Interface(s) & IP(s) | DHCP or Static | Default Gateway | DNS Server |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `isprouter` | ISP Gateway Router | `eth0`: `192.168.62.254/24`<br>`eth1`: `10.0.1.1/24`<br>`eth2`: `10.0.2.1/24` | Static | N/A (Gateway) | `172.30.0.4` |
| `companyrouter` | Company Perimeter Router | `eth1`: `192.168.62.253/24`<br>`eth2`: `172.30.255.254/16` | Static | `192.168.62.254` | `172.30.0.4` |
| `dns` | DNS Server (`bind9`) | `eth0`: `172.30.0.4/16` | Static | `172.30.255.254` | `127.0.0.1` |
| `web` | Web Server | `eth0`: `172.30.0.10/16` | Static | `172.30.255.254` | `172.30.0.4` |
| `database` | Database Server | `eth0`: `172.30.0.20/16` | Static | `172.30.255.254` | `172.30.0.4` |
| `employee` | Internal Corporate Client | `eth0`: `172.30.0.100/16` | DHCP / Static | `172.30.255.254` | `172.30.0.4` |
| `homerouter` | Home Gateway Router | WAN / LAN interfaces | Static / DHCP | `192.168.62.254` | `172.30.0.4` |
| `remote-employee` | Remote Worker Client | `eth0`: `192.168.1.100/24` | DHCP | Home Router IP | ISP / VPN DNS |
| `red` | Attacker Machine (Kali) | `eth0`: `10.0.2.15/24`<br>`eth1`: `192.168.62.100/24` | `eth0`: DHCP<br>`eth1`: Static | `10.0.2.2` (`eth0`) | `172.30.0.4` |

## 3. Static Routes & Persistence

- **`red` Machine Routes:** `172.30.0.0/16 via 192.168.62.253 dev eth1 onlink`
- **`isprouter` / `companyrouter` Routes:** Kernel routing tables configured for directly connected segments and default gateway forwarding.
- **How routes are made persistent:** Configured persistently via NetworkManager connection profiles (`nmcli connection modify lab-net +ipv4.routes "172.30.0.0/16 192.168.62.253"`) on `red`, and static interface configurations on router nodes.
