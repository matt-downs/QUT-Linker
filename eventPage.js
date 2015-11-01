// Store links in memory for fast retrieval
var linksBuffer = [];



// Fetch the links from Chrome Storage
function getLinks(callback) {
  // Buffer is filled
  if (linksBuffer.length > 0) return callback(linksBuffer);
  // Get links from Chrome storage and fill buffer
  chrome.storage.sync.get(['links', 'settings'], function(result) {
    if (result.links && result.settings) {
      console.log(result);
      linksBuffer = result.links;
    } else {
      // No links found in Chrome storage, add defaults
      chrome.storage.sync.set({
        'links': defaultLinks,
        'settings': true
      });
      linksBuffer = defaultLinks;
    }
    return callback(linksBuffer);
  });
}

function updateChromeStorage(links) {
  chrome.storage.sync.set({
    'links': links
  });
}

function popupOpened() {
  // Send notification to google analytics
  _gaq.push(['_trackPageview']);
}

var sendButtonAnalytics = function(label) {
  _gaq.push(['_trackEvent', label, 'clicked']);
};

// Default data for first time setup
var defaultSettings = {
  allowAnalytics: true
};
var defaultLinks = [{
  "name": "QUT Blackboard",
  "URL": "http://blackboard.qut.edu.au/",
  "protected": true,
  "hidden": false
}, {
  "name": "QUT Virtual",
  "URL": "https://qutvirtual.qut.edu.au/",
  "protected": true,
  "hidden": false
}, {
  "name": "Library",
  "URL": "http://www.library.qut.edu.au/",
  "protected": true,
  "hidden": false
}, {
  "name": "cite|write",
  "URL": "http://www.citewrite.qut.edu.au/",
  "protected": true,
  "hidden": false
}, {
  "name": "Assignment Minder",
  "URL": "http://www.am.qut.edu.au/",
  "protected": true,
  "hidden": false
}, {
  "name": "Email",
  "URL": "http://www.qut.edu.au/email",
  "protected": true,
  "hidden": false
}];

// Setup Google Analytics
var analyticsID = 'UA-64329205-3';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', analyticsID]);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
