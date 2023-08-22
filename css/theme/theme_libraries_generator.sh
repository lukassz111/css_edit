#!/bin/bash
BAK_PWD=$(pwd)
BAK_PWD_BASENAME=$(basename ${BAK_PWD})
cd ../../..
CUR_PWD_LENGTH=$(pwd | wc -m)
RELATIVE_BAK_PWD_PATH=$(echo $BAK_PWD | cut -c ${CUR_PWD_LENGTH}-)
# echo ".$RELATIVE_BAK_PWD_PATH"




echo "global-styling-dark:"
echo "  version: VERSION"
echo "  css:"
echo "    component:"

for i in $(find ".$RELATIVE_BAK_PWD_PATH" -type f | grep scss | cut -c 3-);
do
    echo "      $i:";
    echo "        assets_path: '@tul_recruitment/'"
done
cd $BAK_PWD
