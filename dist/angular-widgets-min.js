angular.module("widgets",[]),angular.module("widgets").directive("clickToEdit",["$timeout","$parse",function($timeout,$parse){return{restrict:"AE",transclude:!0,replace:!1,scope:!0,template:'<div class="templateRoot"><div class="hover-edit-trigger" title="click to edit"><div class="hover-text-field" ng-click="showEdit()" ng-enter="save()"><div style="display:inline-block" ng-transclude></div><span ng-show="!rProps.editMode"><div class="edit-pencil glyphicon glyphicon-pencil"></div></span></div></div><div class="edit-button-group pull-right" ng-show="rProps.editMode"><div class="glyphicon glyphicon-ok" ng-click="save()"></div><div class="glyphicon glyphicon-remove" ng-click="cancel()"></div></div></div>',controller:function($scope){$scope.rProps={editMode:!1},this.scope=function(){return $scope},this.tellMeTheModel=function(model){$scope.rProps.modelString=model,$scope.rProps.rollbackValue=$scope.$parent.$eval(model)}},link:function(scope,element){scope.toggle=function(){scope.rProps.editMode=!scope.rProps.editMode},scope.save=function(){var model=$parse(scope.rProps.modelString);scope.rProps.rollbackValue=model(scope),scope.toggle()},scope.cancel=function(){var model=$parse(scope.rProps.modelString);model.assign(scope,scope.rProps.rollbackValue),scope.toggle()},scope.showEdit=function(){scope.rProps.editMode||scope.toggle()},scope.$watch("rProps.editMode",function(){scope.updateElements()}),scope.updateElements=function(){angular.element(element[0].querySelector(".hover-edit-trigger")).toggleClass("editBorder",scope.rProps.editMode)}}}}]),angular.module("widgets").directive("displayMode",function(){return{require:"^clickToEdit",restrict:"AE",link:function(scope,element,attrs,cntrl){cntrl.scope().$watch("rProps.editMode",function(editMode){element.toggleClass("hideMode",editMode)})}}}),angular.module("widgets").directive("editMode",["$timeout",function($timeout){return{require:"^clickToEdit",restrict:"AE",link:function(scope,element,attrs,cntrl){function tryToFocus(focusOnMe){$timeout(function(){focusOnMe.focus()},0)}function tryToClick(clicker){$timeout(function(){angular.element(clicker).triggerHandler("click")},0)}function searchForModelElement(el,callback){return el.attr("ng-model")?void callback(el):void angular.forEach(el.children(),function(x){var el=angular.element(x);searchForModelElement(el,callback)})}cntrl.scope().$watch("rProps.editMode",function(editMode){element.toggleClass("hideMode",!editMode),searchForModelElement(element,function(modelEl){tryToFocus(modelEl[0]);var clicker=element.hasClass("clickMe")?element[0]:element[0].querySelector(".clickMe");tryToClick(clicker||modelEl)})}),searchForModelElement(element,function(modelEl){cntrl.tellMeTheModel(modelEl.attr("ng-model"))})}}}]),angular.module("widgets").directive("ngEnter",function(){return function(scope,element,attrs){element.bind("keydown keypress",function(event){13===event.which&&(scope.$apply(function(){scope.$eval(attrs.ngEnter)}),event.preventDefault())})}}),angular.module("widgets").directive("activeLink",["$location",function(location){return{restrict:"A",link:function(scope,element,attrs){var clazz=attrs.activeLink,path=attrs.when;scope.location=location,scope.$watch("location.path()",function(newPath){path===newPath?element.addClass(clazz):element.removeClass(clazz)})}}}]),angular.module("widgets").filter("propsFilter",function(){return function(items,props){var out=[];return angular.isArray(items)?items.forEach(function(item){for(var itemMatches=!1,keys=Object.keys(props),i=0;i<keys.length;i++){var prop=keys[i],text=props[prop].toLowerCase();if(-1!==item[prop].toString().toLowerCase().indexOf(text)){itemMatches=!0;break}}itemMatches&&out.push(item)}):out=items,out}});