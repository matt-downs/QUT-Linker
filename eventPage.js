// Store data in memory for fast retrieval
var dataIsInBuffer = false;
var linksBuffer = [];
var settingsBuffer = {};

function getData(callback) {
  // Buffer is filled
  if (dataIsInBuffer) return callback(linksBuffer, settingsBuffer);

  // Get data from Chrome storage and fill buffer
  chrome.storage.sync.get(['links', 'settings'], function(result) {
    if (result.links && result.settings) {
      settingsBuffer = result.settings;
      linksBuffer = result.links;
    } else {
      // No data found in Chrome storage, add defaults
      settingsBuffer = defaultSettings;
      linksBuffer = defaultLinks;
      updateChromeStorage({
        'links': defaultSettings,
        'settings': defaultSettings
      });
    }
    dataIsInBuffer = true;
    return callback(linksBuffer, settingsBuffer);
  });
}

function updateChromeStorage(data) {
  chrome.storage.sync.set(data);
}

function popupAnalytics() {
  // Send notification to google analytics
  if (settingsBuffer.allowAnalytics) _gaq.push(['_trackPageview']);
}

function buttonAnalytics(label) {
  // Send notification to google analytics
  if (settingsBuffer.allowAnalytics) _gaq.push(['_trackEvent', label, 'clicked']);
}

// Default data for first time setup
var defaultSettings = {
  'allowAnalytics': true
};
var defaultLinks = [{
  'name': 'QUT Blackboard',
  'URL': 'http://blackboard.qut.edu.au/',
  'protected': true,
  'hidden': false
}, {
  'name': 'QUT Virtual',
  'URL': 'https://qutvirtual.qut.edu.au/',
  'protected': true,
  'hidden': false
}, {
  'name': 'Library',
  'URL': 'http://www.library.qut.edu.au/',
  'protected': true,
  'hidden': false
}, {
  'name': 'cite|write',
  'URL': 'http://www.citewrite.qut.edu.au/',
  'protected': true,
  'hidden': false
}, {
  'name': 'Assignment Minder',
  'URL': 'http://www.am.qut.edu.au/',
  'protected': true,
  'hidden': false
}, {
  'name': 'Email',
  'URL': 'http://www.qut.edu.au/email',
  'protected': true,
  'hidden': false
}, {
  'name': 'Student Gateway',
  'URL': 'https://www.student.qut.edu.au/',
  'protected': true,
  'hidden': true
}];

// Initialise Google Analytics
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
