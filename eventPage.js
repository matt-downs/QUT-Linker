// Google Analytics code placed in event page to reduce lag when opening extension popup.

var analyticsID = 'UA-64329205-3';

var _gaq = _gaq || [];
_gaq.push(['_setAccount', analyticsID]);

var popupOpened = function() {
  _gaq.push(['_trackPageview']);
};

var buttonAnalytics = function(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
