var bgPage = chrome.extension.getBackgroundPage();
var vm = new Vue({
  el: '#list',

  data: {
    settingsView: false,
    links: []
  },

  created: function() {
    this.getLinks();
    this.popupOpened();
  },

  methods: {
    getLinks: function() {
      // Expose Vue to pass into function
      var parentThis = this;
      bgPage.getLinks(function(links) {
        parentThis.links = links;
      });
    },

    popupOpened: function() {
      bgPage.popupOpened();
    },

    openLink: function(link) {
      chrome.tabs.create({
        url: link.URL
      });
      bgPage.sendButtonAnalytics(link.name);
    },

    toggleOrDeleteLink: function(link) {
      if (link.protected) {
        // Toggle hidden or visible for default links
        link.hidden = !link.hidden;
      } else {
        // Delete personal links
      }
      // Save links in chrome storage
      bgPage.updateChromeStorage(this.links);
    },

    showSettings: function() {
      if (!this.settingsView) {
        // Show settings view
        this.settingsView = true;
        $('.hide-or-delete-icon').animate({
          paddingLeft: 10
        }, 150);
        $('#links-container').animate({
          marginRight: 0
        }, 150);
      } else {
        // Close settings view
        this.settingsView = false;
        $('.hide-or-delete-icon').animate({
          paddingLeft: 30
        }, 150);
        $('#links-container').animate({
          marginRight: -48
        }, 150);
      }
    }
  }
});
