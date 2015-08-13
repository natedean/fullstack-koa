angular.module('myApp', [])
  .run(function(){
    console.log('angular is STILL running!');
  });

angular.module('myApp')
  .directive('peopleList', peopleList)
  .factory('PeopleFactory', PeopleFactory);

function peopleList(){
  var directive = {
    restrict: 'EA',
    templateUrl: './js/angular-people/views/people-list.html',
    scope: {},
    link: linkFunc,
    controller: PeopleListController,
    controllerAs: 'vm',
    bindToController: true // because the scope is isolated
  };

  return directive;

  function linkFunc(scope, elem, attrs){
    var vm = this.vm;
  }
}

function PeopleListController(PeopleFactory, $timeout){
  var vm = this;

  PeopleFactory.getPeople().then(peopleSuccess, peopleFailure);

  function peopleSuccess(data){
    console.log(data.data);
    vm.peopleList = data.data;
  }

  function peopleFailure(err){
    console.log(err);
    return err;
  }
}

function PeopleFactory($http){
  console.log('people factory');

  return {
    getPeople: getPeople
  };

  function getPeople(){
    return $http.get('/people');
  }

}