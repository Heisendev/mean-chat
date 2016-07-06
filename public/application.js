var appName = 'mean-chat';

var app = angular.module(appName, ['dbaq.emoji', 'ngResource', 'ngRoute', 'users', 'example', 'chat', 'luegg.directives',  'ngSanitize'])
  .config(function(emojiConfigProvider){
    emojiConfigProvider.addAlias("smile", ":)");
  });

app.config(['$locationProvider', function($locationProvider){
  $locationProvider.hashPrefix('!');
}]);

if(window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function(){
  angular.bootstrap(document, [appName]);
});
