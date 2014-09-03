'use strict';

angular.module('fileInput').directive('fileInputButton', ['$parse', 'fileReader', function($parse, fileReader) {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {

      // Attach the input to the element
      var el = angular.element(element);
      var fileInput = angular.element('<input type="file" />');
      el.append(fileInput);

      // Use $parse service to push file contents on load
      var fileLoaded = $parse(attrs.onFileLoad);

      // When a file is attached to the input, read it and send the contents to the fileInput directive
      fileInput.on('change', function(e) {
        fileReader.readAsText((e.srcElement || e.target).files[0], scope)
          .then(function(result) {
            fileLoaded(scope, { file: result });
            fileInput.val(null);
          });
      });
    }
  };
}]);
