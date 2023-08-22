#!/bin/bash

mv $1 $1.tmp
cat $1.tmp \
| sed '/^$/d' \
| sed '/^\s*position:\s*/d' \
| sed '/^\s*left:\s*/d' \
| sed '/^\s*right:\s*/d' \
| sed '/^\s*top:\s*/d' \
| sed '/^\s*bottom:\s*/d' \
| sed '/^\s*overflow:\s*/d' \
| sed '/^\s*opacity:\s*/d' \
| sed '/^\s*clip:\s*/d' \
| sed '/^\s*transition:\s*/d' \
| sed '/^\s*cursor:\s*/d' \
| sed '/^\s*height:\s*/d' \
| sed '/^\s*min-height:\s*/d' \
| sed '/^\s*max-height:\s*/d' \
| sed '/^\s*width:\s*/d' \
| sed '/^\s*min-width:\s*/d' \
| sed '/^\s*max-width:\s*/d' \
| sed '/^\s*box-sizing:\s*/d' \
| sed '/^\s*border: 0/d' \
| sed '/^\s*border-style:\s*/d' \
| sed '/^\s*border-width:\s*/d' \
| sed '/^\s*border-radius:\s*/d' \
| sed '/^\s*border-bottom-style:\s*/d' \
| sed '/^\s*border-bottom-width:\s*/d' \
| sed '/^\s*border-top-left-radius:\s*/d' \
| sed '/^\s*border-bottom-left-radius:\s*/d' \
| sed '/^\s*border-right-width:\s*/d' \
| sed '/^\s*background-repeat:\s*/d' \
| sed '/^\s*background-origin:\s*/d' \
| sed '/^\s*background-size:\s*/d' \
| sed '/^\s*background-position:\s*/d' \
| sed '/^\s*background-clip:\s*/d' \
| sed '/^\s*padding:\s*/d' \
| sed '/^\s*padding-top:\s*/d' \
| sed '/^\s*padding-bottom:\s*/d' \
| sed '/^\s*padding-left:\s*/d' \
| sed '/^\s*padding-right:\s*/d' \
| sed '/^\s*margin:\s*/d' \
| sed '/^\s*margin-top:\s*/d' \
| sed '/^\s*margin-bottom:\s*/d' \
| sed '/^\s*margin-left:\s*/d' \
| sed '/^\s*margin-right:\s*/d' \
| sed '/^\s*font-size:\s*/d' \
| sed '/^\s*font-family:\s*/d' \
| sed '/^\s*font-weight:\s*/d' \
| sed '/^\s*text-align:\s*/d' \
| sed '/^\s*text-transform:\s*/d' \
| sed '/^\s*text-underline-offset:\s*/d' \
| sed '/^\s*text-decoration:\s*/d' \
| sed '/^\s*word-break:\s*/d' \
| sed '/^\s*display:\s*/d' \
| sed '/^\s*line-height:\s*/d' \
| sed '/^\s*letter-spacing:\s*/d' \
| sed '/^\s*align-content:\s*/d' \
| sed '/^\s*align-items:\s*/d' \
| sed '/^\s*align-self:\s*/d' \
| sed '/^\s*justify-content:\s*/d' \
| sed '/^\s*justify-items:\s*/d' \
| sed '/^\s*justify-self:\s*/d' \
| sed '/^\s*flex-wrap:\s*/d' \
| sed '/^\s*flex-direction:\s*/d' \
| sed '/^\s*gap:\s*/d' \
| sed '/^\s*order:\s*/d' \
| sed '/^\s*grid-template-columns:\s*/d' \
| sed '/^\s*grid-template-rows:\s*/d' \
| sed '/^\s*grid-auto-flow:\s*/d' \
| sed '/^\s*grid-auto-rows:\s*/d' \
| sed '/^\s*grid-gap:\s*/d' \
| sed '/^\s*grid-area:\s*/d' \
| sed '/^\s*z-index:\s*/d' \
| sed '/^\/\*.*\*\/$/d' \
| sed '/^\s*--bs-breadcrumb-divider:\s*/d' \
| sed '/^\s*--tul_recruitment_text[-a-z]*:\s*/d' \
| sed '/^\s*--id-main-wrapper-width:\s*/d' \
| sed '/^\s*--id-main-wrapper-margin:\s*/d' \
| sed -r '/^\s*\/\//d' \
| sed -r 's/^\s*\/\*/\/*/' \
> $1.tmp1
rm $1.tmp


cat $1.tmp1 \
| sed -z 's/\n/GENERATOR_EOL/g' \
| sed 's/{GENERATOR_EOL\s*\}/{}/g' \
| sed 's/,\s*GENERATOR_EOL/,/g' \
| sed -z 's/GENERATOR_EOL/\n/g' \
| sed -z 's/}/}\n/g' \
> $1.tmp2
rm $1.tmp1

cat $1.tmp2 \
| sed -r 's/^\s*(\.)/\1/' \
| sed 's/^\.[a-z0-9 >.\-]*{}$//' \
| sed -r 's/^(\.|#)[\:\_a-z0-9 >.\-]{1,}*\{\}$//' \
| sed '/^\s*:root {}\s*/d' \
> $1.tmp3
rm $1.tmp2

cat $1.tmp3 \
| sed '/^$/d' \
| sed '/^\s*content: ""/d' \
| sed '/content: ""/d' \
| sed '/^\s*[->#,\.a-z ]*{}/d' \
> $1.tmp4
rm $1.tmp3

mv $1.tmp4 $1