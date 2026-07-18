// Karma configuration for unit tests (Jasmine).
// Angular's @angular/build:karma builder auto-detects this file.
//
// The custom `ChromeHeadlessNoSandbox` launcher lets tests run in headless /
// containerised / CI environments (including running as root), which is what
// the Phase 5 automated test hook relies on.
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
    ],
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
      },
    },
    restartOnFileChange: true,
  });
};
