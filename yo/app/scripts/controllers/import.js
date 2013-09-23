'use strict';

angular.module('dmpApp')
  .filter('filesize', ['$window', function($window) {
    return function(text) {
      return $window.humanize.filesize(text);
    };
  }])
  .controller('ImportCtrl', ['$scope', '$location', 'ngProgress', function ($scope, $location, ngProgress) {

    $scope.data = {};
    $scope.meta = {};

    $scope.submitForm = function () {
      var f = $scope.data.file;
      if (angular.isDefined(f) && $scope.data.name) {
        (function(theFile, name, description) {
          var data = new FormData()
            , xhr = new XMLHttpRequest();

          xhr.onloadstart = function () {
            ngProgress.start();
          };

          xhr.upload.addEventListener('progress', function (evt) {
            if (evt.loaded < evt.total) {
              ngProgress.set(100 * (evt.loaded / evt.total));
            }
          }, false);

          xhr.onerror = function (err) {
            ngProgress.complete();
            console.log('error', err);
          };

          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              ngProgress.complete();
              if (xhr.status === 201) {
                var resp = JSON.parse(xhr.responseText),
                    respId = resp['id'];

                $location.path('/data/' + respId);
              }
            }
          };

          data.append('file', theFile, theFile.name);
          data.append('name', name);
          data.append('description', description);

          xhr.open('POST', dmp['jsRoutes']['api'] + 'resources', true);
//          xhr.open('POST', 'http://httpbin.org/post', true);
          xhr.send(data);
        })(f, $scope.data.name, $scope.data.description);
      }
    };

    $scope.$watch('data.file', function(file, oldVal) {
      if (file !== oldVal) {
        if (!$scope.data.name) {
          $scope.data.name = file.name;
        }
        $scope.meta.type = file.type;
        $scope.meta.size = file.size;
      }
    });
  }]);
