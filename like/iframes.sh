#!/bin/bash

i=0
while IFS='' read -r url || [[ -n "$url" ]]; do
    echo "$i: $url"
    filepath=./iframes/$i.html
    proxychains4 wget --no-check-certificate --tries=3 -qc -T 3 -O $filepath $url &
    i=$((i+1))
done < ./iframes.txt
