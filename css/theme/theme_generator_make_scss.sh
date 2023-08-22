#!/bin/bash 

sed -i '1s/^/.theme-dark {/' $1
echo "} " >> $1
name="$(echo $1 | cut -d'.' -f2)"
ext="$(echo $1 | cut -d'.' -f3)"
if [[ "${ext}" == "css" ]];
then
    mv $1 ".${name}.scss"
else
    echo "$name |$ext|"
fi

