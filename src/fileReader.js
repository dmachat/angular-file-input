'use strict';

// Just a wrapper for the HTML5 FileReader, so we can use promises
var fileReader = function ($q) {

  var onLoad = function(reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.reject(reader.result);
      });
    };
  };

  // Send file progress to the scope
  var onProgress = function(reader, scope) {
    return function (event) {
      scope.$broadcast('fileProgress', {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  // Actually wrap the reader
  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  // Read the file, return a promise
  var readAsText = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsText(file);

    return deferred.promise;
  };

  return {
    readAsText: readAsText
  };
};

angular.module('fileInput').factory('fileReader', ['$q', fileReader]);
