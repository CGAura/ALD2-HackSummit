# ALD2.NodeJs

Dan's git repository
https://github.com/DannChewy/ALD2-HackSummit 

On local PC
Data set to use
Child immunisation data
https://www.england.nhs.uk/statistics/wp-content/uploads/sites/2/2014/03/Child-Immunisation-Q2-201516.xlsx

CCG boundaries
https://data.gov.uk/data/resource_cache/f0/f03657a8-b993-4b09-adde-f7835abb78e9/ccg-kml-format.zip

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
