#!/bin/bash

# Get userName of the mysql server
echo "mysql userName:"
read userName

# Get hostname
echo "mysql host:"
read hostName

mysql -u $userName -h $hostName -p <<EOF
    CREATE DATABASE IF NOT EXISTS $1;
    USE $1;
EOF

