'use strict';

describe('Controller: FilterDataCtrl', function () {
    var $httpBackend, $rootScope, scope, filterDataCtrl;

    beforeEach(module('dmpApp'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');

        scope = $rootScope.$new();

        var $controller = $injector.get('$controller');
        filterDataCtrl = function () {
            return $controller('FilterDataCtrl', {
                $scope: scope
            });
        };

    }));


    xit('should have a FilterDataCtrl controller', function() {
        var FilterDataCtrl = filterDataCtrl();
        expect(FilterDataCtrl).not.toBe(null);
    });
});
