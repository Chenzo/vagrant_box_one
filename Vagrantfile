# -*- mode: ruby -*-
# vi: set ft=ruby :


require 'yaml'

configuration = YAML::load(File.read("#{File.dirname(__FILE__)}/config.yaml"))
#vagrant_config = configs['configs'][configs['configs']['use']]

Vagrant.configure("2") do |config|

    config.vm.box = "scotch/box"
    config.vm.network "private_network", ip: "192.168.33.10"
    config.vm.hostname = "scotchbox"
    config.vm.synced_folder ".", "/var/www", :mount_options => ["dmode=777", "fmode=666"]
    
    # Optional NFS. Make sure to remove other synced_folder line too
    #config.vm.synced_folder ".", "/var/www", :nfs => { :mount_options => ["dmode=777","fmode=666"] }
    #
    
    config.push.define "ftp" do |push|

        # Login Credentials - These exist in a private config.yaml file.
        push.host = configuration['configs']['host']
        push.username = configuration['configs']["username"]
        push.password = configuration['configs']["password"]
        
        # FTP vs SFTP
        push.secure = "true"

        # Where to copy the files on the server
        push.destination = "/var/www/html"
        
        # Where are App is
        push.dir = "public"
    end

end


