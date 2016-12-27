#!/bin/bash

function processPage {
    addr='http://sexynaughtyhotgirl.tumblr.com/likes/page/';
    max_page=100;
	pagepath=./page.html

    for ((i=1;i<=100;i++)); 
    do
        echo "[info] Start to process page $i"
        pageurl="$addr$i"
    	proxychains4 wget --no-check-certificate --tries=3 -q -T 3 -O $pagepath $pageurl
        if [ $? != 0 ];then
            echo "[erro] The page $i download fail. $pageurl"
            continue;
        fi
	    grep -q '\<article\>' $pagepath
    	if [ $? != 0 ];then
	    	echo "[done] Page $i is the last one."
		    break
    	fi
        grep 'https://www.tumblr.com/video/[a-zA-Z0-9.-]*/[0-9]*/[0-9]*/' -o $pagepath | while read -r iframe ; do
            processIframe $iframe
        done
    	echo "[info] Process page $i done. $pageurl"
    done
}

function processIframe {
    iframeurl=$1
    echo "[info] Start to process iframe $iframe"
    iframepath=./iframe.html
    proxychains4 wget --no-check-certificate --tries=3 -q -T 3 -O $iframepath $iframeurl &
    if [ $? != 0 ];then
        echo "[erro] The iframe $iframe download fail"
        return 1
    fi

    grep -oh 'https://www.tumblr.com/video_file/[^\ \"]*' $iframepath | while read -r video ; do
        processVideo $video
    done

    return 0;
}

function processVideo {
    videourl=$1
    echo "videourl" >> ./downloaded1234.txt
    return 0
    videopath=~/Downloads/`echo -n "$videourl" | openssl sha1`.sha1.mp4
    if [ -f "$videopath" ];then
        echo "[info] $videopath has been downloaded."
        return 0
    fi
    #proxychains4 wget --no-check-certificate --tries=3 -c -T 3 -O $videopath $videourl
    echo "ok"
    if [ $? != 0 ];then
        echo "[erro] Download video fail. $videourl"
        return 1
    else
        echo "videourl" >> ./downloaded1234.txt
    fi
    return 0
    
}

#while true
#do
#    sleep 1
    processPage
#done
