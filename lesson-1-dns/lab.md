# Lab

## Prepare the lab environment[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/lab/#prepare-the-lab-environment "Permanent link")

If you haven't already, have a look at the instructions to setup the [lab environment](https://hogenttin.github.io/cybersecurity-advanced/lab-environment-guidelines/). If you are still waiting while everything is downloading, the first few questions do not require the lab environment but do require wireshark.

## Recap DNS: basic DNS queries[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/lab/#recap-dns-basic-dns-queries "Permanent link")

Below a small recap to perform DNS analysis and investigations. Be sure to test out the following examples.

### `nslookup`[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/lab/#nslookup "Permanent link")

A DNS client is used by almost every application: an underlying program asks a DNS server which IP address corresponds to the URL specified in the program. This process is called resolving. Although occurring in the background, this resolving occurs with almost every request that the computer starts to the outside world - you just don't notice it... Manually, a DNS request can also be triggered with a program like `nslookup`:

```
 nslookup www.ugent.be
```

When resolving, the default DNS server is used here, which is a setting on the host (e.g. done by DHCP). The name and IP address of the DNS server providing us with this information is displayed first, followed by the name and IP address of the URL that was requested.

If you explicitly want to use another server to request information, you can do this by also specifying the server address (or name) to the command:

```
nslookup <URL-to-question> [DNS-server IP-address or name] 
```

Besides the `nslookup` command, which works on both Linux and Windows, Linux users can also use the `host` command (shorter output), or the `dig` command (extensive output).

### `dig`[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/lab/#dig "Permanent link")

Using `dig` you can also request additional information, such as e.g. the servers responsible for the details of a particular domain (a.k.a. the authoritative server):

```
dig +short NS ugent.be 
```

A reverse lookup - converting an IP address to its DNS name - can be done with the `-x` option:

``` 
dig +short -x 157.193.43.50 
```

When a DNS server is redundant (master/slave), the entire zone can be transferred from the primary server to the secondary server. Nothing wrong there: it is a feature of DNS (see [https://en.wikipedia.org/wiki/DNS_zone_transfer](https://en.wikipedia.org/wiki/DNS_zone_transfer) ). However, when badly configured, the content of the entire zone might be accessible to everybody on the Internet. Read [https://digi.ninja/projects/zonetransferme.php](https://digi.ninja/projects/zonetransferme.php) for further explanation.

## Recap Wireshark[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/lab/#recap-wireshark "Permanent link")

In cybersecurity and virtualization we got to know Wireshark. Most captures were relatively small in size. In a more realistic setting, a capture file will have a lot of packets, often unrelated to what you are searching for. Open the [capture-lab1.pcap](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/capture-lab1.pcap) file and try to answer the following questions:

*   What layers of the OSI model are captured in this capturefile?

*   Take a look at the conversations. What do you notice?

*   Take a look at the protocol hierarchy. What are the most "interesting" protocols listed here?

*   Can you spot an SSH session that got established between 2 machines? List the 2 machines. Who was the SSH server and who was the client? What ports were used? Are these ports TCP or UDP?

*   Some cleartext data was transferred between two machines. Can you spot the data? Can you deduce what happened here?

*   Someone used a specific way to transfer a png on the wire. Is it possible to export this png easily? Is it possible to export other HTTP related stuff?

## Capture traffic using the CLI[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/lab/#capture-traffic-using-the-cli "Permanent link")

Start at least the `isprouter`, the `companyrouter`, the `dns` and the `employee` in your environment. For now you can still use the credentials vagrant/vagrant on all machines.

Install the `tcpdump` utility on the `companyrouter` and figure out a way to sniff traffic origination from the `employee` using tcpdump on the `companyrouter`.

*   Have a look at the ip configurations of the `dns` machine, the `employee` client and the `companyrouter`.

*   Which interface on the `companyrouter` will you use to capture traffic from the `dns` to the internet?

*   Which interface on the `companyrouter` would you use to capture traffic from `dns` to `employee`?

*   Test this out by pinging from `employee` to the `companyrouter` and from `employee` to the `dns`. Are you able to see all pings in `tcpdump` on the `companyrouter`?

*   Figure out a way to capture the data in a file. Copy this file from the `companyrouter` to your host and verify you can analyze this file with wireshark (on your host).

*   SSH from `employee` to the `companyrouter`. When scanning with tcpdump you will now see a lot of SSH traffic passing by. How can you start tcpdump and filter out this ssh traffic?

*   Start the `web` VM. Find a way to capture only HTTP traffic and only from and to the webserver-machine. Test this out by browsing to [http://www.cybersec.internal](http://www.cybersec.internal/) from the isprouter machine using curl. This is a website that should be available in the lab environment. Are you able to see this HTTP traffic? Browse on the `employee` client, are you able to see the same HTTP traffic in tcpdump, why is this the case?

*   Did you notice the website is using HTTP? In a future lab you will be tasked with configuring HTTPS.

## Optional further information (and captures)[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/lab/#optional-further-information-and-captures "Permanent link")

[https://wiki.wireshark.org/SampleCaptures](https://wiki.wireshark.org/SampleCaptures) is a collection of capture files, sorted per protocol. [https://packetlife.net/captures/](https://packetlife.net/captures/) is a collection of capture files on all kinds of protocols. Interesting, but challenging (and a good knowledge of networks is presumed).

## Understanding the network + Attacker machine `red`[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/lab/#understanding-the-network-attacker-machine-red "Permanent link")

### Part 1[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/lab/#part-1 "Permanent link")

You are tasked to create a new virtual machine called `red`. This will be an attacker machine. You are free to use a kali virtual machine if you have enough disk space and memory. Another option (that requires less resources) is to install a clean debian machine without a graphical user interface. The obvious disadvantage is that you will not have a GUI, but maybe that way you are forced to use some tricks and learn a thing to two! You can use any method you want (install from iso, osboxes, vagrant box, etc.). This has the advantage to be smaller in disk and memory footprint. Since kali is a debian with some tools and configurations, most attacker tools are installable on debian as well. Configure the network of your `red` machine by adding 1 interface and connecting it to the host-only network you had to create for this course (= the fake internet network).

Configure this machine correctly in such a way that it has internet access and is able to connect to all other virtual machines of the environment.

### Part 2[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/lab/#part-2 "Permanent link")

In the exercises of the next lesson you will be given an overview of some features of the network. Using the red machine you will be able to attack some services and figure out what is insecure. For now, try to gain as much insight as possible in the network. Do not assume the current setup is perfect! **Create your own network diagram and include all notes of the given setup. From now on we expect you to build and improve your own notes and documentation.** Try to answer and include the following questions in your overview:

*   What did you have to configure on your `red` machine to have internet and to properly ping the `web` machine (is the ping working on IP only or also on hostname)?

*   What is the default gateway of each machine?

*   What is the DNS server of each machine?

*   Which machines have a static IP and which use DHCP?

*   If you visualise all machines for this course, how many actual networks are there?

*   What (static) routes should be configured and where, how do you make it persistent?

*   What is the purpose (which processes or packages for example are essential) of each machine?

*   Investigate whether the DNS server of the company network is vulnerable to a DNS zone transfer "attack" as discussed above. What exactly does this attack involve? If possible, try to change the configuration multiple times in such a way that you know and understand when the server will allow or prevent this "attack". **Document this update**: How can you execute this attack or check if the DNS server is vulnerable and how can you fix it? Can you perform this "attack" both on Windows and Linux? Document your findings properly.

**Everything in the environment we gave you should be reproducible with your current knowledge. This means we expect you to be mindful and responsible. If a machine is not acting properly anymore you should be able to fix it OR create it completely from scratch. "Machine x stopped working" is not a valid excuse! Not here, and certainly not later in a professional environment.**
