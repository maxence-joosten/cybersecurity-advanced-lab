# Theory

## To master[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-2/theory/#to-master "Permanent link")

1.   In terms of the OSI model, what does a (regular, traditional) firewall do?
2.   Review the advantages and disadvantages of a host-based firewall vs a network-based firewall.
3.   What is meant by network segmentation and what are network/firewall zones?
4.   What is a DMZ? How can you build this with 1 firewall vs 2 firewalls? Are there advantages?
5.   Nmap:
    *   When scanning a TCP or UDP port with nmap, what is the difference between open, filtered and closed? How is nmap able to make this conclusion?
    *   Review cybersecurity and virtualisation: what is a banner grab and how do you do this using nmap?

6.   Systemd
    *   Where can you find the existing systemd configuration files on a Linux system with systemd?
    *   Review the following systemctl subcommands: `systemctl cat ...`, `systemctl show ...`, `systemctl edit ...`, `systemctl list-units`, `systemctl list-unit-files` and `systemctl daemon-reload`.
    *   How can you create your own systemd service? Note: you don't need to learn this out of the top of your head, but you should be able to interpret a given systemd unit file.
    *   What are systemd-timers?

7.   Proxy:
    *   What is a (forward) proxy?
    *   What is a reverse proxy?
    *   How are (reverse) proxies related to load balancers? Do you know software that can do both?

## Some Resources[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-2/theory/#some-resources "Permanent link")

### Firewall (zones & network segmentation)[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-2/theory/#firewall-zones-network-segmentation "Permanent link")

*   [https://documentation.axsguard.com/firewall/#essential-terminology](https://documentation.axsguard.com/firewall/#essential-terminology)
*   [https://documentation.axsguard.com/firewall/#firewall-zones](https://documentation.axsguard.com/firewall/#firewall-zones)
*   Firewall zones
    *   [https://www.youtube.com/watch?v=dBKC6Q0dpdk](https://www.youtube.com/watch?v=dBKC6Q0dpdk)

*   DMZ (recap)
    *   [https://www.youtube.com/watch?v=8SY4bU7AQwE](https://www.youtube.com/watch?v=8SY4bU7AQwE)

*   Introduction to `nftables`
    *   [https://www.youtube.com/watch?v=K8JPwbcNy_0](https://www.youtube.com/watch?v=K8JPwbcNy_0) (using `.nft` config files)
    *   [https://www.youtube.com/watch?v=lHLPZlZLWgs](https://www.youtube.com/watch?v=lHLPZlZLWgs) (using `nft` command, part 1, ideal if you already know `iptables`)
    *   [https://www.youtube.com/watch?v=MFJA7T2nFMc](https://www.youtube.com/watch?v=MFJA7T2nFMc) (using `nft` command, part 2, live demo using `nft` command)

*   `firewalld` cheatsheet
    *   multi zone configurations
        *   [https://www.linuxjournal.com/content/understanding-firewalld-multi-zone-configurations](https://www.linuxjournal.com/content/understanding-firewalld-multi-zone-configurations)

*   Network segmentation (starting from minute 27)
    *   [https://www.youtube.com/watch?v=ExcQ25WRCH0&t=1620s](https://www.youtube.com/watch?v=ExcQ25WRCH0&t=1620s)

*   `nmap` recap
    *   [https://www.youtube.com/watch?v=T8ktppSHGww](https://www.youtube.com/watch?v=T8ktppSHGww)
        *   Difference IP/ARP scan
        *   Banner grab
        *   Different type of port scans

*   `nmap` port results (open/filtered/closed)
    *   [https://nmap.org/book/man-port-scanning-basics.html](https://nmap.org/book/man-port-scanning-basics.html)

### Systemd configuration files[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-2/theory/#systemd-configuration-files "Permanent link")

*   History and format
    *   [https://www.youtube.com/watch?v=N1vgvhiyq0E](https://www.youtube.com/watch?v=N1vgvhiyq0E)

*   Extended information (you need to understand, not learn out the top of your head)
    *   [https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/assembly_working-with-systemd-unit-files_configuring-basic-system-settings#doc-wrapper](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/assembly_working-with-systemd-unit-files_configuring-basic-system-settings#doc-wrapper)
    *   [https://access.redhat.com/documentation/pl-us/red_hat_enterprise_linux/9/html/configuring_basic_system_settings/managing-systemd_configuring-basic-system-settings#doc-wrapper](https://access.redhat.com/documentation/pl-us/red_hat_enterprise_linux/9/html/configuring_basic_system_settings/managing-systemd_configuring-basic-system-settings#doc-wrapper)

*   Subcommands
    *   [https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units](https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units)

### Reverse proxy[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-2/theory/#reverse-proxy "Permanent link")

*   What is a forward and a reverse proxy
    *   [https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/)

*   Some benefits and disadvantages
    *   [https://netacea.com/glossary/reverse-proxy/](https://netacea.com/glossary/reverse-proxy/)
    *   [https://research.aimultiple.com/reverse-proxy/](https://research.aimultiple.com/reverse-proxy/)

*   Explained in apache
    *   [https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html](https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html)

*   Video-format
    *   [https://www.youtube.com/watch?v=RXXRguaHZs0](https://www.youtube.com/watch?v=RXXRguaHZs0)
