# Network Topology & Infrastructure Overview

## 1. Network Segments
| Network Name | Subnet / CIDR | VirtualBox Network Type | Connected Machines |
| :--- | :--- | :--- | :--- |
| Fake Internet | `TODO` | Host-Only | `host`, `isprouter`, `red` |
| ISP <-> Company | `TODO` | Internal Network | `isprouter`, `companyrouter` |
| ISP <-> Home | `TODO` | Internal Network | `isprouter`, `homerouter` |
| Company LAN / DMZ | `TODO` | Internal Network | `companyrouter`, `dns`, `web`, `database`, `employee` |
| Home LAN | `TODO` | Internal Network | `homerouter`, `remote-employee` |

## 2. Machine Inventory
| Machine | Role / Essential Packages | Interface(s) & IP(s) | DHCP or Static | Default Gateway | DNS Server |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `isprouter` | ISP Router | `TODO` | `TODO` | `TODO` | `TODO` |
| `companyrouter` | Company Gateway | `TODO` | `TODO` | `TODO` | `TODO` |
| `dns` | DNS Server (`bind9`) | `TODO` | `TODO` | `TODO` | `TODO` |
| `web` | Web Server | `TODO` | `TODO` | `TODO` | `TODO` |
| `database` | Database Server | `TODO` | `TODO` | `TODO` | `TODO` |
| `employee` | Internal Client | `TODO` | `TODO` | `TODO` | `TODO` |
| `homerouter` | Home Gateway | `TODO` | `TODO` | `TODO` | `TODO` |
| `remote-employee`| Remote Client | `TODO` | `TODO` | `TODO` | `TODO` |
| `red` | Attacker Machine | `TODO` | `TODO` | `TODO` | `TODO` |

## 3. Static Routes & Persistence
* **`red` Machine Routes:** `TODO`
* **`isprouter` / `companyrouter` Routes:** `TODO`
* **How routes are made persistent:** `TODO`
