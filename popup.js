var bgPage = chrome.extension.getBackgroundPage();
var vm = new Vue({
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
    bgPage.popupAnalytics();
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
      bgPage.buttonAnalytics(link.name);
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
        $('.hide-or-delete-icon').animate({
          paddingLeft: 40
        }, 150);
        $('#links-container').animate({
          marginRight: -58
        }, 150);
      }
    },

    toggleAnalytics: function() {
      this.settings.allowAnalytics = !this.settings.allowAnalytics;
      this.updateChromeStorage();
    }
  }
});
