'use strict';
angular.module('fileInput', []);
'use strict';
angular.module('fileInput').directive('fileInputButton', [
  '$parse',
  'fileReader',
  function ($parse, fileReader) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
        // Attach the input to the element
        var el = angular.element(element);
        var fileInput = angular.element('<input type="file" />');
        el.append(fileInput);
        // Use $parse service to push file contents on load
        var fileLoaded = $parse(attrs.onFileLoad);
        // When a file is attached to the input, read it and send the contents to the fileInput directive
        fileInput.on('change', function (e) {
          fileReader.readAsText((e.srcElement || e.target).files[0], scope).then(function (result) {
            fileLoaded(scope, { file: result });
            fileInput.val(null);
          });
        });
      }
    };
  }
]);
'use strict';
// Just a wrapper for the HTML5 FileReader, so we can use promises
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
  // Send file progress to the scope
  var onProgress = function (reader, scope) {
    return function (event) {
      scope.$broadcast('fileProgress', {
        total: event.total,
        loaded: event.loaded
      });
    };
  };
  // Actually wrap the reader
  var getReader = function (deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };
  // Read the file, return a promise
  var readAsText = function (file, scope) {
    var deferred = $q.defer();
    var reader = getReader(deferred, scope);
    reader.readAsText(file);
    return deferred.promise;
  };
  return { readAsText: readAsText };
};
angular.module('fileInput').factory('fileReader', [
  '$q',
  fileReader
]);