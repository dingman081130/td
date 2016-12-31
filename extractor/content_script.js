function deleteCover(){
    var elements = document.getElementsByClassName('vjs-big-play-button');
    for (var i = 0; i < elements.length; i++) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    var elements = document.getElementsByClassName('vjs-poster');
    for (var i = 0; i < elements.length; i++) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}
window.onscroll = deleteCover;
document.onload = deleteCover;
deleteCover();
document.addEventListener("DOMContentLoaded", function(){
    deleteCover();
});
window.addEventListener("load", function(){
    deleteCover();
});