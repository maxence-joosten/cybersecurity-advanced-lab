# Theory

## To master[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/theory/#to-master "Permanent link")

1.   What is the **swiss cheese model** and how can it be applied to cybersecurity?
2.   What different type of network attacks exist?
    *   What is a (D)DoS attack?
    *   How can DNS be considered an attack vector as well?

3.   DNS:
    *   What information can be enumerated from a DNS server?
    *   When is it intended? What is considered a "normal" DNS resolve and how can you perform it using a CLI tool?
    *   What is, and how can you perform a reverse lookup?
    *   What is meant by _authoritative nameservers_?
    *   What is a zone transfer attack and why is it called an attack? Is a zone transfer always harmful?

4.   tcpdump (or alternatives)
    *   How can you create a network dump, only using the CLI, on a machine without a GUI?
    *   How can you exclude SSH traffic?
    *   How can you only include HTTP traffic?

5.   Wireshark:
    *   See questions from 4 - tcpdump
    *   What can an analyst learn from the following windows inside wireshark:
        *   Conversations
        *   Statistics
        *   Protocol Hierarchy

## Some Resources[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/theory/#some-resources "Permanent link")

### Swiss Cheese model[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/theory/#swiss-cheese-model "Permanent link")

*   [https://www.emsisoft.com/en/blog/38186/how-we-use-the-swiss-cheese-model-to-prevent-malware-infections/](https://www.emsisoft.com/en/blog/38186/how-we-use-the-swiss-cheese-model-to-prevent-malware-infections/)

### Network attacks[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/theory/#network-attacks "Permanent link")

*   Playlist: 5 videos about DNS
    *   [https://www.youtube.com/watch?v=r2VGOIXEsF8&list=PLEGgkEr0ifYuHzA5wJnAmAvFVZvoIXrj4](https://www.youtube.com/watch?v=r2VGOIXEsF8&list=PLEGgkEr0ifYuHzA5wJnAmAvFVZvoIXrj4)

*   Playlist: 5 videos about DDoS
    *   [https://www.youtube.com/watch?v=5_IDLpFqyUc&list=PLEGgkEr0ifYtTCTTly-_eMr6QwWLL0JDu](https://www.youtube.com/watch?v=5_IDLpFqyUc&list=PLEGgkEr0ifYtTCTTly-_eMr6QwWLL0JDu)

### DNS[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/theory/#dns "Permanent link")

*   Learning dig
    *   [https://www.youtube.com/watch?v=iESSCDnC74k](https://www.youtube.com/watch?v=iESSCDnC74k)

*   Learning nslookup
    *   [https://www.youtube.com/watch?v=jf-x76XYY2o](https://www.youtube.com/watch?v=jf-x76XYY2o)

*   DNS Zone transfers
    *   [https://www.youtube.com/watch?v=kdYnSfzb3UA](https://www.youtube.com/watch?v=kdYnSfzb3UA)
    *   [https://www.youtube.com/watch?v=6BJSqJtDq2Y](https://www.youtube.com/watch?v=6BJSqJtDq2Y)

*   Written blog
    *   [https://beaglesecurity.com/blog/vulnerability/dns-zone-transfer.html](https://beaglesecurity.com/blog/vulnerability/dns-zone-transfer.html)

### Capturing Traffic[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/theory/#capturing-traffic "Permanent link")

*   `tcpdump` tutorial
    *   [https://www.youtube.com/watch?v=KTvuyN1QGqs](https://www.youtube.com/watch?v=KTvuyN1QGqs)
    *   [https://www.youtube.com/watch?v=hWc-ddF5g1I](https://www.youtube.com/watch?v=hWc-ddF5g1I)
    *   [https://www.redhat.com/sysadmin/tcpdump-part-one](https://www.redhat.com/sysadmin/tcpdump-part-one)

### Wireshark[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/theory/#wireshark "Permanent link")

*   Intro wireshark (see course Cybersecurity & Virtualisation at HOGENT)
*   Chris Greer has a nice collection of YouTube videos about wireshark
    *   [https://www.youtube.com/@ChrisGreer](https://www.youtube.com/@ChrisGreer)
    *   Analyzing conversations
        *   [https://www.youtube.com/watch?v=IDaJZk_-muI](https://www.youtube.com/watch?v=IDaJZk_-muI)

    *   Statistics
        *   [https://www.youtube.com/watch?v=ZNS115MPsO0](https://www.youtube.com/watch?v=ZNS115MPsO0)

    *   Protocol Hierarchy
        *   [https://www.youtube.com/watch?v=g5HKG5ihNTg](https://www.youtube.com/watch?v=g5HKG5ihNTg)
