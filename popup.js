new Vue({
  el: '#list',

  data: {
    settingsView: false,
    links: []
  },

  ready: function() {
    this.fetchLinks();
  },

  methods: {
    fetchLinks: function() {
      var parentThis = this;
      // Check if links exist in chrome storage
      chrome.storage.sync.get('links', function(result) {
        if (result.links) {
          // Success! Push onto Vue model
          parentThis.$set('links', result.links);
        } else {
          // Links not found in chrome storage, add defaults
          var links = [{
            name: 'QUT Blackboard',
            URL: 'http://blackboard.qut.edu.au/',
            protected: true,
            hidden: false
          }, {
            name: 'QUT Virtual',
            URL: 'https://qutvirtual.qut.edu.au/',
            protected: true,
            hidden: false
          }, {
            name: 'Library',
            URL: 'http://www.library.qut.edu.au/',
            protected: true,
            hidden: false
          }, {
            name: 'cite|write',
            URL: 'http://www.citewrite.qut.edu.au/',
            protected: true,
            hidden: false
          }, {
            name: 'Assignment Minder',
            URL: 'http://www.am.qut.edu.au/',
            protected: true,
            hidden: false
          }, {
            name: 'Email',
            URL: 'http://www.qut.edu.au/email',
            protected: true,
            hidden: false
          }];

          chrome.storage.sync.set({
            links: links
          });
          // Push onto Vue model
          parentThis.$set('links', links);
        }
      });
    },

    openLink: function(link) {
      chrome.tabs.create({
        url: link.URL
      });
    },

    toggleOrDeleteLink: function(link) {
      if (link.protected) {
        link.hidden = !link.hidden;
        console.log(this.$get('links'));
      } else {
        //delete link
      }
      // Save settings in chrome storage
      var links = this.$get('links');
      chrome.storage.sync.set({
        links: links
      });
    },

    showSettings: function() {
      var settingsView = this.$get('settingsView');
      if (settingsView) {
        // Close settings view
        $('#general-settings').fadeOut(150);
        $('#links-container').animate({
          marginLeft: -33
        }, 150);
        this.$set('settingsView', false);
      } else {
        // Show settings view
        $('#general-settings').fadeIn(150);
        $('#links-container').animate({
          marginLeft: 0
        }, 150);
        this.$set('settingsView', true);
      }
    }
  }
});


chrome.runtime.getBackgroundPage(function(eventPage) {
  eventPage.popupOpened();
});

function buttonClicked(e) {
  chrome.runtime.getBackgroundPage(function(eventPage) {
    eventPage.buttonAnalytics(e);
  });
}
