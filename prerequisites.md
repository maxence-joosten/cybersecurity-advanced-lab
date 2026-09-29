# Prerequisites 
In learning there is stuff that you should know called **knowledge** and stuff that you should be able to do called **skills**. This page gives a list of "minimum requirement knowledge" and "minimum requirement skills" the teachers expect you to have in order to properly tackle this course. Do not go lightly over this material and be sure to process everything in due time.

![Image 1: ⚠️](https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/26a0.png)**Failure to demonstrate proficiency in any of the following topics during the exam may result in immediate termination of the exam by the teachers, leading to an automatic failure of the course.** These are referred to as the "blocking factors".

**All major topics covered in previous years' courses are assumed to be understood and mastered.**

Below a list of subjects, tools, skills and knowledge that you should have mastered from previous courses. If for any reason you did not pass the course that covered this topic or you believe you never properly saw the material, you are tasked to study it on your own for this course. **No exceptions**. If you need help or have any doubts, please contact your teacher.

Computer Networks:

*   OSI Model
    *   Yes, you should know all 7 layers perfectly (these are the fundamentals when troubleshooting)
    *   On what layer is:
        *   a MAC Address
        *   an IP Address
        *   ARP
        *   TCP
        *   UDP
        *   HTTP
        *   ICMP

*   Routing and switching
    *   Configure a Linux and Windows machine to have a static or dynamic IP configuration (including CLI).
    *   Correctly interpret and configure the default gateway and the DNS server configuration on devices in an existing network.
        *   Should the default gateway be part of your network/subnet? How do you see the default gateway on a Windows/Linux machine (including CLI)?
        *   Should the DNS server be part of your own network/subnet? How do you retrieve the DNS configuration of a Windows/Linux machine (including CLI)?

    *   Subnetting: you should be able to calculate/determine subnet ranges and correctly interpret the configuration to understand if devices belong to the same subnet or not.

*   VirtualBox Network types: review cybersecurity and virtualisation for more details.

System Administration:

*   Create, manage and run basic system administration scripts:
    *   PowerShell on Windows
    *   Bash on Linux

*   Managing systemd services on Linux using `systemctl` (`start`, `stop`, `status`, `enable`, `cat`)
*   Managing files on Linux CLI:
    *   Editing files: `nano`, `vi(m)`, ...
    *   Copying files: `scp`, `sftp`, `wget`, `curl`
    *   Ownership and rights of files and folders

*   Remote management using SSH
    *   How to SSH into a machine
    *   What are the following files: `authorized_keys`, `known_hosts`
    *   Where can you find the public and private key?
    *   **For machines without a GUI, always access them via a SSH connection from your host. During the exam, using a VirtualBox GUI for such machines is strictly prohibited!**

Theoretical Concepts:

*   What is the difference between symmetric encryption and asymmetric encryption?
*   How private keys and public keys work and which you may distribute.
*   What is the CIA triangle and properly explain the terms.
*   Understand the concept of NAT
*   Understand the concept of a firewall
