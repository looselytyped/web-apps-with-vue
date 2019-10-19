// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  beforeEach: function(browser) {
    browser.resizeWindow(1280, 800);
  },

  "should land on dashboard": browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible(".v-application--wrap", 5000)
      .assert.elementPresent("#friends")
      .assert.containsText(".headline", "Friends")
      .end();
  },

  "navigates to dashboard": browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible("#dashboard", 5000)
      .execute('document.querySelector("#dashboard").click()')
      .waitForElementVisible("#dashboard-container", 5000)
      .end();
  },

  "navigates to contacts": browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible("#contacts", 5000)
      .execute('document.querySelector("#contacts").click()')
      .waitForElementVisible("#people-container", 5000)
      .assert.urlContains(`/people`)
      .assert.containsText("#add-friend", "ADD FRIEND")
      .end();
  },

  "navigates to add friend form": browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible("#contacts", 5000)
      .execute('document.querySelector("#contacts").click()')
      .waitForElementVisible("#people-container", 5000)
      .execute('document.querySelector("#add-friend").click()')
      .assert.urlContains(`/people/add`)
      .waitForElementVisible("#add-friend-form", 5000)
      .end();
  }
};
