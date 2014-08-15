'use strict';
angular.module('fileInput', []);
'use strict';
angular.module('fileInput').directive('fileInputButton', function () {
  return {
    restrict: 'EA',
    scope: { file: '=' },
    link: function (scope, element) {
      var el = angular.element(element);
      var fileInput = angular.element('<input type="file" />');
      el.append(fileInput);
      fileInput.on('change', function fileInputButtonChange() {
        if (fileInput[0].files && fileInput[0].files.length === 0) {
          return;
        }
        scope.$apply(function () {
          scope.file = fileInput[0].files;
        });
      });
    }
  };
});
'use strict';
var fileReader = function ($q) {
  var onLoad = function (reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.resolve(reader.result);
      });
    };
  };
  var onError = function (reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.reject(reader.result);
      });
    };
  };
  var onProgress = function (reader, scope) {
    return function (event) {
      scope.$broadcast('fileProgress', {
        total: event.total,
        loaded: event.loaded
      });
    };
  };
  var getReader = function (deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };
  var readAsDataURL = function (file, scope) {
    var deferred = $q.defer();
    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);
    return deferred.promise;
  };
  return { readAsDataUrl: readAsDataURL };
};
angular.module('fileInput').factory('fileReader', [
  '$q',
  fileReader
]);