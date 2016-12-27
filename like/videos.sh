#!/bin/bash

i=0
grep -oh 'https://www.tumblr.com/video_file/[^\ \"]*' ./iframes/* | while read -r line ; do
    if [ "$i" -gt 300 ];then
    	break;
    else
    	url=$line
    	echo "$i Processing $line"
    	proxychains4 wget --no-check-certificate --tries=3 -c -T 3 $url -O ~/Downloads/"$i".mp4
        echo "$url" >> ./downloaded.txt
    fi
    i=$((i+1))
done
