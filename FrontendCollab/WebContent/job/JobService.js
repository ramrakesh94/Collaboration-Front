'use strict';

app.service('JobService', ['$http','$q','$rootScope',
	function($http, $q, $rootScope) {

			console.log("jobService...")

			var BASE_URL ='http://localhost:8083/BackendCollaboration'

				 var factory = {
				fetchAllJobs: fetchAllJobs,
				createJob: createJob,
				updateJob:updateJob,
			       
			    };
				
				
				
		    return factory;

		    function fetchAllJobs() {
					console.log("calling fetchAlljobs ")
					return $http.get(BASE_URL + '/jobs').then(
							function(response) {
								return response.data;
							}, null);
				};

				function createJob(Job) {
					console.log("calling create Job")
					return $http.post(BASE_URL + '/jobs', Job) // 1
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while creating Job');
						return $q.reject(errResponse);
					});
				};

				function updateJob(Job) {
					console.log("calling fetchAllJobs ")
					return $http.put(BASE_URL + '/job/', Job) // 2
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while updating Job');
						return $q.reject(errResponse);
					});
				};


		} ]);