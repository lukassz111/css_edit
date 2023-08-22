#!/bin/bash 

# echo $1 
char_count=$(cat $1 | awk -v RS='[[:space:]]' 'END{print NR}')
if [ "${char_count}" -eq "0" ]; then
    echo "rm -f $1"
    rm -f $1
fi