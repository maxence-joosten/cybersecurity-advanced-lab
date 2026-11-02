# Lab

## Attacker virtual machine `red`[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-2/lab/#attacker-virtual-machine-red "Permanent link")

Use your documentation from lesson 1 and configure the `red` machine in such a way that this machine can ping **ALL** other devices of the environment if that wasn't the case yet (similar questions from [lecture 1](https://hogenttin.github.io/cybersecurity-advanced/lesson-1/lab/)). **Do not continue unless you have figured this out!**

*   What routes do you need to add?
*   What is the default gateway?
*   Does your `red` has internet? If not, is it possible? Why not OR how?

## The insecure "fake internet" host only network[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-2/lab/#the-insecure-fake-internet-host-only-network "Permanent link")

In this environment, the host-only network that was created when setting up the environment can be seen as an "insecure" network. Assume hackers can create machines and do whatever they want in this network. The `red` machine symbolizes this metaphor. `companyrouter` is the bridge between the internal company network and the "external" (fake internet) network.

From your `red` machine perform the following "red team attacks". Make sure to improve your documentation for all "insecure" stuff you notice.

*   Use a web browser to browse to [http://www.cybersec.internal](http://www.cybersec.internal/)
*   Use a web browser to browse to [http://www.cybersec.internal/cmd](http://www.cybersec.internal/cmd) and test out this insecure application.
*   Perform a default nmap scan on all machines.
*   Enumerate the most interesting ports (you found in the previous step) by issuing a service enumeration scan (banner grab scan).
    *   What database software is running on the database machine? What version?
    *   Try to search for a nmap script to brute-force the database. Another (even easier tool) is called hydra ([https://github.com/vanhauser-thc/thc-hydra](https://github.com/vanhauser-thc/thc-hydra)). Search online for a good wordlist. For example "rockyou" or [https://github.com/danielmiessler/SecLists](https://github.com/danielmiessler/SecLists) We suggest to try the default username of the database software and attack the database machine. Another interesting username worth a try is "toor".
    *   Try to SSH (using `vagrant`/`vagrant`) from `red` to another machine. Is this possible?
    *   What webserver software is running on `web`?
    *   Try the `-sC` option with nmap. Do you remember what this option is?
    *   **Important:** after trying to figure this one out using nmap from the `red` machine. Shift your view from a red teamer to a blue teamer. Log in to the `web` machine and try to figure out, **in detail (!)**, how the webserver is configured. What software is used? Is it static content? Is there java, c#, .NET, php, nodejs... ? Are systemd-unit files used as services? Document this properly!

## Network Segmentation[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-2/lab/#network-segmentation "Permanent link")

As you can see, a hacker on this host-only network, has no restrictions to interact with the other machines. This is not a best-practice! It looks like there is no difference between the attacker being inside "the internal network" or in the "fake internet network". In practice this means there is not a firewall configured to schield the internal network from the big bad world outside (in this case - once again to stress the important - the "fake internet" network). A way to resolve this issue, is by using and configuring a firewall. This is a **network-based firewall**. Host-based firewalling is also important, but they are 2 different things! When configuring a firewall, it is import to perform what is called **network segmentation**. By dividing the network in several segments (often also called "zones") and properly configuring the access to and from these segments (often subnets) you can reduce the **attack vector** a lot!

*   What is meant here with the term "attack vector"?
*   Is there already network segmentation done on the (internal) company network?
*   Remember what a DMZ is? What machines would be in the DMZ in this environment? Are there multiple ways to configure this?
*   What could be annoying when using network segmentation? _Tip in our case: take a look at `client`<->`server` interaction._

Configure the environment, and especially the `companyrouter`, to make sure that the `red` machine **is not able to interact with most systems anymore**. No (network) changes should be done to the `red` machine! The only requirements that are left for the `red` machine are:

*   Browsing to [http://www.cybersec.internal](http://www.cybersec.internal/) should work. The website of the company should be available from outside the internal network as well. _Note_: you are allowed to manually add a DNS entry to the `red` machine to tell the system how to resolve "[www.cybersec.internal](http://www.cybersec.internal/)" if necessary. Try to be mindful why/when this is needed!
*   All machines in the company network should still have internet access.
*   You should verify what functionality you might lose by implementing the network segmentation. List out and create an overview.
*   You should be able to revert back easily: **Create proper documentation!**

## Firewall[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-2/lab/#firewall "Permanent link")

You are free to choose how you will implement this, but be sure you are able to explain your reasoning. **Document everything properly before making changes to existing configuration files. We suggest to use your knowledge of virtualbox as well.** The goal of this exercise is to configure `companyrouter` as a **firewall**, more specifically a **network-based firewall**. Software that can help is for example `firewall-cmd`, `ufw`, `iptables` or `nftables`.

Tip: Although `iptables` is still used, the Linux world is shifting towards it's spiritual successor `nftables` as it has more features and is easier to configure.

Tip: While `firewall-cmd` is really good as an easy to use firewall for clients or single hosts (= **host-based firewall**), it might not be the preferred choice for our use case. Development is still ongoing, so better support can come (or maybe it is already here).

Conclusion: although we think there is value in the ability of reading and interpreting iptables (which these days AI can help you with), we do recommend the use of `nftables` for this lab.

## Open, closed, filtered ports[¶](https://hogenttin.github.io/cybersecurity-advanced/lesson-2/lab/#open-closed-filtered-ports "Permanent link")

Finish this lab exercise by performing a nmap scan to `web` on ports 80, 22 and 666. For port 80 you should see "open", what do you notice on port 22 and 666? Can you explain this result? Make your firewall insecure again (you should be able to do this easily!) and rerun the scan, analyse the differences. **We expect you to learn and know the difference between open/closed/filtered!**
