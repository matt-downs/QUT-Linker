// This script handles user interaction and is called every time the popup is
// opened. This script was kept as minimal as possible, putting the bulk
// functions in the event page to eliminate possible lag.

var bgPage = chrome.extension.getBackgroundPage();
new Vue({
  el: '#list',

  data: {
    editMode: false,
    settings: {},
    links: [],
    GitHubLink: {
      URL: 'https://github.com/matt-downs/QUT-Linker',
      name: 'GitHub'
    }
  },

  created: function() {
    this.getData();
  },

  ready: function() {
    bgPage.sendScreenView('Home');
  },

  methods: {
    getData: function() {
      // Expose Vue to pass into function
      var parentThis = this;
      bgPage.getData(function(links, settings) {
        parentThis.links = links;
        parentThis.settings = settings;
      });
    },

    openLink: function(link) {
      chrome.tabs.create({
        url: link.URL
      });
      bgPage.sendEvent('Link', 'clicked', link.name);
    },

    toggleOrDeleteLink: function(link) {
      if (link.protected) {
        // Toggle hidden or visible for default links
        link.hidden = !link.hidden;
      } else {
        // Delete personal links
      }
      // Update changes in chrome storage
      this.updateChromeStorage();
    },

    updateChromeStorage: function() {
      bgPage.updateChromeStorage({
        'links': this.links,
        'settings': this.settings
      });
    },

    showSettings: function() {
      if (!this.editMode) {
        // Show settings view
        bgPage.sendScreenView('Settings');
        this.editMode = true;
        $('.hide-or-delete-icon').animate({
          paddingLeft: 10
        }, 150);
        $('#links-container').animate({
          marginRight: 0
        }, 150);
      } else {
        // Close settings view
        this.editMode = false;
        bgPage.sendScreenView('Home');
        $('.hide-or-delete-icon').animate({
          paddingLeft: 40
        }, 150);
        $('#links-container').animate({
          marginRight: -58
        }, 150);
      }
    },

    toggleAnalytics: function() {
      if (this.settings.allowAnalytics) {
        bgPage.sendEvent('Analytics', 'disabled');
        this.settings.allowAnalytics = false;
      } else {
        this.settings.allowAnalytics = true;
        bgPage.sendEvent('Analytics', 'enabled');
      }
      this.updateChromeStorage();
    }
  }
});
