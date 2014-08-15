'use strict';

describe('btnUpload', function () {

  var $compile, $rootScope;

  beforeEach(function () {
    angular.mock.module('fileInput');

    inject(function ($injector) {
      $compile = $injector.get('$compile');
      $rootScope = $injector.get('$rootScope');
    });
  });

  it('should display fileinput', function () {
    var element = $compile('<div class="btn btn-primary btn-file-input" file-input-button><button>Fileinput</button></div>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('type="file"');
  });

});
