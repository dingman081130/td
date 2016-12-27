// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function download(url, type) {
  xhr = new XMLHttpRequest();
  xhr.open('GET', "http://127.0.0.1:8080/recieve.php?url=" + url + "&type=" + type, true);
  xhr.send();
}

// The onClicked callback function.
function onClickHandler(info, tab) {
  if (info.menuItemId == "contextimage") {
    download(info.srcUrl, "png");
  }
  if (info.menuItemId == "contextvideo") {
    download(info.srcUrl, "mp4");
  }
  if (info.menuItemId == "contextframe") {
    console.log(info.frameUrl);
    // window.open(info.frameUrl, '_blank');
    // chrome.tabs.remove(tab.id, function() { });
    chrome.tabs.update(tab.id, {url: info.frameUrl});
  }

};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  //var contexts = ["image","video","audio", "frame"];
  var contexts = ["image","video","audio","frame"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "download " + context;
    if (context == "frame") {
        title = "extract video";
    }
    
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});
  }

  // // Create a parent item and two children.
  // chrome.contextMenus.create({"title": "Test parent item", "id": "parent"});
  // chrome.contextMenus.create(
  //     {"title": "Child 1", "parentId": "parent", "id": "child1"});
  // chrome.contextMenus.create(
  //     {"title": "Child 2", "parentId": "parent", "id": "child2"});
  // console.log("parent child1 child2");

  // // Create some radio items.
  // chrome.contextMenus.create({"title": "Radio 1", "type": "radio",
  //                             "id": "radio1"});
  // chrome.contextMenus.create({"title": "Radio 2", "type": "radio",
  //                             "id": "radio2"});
  // console.log("radio1 radio2");

  // Create some checkbox items.
  // chrome.contextMenus.create(
  //     {"title": "Checkbox1", "type": "checkbox", "id": "checkbox1"});
  // chrome.contextMenus.create(
  //     {"title": "Checkbox2", "type": "checkbox", "id": "checkbox2"});
  // console.log("checkbox1 checkbox2");

  // // Intentionally create an invalid item, to show off error checking in the
  // // create callback.
  // console.log("About to try creating an invalid item - an error about " +
  //     "duplicate item child1 should show up");
  // chrome.contextMenus.create({"title": "Oops", "id": "child1"}, function() {
  //   if (chrome.extension.lastError) {
  //     console.log("Got expected error: " + chrome.extension.lastError.message);
  //   }
  // });
});
