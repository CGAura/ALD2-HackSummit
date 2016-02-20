# ALD2.NodeJs

Dan's git repository
https://github.com/DannChewy/ALD2-HackSummit 

On local PC
Install Visual studio Node tools

Install node js
https://nodejs.org/en/

set up packages and proxy
npm --proxy http://[YOUR USERNAME]:[YOUR PASSWORD]@ukproxy.emea.cshare.net:8080 --without-ssl --insecure  install

On Koding VM

Every 10 minutes pull down from git hub
*/10 * * * * /ald2/ALD2-HackSummit/scripts/gitrepopull.sh

sudo apt-get install npm

Reroutes port 80 to port 3000 which node is running on
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000 

nodejs 
