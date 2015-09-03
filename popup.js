var qut_blackboard = "http://blackboard.qut.edu.au/";
var qut_virtual = "https://qutvirtual.qut.edu.au/";
var qut_library = "http://www.library.qut.edu.au/";
var qut_citeWrite = "http://www.citewrite.qut.edu.au/";
var qut_assignmentMinder = "http://www.am.qut.edu.au/";
var qut_email = "http://www.qut.edu.au/email";

document.addEventListener('DOMContentLoaded', function() {
  var qut_blackboard_button = document.getElementById('qut_blackboard');
  qut_blackboard_button.addEventListener('click', function() {
    chrome.tabs.create({
      url: qut_blackboard
    });
  }, false);

  var qut_virtual_button = document.getElementById('qut_virtual');
  qut_virtual_button.addEventListener('click', function() {
    chrome.tabs.create({
      url: qut_virtual
    });
  }, false);

  var qut_library_button = document.getElementById('qut_library');
  qut_library_button.addEventListener('click', function() {
    chrome.tabs.create({
      url: qut_library
    });
  }, false);

  var qut_citeWrite_button = document.getElementById('qut_citeWrite');
  qut_citeWrite_button.addEventListener('click', function() {
    chrome.tabs.create({
      url: qut_citeWrite
    });
  }, false);

  var qut_assignmentMinder_button = document.getElementById('qut_assignmentMinder');
  qut_assignmentMinder_button.addEventListener('click', function() {
    chrome.tabs.create({
      url: qut_assignmentMinder
    });
  }, false);

  var qut_email_button = document.getElementById('qut_email');
  qut_email_button.addEventListener('click', function() {
    chrome.tabs.create({
      url: qut_email
    });
  }, false);

}, false);
