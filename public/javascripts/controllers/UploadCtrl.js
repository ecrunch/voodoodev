

var app = angular.module('UploadCtrl', ['ngFileUpload']);

app.controller('UploadCtrl',
['$scope', 'auth', 'Upload',
    function($scope, auth, Upload) {

        /*
        $scope.$watch('file', function(file) {
            $scope.upload($scope.file);
        });

        $scope.upload = function(file) {
            Upload.upload({
                url: '/upload_file',
                file: file,
                method: 'POST'
            }).progress(function(evt) {
                console.log(evt);
                var progressPercentage = 
                    parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + 
                    '% ' + evt.config.file.name);
            }).success(function(data, status, headers, config) {
                console.log('file ' + config.file.name + ' uploaded. ' + 
                    'Response: ' + data);
            }).error(function(data, status, headers, config) {
                console.log('error status: ' + status);
            });
        };
        */
    }
]);
