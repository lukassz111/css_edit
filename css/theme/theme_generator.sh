#!/bin/bash
THEME_NAME="generated-theme"
DIR_NAME_FOR_THEME="generated_theme"
if [ -d "./${DIR_NAME_FOR_THEME}" ]; then
    "Theme dir: ${DIR_NAME_FOR_THEME} exist, stop script"
    #exit 1    
    rm -rf ${DIR_NAME_FOR_THEME}
fi

mkdir ${DIR_NAME_FOR_THEME}
find ./.. -type d | grep -v -E '^./../theme' | cut -c 5- | grep -v -E '^$' | xargs -I{} bash -c "mkdir -p ./${DIR_NAME_FOR_THEME}{}"
# find ./.. -type f | grep -v -E '^./../theme' | grep -E '(\.css|\.scss)$' | cut -c 5- \
# | grep -v -E '^/colors.css$' \
# | grep -v -E '^/orginal.css$' \

find ./.. -type f | grep -v -E '^./../theme' | grep -E '(\.css|\.scss)$' | cut -c 5- \
| grep -v -E '^/colors.css$' \
| grep -v -E '^/orginal.css$' \
| xargs -I{} bash -c "cp ..{} ./${DIR_NAME_FOR_THEME}{}"

RUN_NUMBER=0
echo "Iteration: ${RUN_NUMBER}"
find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "bash ./theme_generator_file_filter.sh {}"
find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "bash ./theme_generator_rm_empty_files.sh {}"

RUN_NUMBER=1
echo "Iteration: ${RUN_NUMBER}"
find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "bash ./theme_generator_file_filter.sh {}"
find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "bash ./theme_generator_rm_empty_files.sh {}"

RUN_NUMBER=2
echo "Iteration: ${RUN_NUMBER}"
find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "bash ./theme_generator_file_filter.sh {}"
find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "bash ./theme_generator_rm_empty_files.sh {}"

RUN_NUMBER=3
echo "Iteration: ${RUN_NUMBER}"
find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "bash ./theme_generator_file_filter.sh {}"
find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "bash ./theme_generator_rm_empty_files.sh {}"

RUN_NUMBER=4
echo "Iteration: ${RUN_NUMBER}"
find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "bash ./theme_generator_file_filter.sh {}"
find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "bash ./theme_generator_rm_empty_files.sh {}"

find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "bash ./theme_generator_test.sh {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*position:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*overflow:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*clip:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*transition:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*cursor:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*height:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*min-height:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*max-height:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*width:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*min-width:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*max-width:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*border-style:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*border-width:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*border-radius:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*background-repeat:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*background-origin:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*background-size:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*background-position:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*padding:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*padding-top:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*padding-bottom:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*padding-left:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*padding-right:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*margin:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*margin-top:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*margin-bottom:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*margin-left:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*margin-right:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*font-size:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*font-family:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*font-weight:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*text-align:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*text-transform:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*text-underline-offset:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*display:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*line-height:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*align-content:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*align-items:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*justify-content:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*justify-items:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*flex-wrap:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*flex-direction:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*gap:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*grid-template-columns:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*grid-template-rows:\s*/d' {}"
# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "sed -i '/^\s*grid-gap:\s*/d' {}"


# find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c  "cat {} | tr '\n' 'GENERATOR_EOL'"


# echo "" > ./${DIR_NAME_FOR_THEME}/all.scss
# find ./${DIR_NAME_FOR_THEME} -type f | grep -v all | xargs -I{} bash -c "cat {} >> ./${DIR_NAME_FOR_THEME}/all.scss"
find ./${DIR_NAME_FOR_THEME} -type f | xargs -I{} bash -c "bash ./theme_generator_make_scss.sh {}"

cp ./theme_libraries_generator.sh ./${DIR_NAME_FOR_THEME}/theme_libraries_generator.sh  