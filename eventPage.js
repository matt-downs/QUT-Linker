// This script handles syncing of external data and continues to run in the
// background until Chrome decides that it is no longer needed.
// See: https://developer.chrome.com/extensions/event_pages

// Store data in memory for fast retrieval
var dataIsInBuffer = false;
var linksBuffer = [];
var settingsBuffer = {};

// Gets the links and settings data for the front end
function getData(callback) {
  // Data is already in buffer
  if (dataIsInBuffer) return callback(linksBuffer, settingsBuffer);

  // Get data from Chrome storage and fill buffer
  chrome.storage.sync.get(['links', 'settings'], function(result) {
    if (result.links && result.settings) {
      processData(result);
    } else setDefaults();
    dataIsInBuffer = true;
    return callback(linksBuffer, settingsBuffer);
  });
}

function updateChromeStorage(data) {
  chrome.storage.sync.set(data);
}

// Processes and checks the data that is retrieved from localStorage
function processData(result) {
  var settings = result.settings;
  var links = result.links;
  // If the local storage version doesn't match the extension version, update
  // all the stored links to match the default schema but preserve whether they
  // were hidden.
  if (settings.version != chrome.runtime.getManifest().version) {
    settings.version = chrome.runtime.getManifest().version;
    var oldLinks = links;
    links = defaultLinks;

    for (var i in links) {
      for (var j in oldLinks) {
        if (links[i].name == oldLinks[j].name) {
          links[i].hidden = oldLinks[j].hidden;
          console.log(oldLinks[i].protected);
        }
      }
    }
    // Save the newly updated schema to localstorage
    updateChromeStorage({
      'links': links,
      'settings': settings
    });
  }
  // Save the data in the buffer
  settingsBuffer = settings;
  linksBuffer = links;
}

// Saves the default data in localStorage
function setDefaults() {
  defaultSettings.version = chrome.runtime.getManifest().version;
  settingsBuffer = defaultSettings;
  linksBuffer = defaultLinks;
  updateChromeStorage({
    'links': defaultLinks,
    'settings': defaultSettings
  });
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
  'hidden': false,
  'subLinks': [{
    'name': 'Study',
    'URL': 'http://www.google.com'
  }]
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

function sendScreenView(screen) {
  // Send notification to google analytics
  if (settingsBuffer.allowAnalytics) ga('send', 'screenview', {
    'screenName': screen,
    'appName': 'QUTLinker',
    'appVersion': chrome.runtime.getManifest().version
  });
}

function sendEvent(category, action, label) {
  // Send event notification to Google Analytics
  if (settingsBuffer.allowAnalytics) {
    ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label
    });
  }
}

// Standard Google Universal Analytics code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here

ga('create', 'UA-64329205-3', 'auto');
// Removes failing protocol check: http://stackoverflow.com/a/22152353/1958200
ga('set', 'checkProtocolTask', function(){});
ga('require', 'displayfeatures');
