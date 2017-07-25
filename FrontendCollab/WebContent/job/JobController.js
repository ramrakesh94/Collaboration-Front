'use strict';

app.controller('JobController',['$scope','JobService','$location','ApplyJobService','$rootScope','$cookieStore','$http',
					function($scope, JobService,$location,ApplyJobService ,$rootScope,$cookieStore, $http) {
							console.log("JobController...")
							var self = this;
							self.job = {id:'',jobtitle : '',companyName: '',skills:'',email:'',qualification:'',status:''};
							//this.job =  {id:'',title : '',description: '',addDate:'',qualification:'',status:''};
							this.jobs = []; 
							self.appjob = {ajId:'',jobsid : '',jobname: '',userId:'',userName:'',dateofapply:'',timeofapply:''};
							this.appjobs=[];
							// this refers to obj and here refers to obj of type controller
							// a reference variable cannot refer to more than one obj 

							/*$scope.orderByMe = function(x) {  
								$scope.myOrderBy = x;
							}*/  


							self.submit = submit;
						    self.update = update;
						    self.get = get;
						    self.job = $rootScope.job;//newlyadded
						    self.editandupdateJob=editandupdateJob;
						    self.rejectJob = rejectJob;
						    self.applyJobs=applyJobs;
						    self.BringAllAppJobs=BringAllAppJobs;
						    self.BringAllMyJobs=BringAllMyJobs;
							fetchAllJobs(); // why no self for the two functions
							/*reset();*/
						
							
							function fetchAllJobs() {
								console.log("fetchAllJobs...")
								JobService.fetchAllJobs().then(function(d) {
													self.jobs = d;
													console.log(self.jobs)
												},function(errResponse) {  
													console.error('Error while fetching Jobs');
												});
							};
							
							function BringAllAppJobs() {
								console.log("Applied Jobs List...")
								ApplyJobService.BringAllAppJobs().then(function(d) {
													self.appjobs = d;
													console.log(self.jobs)
												},function(errResponse) {  
													console.error('Error while fetching  applied Jobs');
												});
							};
							
							
							function BringAllMyJobs() {
								console.log("Applied Jobs List...")
								ApplyJobService.BringAllMyJobs($rootScope.currentUser.cusId).then(function(d) {
													self.appjobs = d;
													console.log(self.jobs)
												},function(errResponse) {  
													console.error('Error while fetching  applied Jobs');
												});
							};
							
							

							// this.fatchAllJobs();

							function createJob(job){
								console.log("createJob...")
								JobService.createJob(job).then(function(d) {
													alert("Thank you for creating message")
													$location.path("/index")
												},
												function(errResponse) {
													console.error('Error while creating Job.');
												});
							};
							
							function applyJobs(job) {
								console.log("AllapplyJobs...")
								
								
								self.appjob.jobsid=job.id;
								console.log(self.appjob.jobsid)
								self.appjob.jobname=job.jobtitle;
								self.appjob.userId=$rootScope.currentUser.cusId;
								self.appjob.userName=$rootScope.currentUser.name;
								
								
								ApplyJobService.applyjobs(self.appjob).then(function(d) {
													/*self.jobs = d;*/
													console.log("working")
												},function(errResponse) {  
													console.error('Error while applying Jobs');
												});
							};
							
							function editandupdateJob(job){
								
								console.log(job);
								$rootScope.job=job; // rootscope name MUST be job only then it can be mapped with front end
								
								console.log($rootScope.job);
								
								$location.path("/job");
								
					};
					function rejectJob(viewJobs){
				    	JobService.deleteJobRequest(viewJobs.id).then(function(d) {
							self.deleteJobRequestId = d;		    			
							console.log(self.deleteJobRequestId);
							console.log($rootScope.currentUser);
							console.log($rootScope.currentUser.cusId);
							
								
							$location.path("/viewjob")
								
				    	}, function(errResponse){
				                console.error('Error while deleting JobRequest');
				            });
				    };

				    
							

							

							function reject(id){
								console.log("reject...")
								var reason = prompt("Please enter the reason");
								JobService.reject(id, reason).then(function(d) {
											self.job = d;
											self.fetchAllJobs
											$location.path("/manage_Jobs")
											alert(self.Job.errorMessage)

										}, null);
							};

							function updateJob(currentJob){
								console.log("updateJob...")  
								JobService.updateJob(currentJob).then(function(d){
									self.updatedJob = d;		    			
									console.log(self.updatedJob);
									$rootScope.job = {};
									alert("Thank you for updating message")
									$location.path("/viewjob")
						    	}, function(errResponse){
						                console.error('Error while deleting BlogRequest');
						            });
							};
	
								
									
						

							function update() {
								{
									console.log('Update the Job details',
											$rootScope.currentJob);
									updateJob($rootScope.currentJob);
								}
					 			/*reset();*/
							};

							
							

							// this.fetchAllJobs(); //calling the method    

							// better to call fetchAllJobs -> after login ???
							function get(job){                      // it will display all jobs
								$scope.jv=job;
								console.log($scope.jv);         // how do i use this for applied jobs
								$rootScope.viewJob=$scope.jv;
								console.log('viewJob')
								$location.path("/viewjob");
								
								
							};
							
							function notEmpty(elem, helperMsg) {
						    	if (elem.value.length == 0) {
						    		alert(helperMsg);
						    		elem.focus(); // set the focus to this input
						    		return false;
						    	}
						    	return true;
						    }
						    function isNumeric(elem, helperMsg) {
						    	var numericExpression = /^[0-9]+$/;
						    	if (elem.value.match(numericExpression)) {
						    		return true;
						    	} else {
						    		alert(helperMsg);
						    		elem.focus();
						    		return false;
						    	}
						    }
						    function isAlphabet(elem, helperMsg) {
						    	var alphaExp = /^[a-zA-Z]+$/;
						    	if (elem.value.match(alphaExp)) {
						    		return true;
						    	} else {
						    		alert(helperMsg);
						    		elem.focus();
						    		return false;
						    	}
						    }
						    function isAlphanumeric(elem, helperMsg) {
						    	var alphaExp = /^[0-9a-zA-Z\.\-]+$/;
						    	if (elem.value.match(alphaExp)) {
						    		return true;
						    	} else {
						    		alert(helperMsg);
						    		elem.focus();
						    		return false;
						    	}
						    }
						    function emailValidator(elem, helperMsg) {
						    	var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
						    	if (elem.value.match(emailExp)) {
						    		return true;
						    	} else {
						    		alert(helperMsg);
						    		elem.focus();
						    		return false;
						    	}
						    }

							
  
							 function submit() 
								{
									
										// Make quick references to our fields
										var jobname = document.getElementById('jobtitle');
										
										var cname = document.getElementById('companyname');
										var tech = document.getElementById('tech');
										var mail = document.getElementById('mail');
										var stat = document.getElementById('stat');
										var qualif = document.getElementById('qualif');
										// Check each input in the order that it appears in the form!
										if (notEmpty(jobname, "Name Should not be empty")) 
										{
											if (isAlphabet(jobname, "Please enter only letters for job name"))
												{
												if (notEmpty(cname,
												"Company Name Should not be empty")) 
												
											{
												if (isAlphabet(cname,
												"Please enter a valid company name")) 
											{
													if (notEmpty(tech,
													"Tech skills Should not be empty"))
													{	
														if (isAlphabet(tech,
														"  Letters Only for Skill")) 
														{	
															
														if (notEmpty(mail,
														" EmailId Should not be empty")) 
														{
													if (emailValidator(
															mail,
															"Please enter a valid email")) 
													{
														
														if (notEmpty(stat,
														"Should not be empty")) 
													 {
															if (isAlphabet(stat,
															"Enter a valid status"))
											         {
																if (notEmpty(qualif,
																		"Qualification Should not be empty")) 
																{
																	if (isAlphanumeric(qualif,
																			"Enter valid data")) 
																	{
																		
																			
																				
																						
																		console.log(self.job.id);
																		 if(self.job.id==undefined){
																					
																			 createJob(self.job);
																		 }
																		 else{
																				console.log('Updating Job ', self.job);					
																				
																				updateJob(self.job);
																		 }
																		
																	}
																							}
																						
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
										
										/*return false;*/
								
									 
								/*reset();  */
							};

		/*					function reset() {
								self.job = {id:null,title : '',companyName: '',technicalKnowledge:'',email:'',addDate:'',qualification:'',status:''};
								//$scope.myForm.$setPristine(); // reset Form
								self.appjob = {ajId:null,jobsid : '',jobname: '',userId:'',userName:'',dateofapply:'',timeofapply:''};
							};
*/
						} ]);