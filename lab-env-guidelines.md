# Lab environment guidelines

## Requirements[¶](https://hogenttin.github.io/cybersecurity-advanced/lab-environment-guidelines/#requirements "Permanent link")

*   [VirtualBox](https://www.virtualbox.org/)
*   [Vagrant](https://developer.hashicorp.com/vagrant)
*   A [SSH](https://www.openssh.com/) client
*   At least 50GB free disk space
*   At least 16GB of memory

Tip: The use of an external SSD connected over USB-C. People underestimate the power and use of an external SSD from for example the Samsung T7 family. It is a pretty compact disk that can be used as storage but when used in combination with the USB-C adapter (so USB-C from and to the disk and your pc) it can actually run a few virtual machines perfectly. This way you don't have to give up disk space on your internal drives. We do **NOT** suggest to run the entire environment on an external disk, but one or two (Linux) virtual machines should be fine. Example url: [https://www.bol.com/nl/nl/s/?searchtext=samsung+externe+ssd+t7](https://www.bol.com/nl/nl/s/?searchtext=samsung+externe+ssd+t7).

## Setting up the virtual machines[¶](https://hogenttin.github.io/cybersecurity-advanced/lab-environment-guidelines/#setting-up-the-virtual-machines "Permanent link")

All information to set up the start version of the network can be found at [https://github.com/HoGentTIN/cybersecurity-advanced-lab-template](https://github.com/HoGentTIN/cybersecurity-advanced-lab-template).

If you have memory issues try to tweak the memory settings of the virtual machines a bit and keep in mind that most machines are not required to run all the time. `isprouter` and `companyrouter` are typically always needed.

In corporate settings, Windows is still the most used operating system for office work. Windows however requires more resources compared to Linux. We do however want you to have at least 1 Windows machine, preferably a client. You are free to choose Windows 10 (if memory is really scare maybe 10 is the preferred way for you) or 11. In past years Windows has been _optional_, this is not the case anymore! You are free to setup the Windows machine as you like.

We use vagrant for the initial setup. Contrary to other courses, we strongly advise **against** the use of vagrant once the machines are installed and configured. In other words, we will only use `vagrant up` once and afterwards you should not touch vagrant anymore. If you want to add a virtual machine using vagrant, create a new directory with a new vagrantfile: don't manage the entire infrastructure through vagrant!

This means that booting and stopping the machines (in other words managing) should **NOT** be done using vagrant commands. Use the virtualbox GUI for this. Even better would be creating custom PowerShell/Bash scripts to automate this process. E.g. `vboxmanage` can be used to boot a vm, while `ssh` should allow you to run `ssh <name of machine> sudo poweroff`. In other words, it should be trivial to create a custom function `boot-csa-machines` and `shutdown-csa-machines` to manage this lab.

## A VirtualBox tip[¶](https://hogenttin.github.io/cybersecurity-advanced/lab-environment-guidelines/#a-virtualbox-tip "Permanent link")

As you continue through the labs, you'll notice that you will have to add more VM's. The way you add a VM is not important for us ([osboxes.org](https://osboxes.org/), Vagrant, clean install from ISO...). If we want it to be a certain distro, it will be mentioned. If not, the choice is yours. Here are some additional tips:

*   Keep note of which VM's are necessary to run for which labs. It might not be possible (and unnecessary) to run them all at once. Especially during the examination, this note may prove to come in handy.
*   If you use [https://osboxes.org](https://osboxes.org/), you may experience the following error:

``` 
Cannot register the hard disk '/home/user/Downloads/64bit/Ubuntu Server 23.10 (64bit).vdi' {28225d01-2221-45cc-86ff-43a7fcc41859} because a hard disk '/home/user/VirtualBox VMs/Cybersecurity advanced/remoteclient/remoteclient.vdi' with UUID {28225d01-2221-45cc-86ff-43a7fcc41859} already exists. 
```

In that case, you have already added this (or a previously downloaded copy of this) .vdi file in the past. You can generate a new UUID with the following commands:

``` 
$ vboxmanage internalcommands sethduuid ~/Downloads/64bit/Ubuntu\ Server\ 23.10\ \(64bit\).vdi UUID changed to: 5370b0ac-81bf-4725-997a-41ad21eb915c 
``` 
 
Now you can retry to add the .vdi file to your VM.
