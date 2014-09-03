exports.config = {

  name: 'angular-file-input',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/**/*.js'],

  capabilities: {
    browserName: 'chrome'
  },

  baseUrl: 'http://localhost:9001',

  rootElement: 'body',

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  }
};
