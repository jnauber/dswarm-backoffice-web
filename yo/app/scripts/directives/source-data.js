'use strict';

angular.module('dmpApp')
    .controller('SourceDataCtrl', ['$scope', '$http', '$q', 'schemaParser', 'SchemaDataResource', 'PubSub', function ($scope, $http, $q, schemaParser, SchemaDataResource, PubSub) {
        $scope.internalName = 'Source Data Widget';

        $scope.data = {};
        $scope.records = [];
        $scope.schema = {};

        $scope.showData = false;

        $scope.resourceName = '';

        $scope.dataInclude = function() {
            return $scope.showData ? 'sourcedata' : '';
        };

        PubSub.subscribe($scope, 'handleLoadData', function(args) {

            if(args && args.resourceId) {
                $scope.loadData(args.resourceId, args.configId, args.resourceName);
            } else {
                $scope.data = {};
                $scope.showData = false;
                $scope.resourceName = '';
            }

        });

        PubSub.subscribe($scope, 'getLoadData', function() {

            PubSub.broadcast('returnLoadData', {
                record : $scope.records[0],
                schema : $scope.schema
            });

        });

        $scope.loadData = function(resourceId, configId, resourceName) {

            var schemaPromise, dataPromise,
                schemaTransformer, dataTransformer,
                scopeSetter;

            $scope.resourceName = resourceName;

            if (resourceId && configId) {

                schemaPromise = SchemaDataResource.schema({
                    id: resourceId,
                    cid: configId
                }).$promise;

                schemaTransformer = angular.identity;

                dataPromise = SchemaDataResource.data({
                    id: resourceId,
                    cid: configId,
                    atMost: 3
                }).$promise;

                dataTransformer = angular.identity;

                scopeSetter = function(schemaResult, dataResult) {

                    var records = [];
                    angular.forEach(dataResult, function(record) {
                        records.push({
                            id: record.recordId,
                            data: schemaParser.parseFromDomainSchema(record, schemaResult)
                        });
                    });

                    $scope.schema = schemaResult;

                    $scope.records = records;

                    $scope.showData = true;

                };

            }

            var allPromise = $q.all([schemaPromise, dataPromise]);

            allPromise.then(function (result) {

                var schemaResult = schemaTransformer(result[0])
                    , dataResult = dataTransformer(result[1]);

                scopeSetter(schemaResult, dataResult);
            });


        };


    }])
    .directive('sourceData', [ function () {
        return {
            scope: {
                'resourceId': '@',
                'configId': '@'
            },
            restrict: 'E',
            replace: true,
            templateUrl: 'views/directives/source-data.html',
            controller: 'SourceDataCtrl'
        };
    }]);
