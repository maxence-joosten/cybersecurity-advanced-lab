#!/bin/bash

VMS=("companyrouter" "dns" "web" "database" "employee" "homerouter" "remote-employee" "isprouter")

for VM in "${VMS[@]}"; do
  vboxmanage controlvm "$VM" acpipowerbutton
done
