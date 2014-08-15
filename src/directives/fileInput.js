'use strict';

angular.module('fileInput').directive('fileInputButton', function() {
  return {
    restrict: 'EA',
    scope: {
      file: '=',
    },
    link: function(scope, element) {

      var el = angular.element(element);
      var fileInput = angular.element('<input type="file" />');
      el.append(fileInput);

      fileInput.on('change', function fileInputButtonChange() {

        if (fileInput[0].files && fileInput[0].files.length === 0) {
          return;
        }

        scope.$apply(function() {
          scope.file = fileInput[0].files;
        });

      });

    }
  };
});
