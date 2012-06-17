#! /bin/bash

cleanupEnvironment() {
  echo "---------------------------------------------------------------------"
  echo "Killing all node processes (sry if you had others :/ )"
  killall node

  # after a keystroke
#  echo "Stopping nginx"
#  sudo nginx -s stop

  echo "Everything Stopped. G2G!"
  
  exit
}


# echo "Starting up nginx"
# sudo nginx -c $PWD/config/local/nginx.conf

echo "Starting Supervisor"
supervisor -e 'hbs|json|js' -- --debug ./server.js &
node-inspector --web-port=5005 &

echo ""
echo "Everything loaded. Press any key (or CTRL-C) to turn it all off: "
echo ""
trap cleanupEnvironment INT
read -p "---------------------------------------------------------------------"
cleanupEnvironment


