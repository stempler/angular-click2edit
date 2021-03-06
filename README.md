click-to-edit
===============

This is a directive inspired by ```Jira``` form elements. The gist is that a form field is wrapped by this directive to provide two modes of display - ```display mode``` and ```edit mode```.  In ```display mode``` a simple text rendering is displayed. When hovering over the element it morphs into a bordered ```click to edit``` box with a bootstrap pencil glyph. Click the element toggles into ```edit mode``` where the field can then be edited. The user is offered a ```save``` and ```cancel```.

Development
-----------------
After downloading the code you'll need to perform the typical install procedures.
```bash
$ npm install
$ bower install
```

To start the development ```grunt``` server execute
```bash
$ grunt server
```
This setup a server instance with livereload on port ```9000```. You can navigate to http://locahost:9000 to see a demo app that shows the components (it is currently in a pretty plain state, I'm just getting started).

To create a distribution, which is just a minified and non-minified version on the angular-widgets.js file, execute the following.
```bash
$ grunt build
```

Usage
-----------------
```bash
$ bower install angular-click2edit
```

You will need to reference the js and css files found in the ```dist``` folder
```
<script src="bower_components/angular-click2edit/dist/angular-click2edit.min.js"></script>

<link href="bower_components/angular-click2edit/dist/angular-click2edit.min.css" rel="stylesheet" type="text/css" />
```

Once you have done that you simply need to inject the tragically named module ```widgets``` into your application. I will change this name asap as it is far too generic (and accidental honestly).
```
angular.module('your-app', ['widgets']);
```

###Overview

Any element can serve as the root of either mode, a simple example is show below.
```html
<click-to-edit>
     <span display-mode>{{model.value}}</span>
     <input edit-mode type="text" ng-model="model.value"/>
 </click-to-edit>
```
It can also wrap complex markup blocks or other directives. 
Below you can see an example using ```ui-select```. 
```html
<click-to-edit>
	<span display-mode>{{model.value}}</span>
	<ui-select edit-mode  ng-model="widgets.dummy.assignedPerson">
	    <ui-select-match class="clickMe" >{{$select.selected.name}}</ui-select-match>
	    <ui-select-choices repeat="person in widgets.dummy.people">
	        <div ng-bind-html="person.name "></div>
	        <small>
	            email: {{person.email}}
	            age: <span ng-bind-html="''+person.age"></span>
	        </small>
	    </ui-select-choices>
	</ui-select>
 </click-to-edit>
```
> **Notes:**
> - The directive will bind to the ```first``` ng-model it finds in the ```edit mode``` block.
> - The directive will try to trigger a 'click' event on the element that contains the ng-model attribute.
> - You can add a ```clickMe``` class to the element that should be clicked when entering ```edit mode``` if it is not the one with the ng-model attribute. (shown above)
> - In the ui-select example, the clickMe event causes the select box to be opened automatically when entering ```edit mode```

The most powerful aspect of this directive is to use it as template to create other directives.
