window.onscroll = function(){
    console.log("lalalala");
    var elements = document.getElementsByClassName('vjs-big-play-button');
    for (var i = 0; i < elements.length; i++) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}