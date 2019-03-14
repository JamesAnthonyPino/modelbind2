# jQuery ModelBind2

### Original author: James Pino

ModelBind2 is a jQuery plugin that binds a model to a form (or other page container). It automatically updates the model if your form changes, so that all you have
to do is grab the updated model then use it as you see fit.
It's simple, effective, and easy to use. ModelBind2 always uses a cloned copy of the model, so you never have side effects.

### Differences from the original ModelBind
The original ModelBind used a change listener and automatically updated the model, so all you would ever have to do use the modified model. There are some valid use cases for this, but this new version is much safer and prevents the original model from being inadvertently modified.

### Download
Just download the minfied version (modelbind.jquuery.min.js) from this Github page. No other files are required.

### Example
Below is a simple example of a model being bound to a form using the attribute
"data-field-name". Once you update any of the form fields, the model is updated.
By default, the mode will bind to the field's ID attribute. The model's keys must
match that of the bind attribute, in this case, the <i>data-field-name</i>.

```javascript
var myModel;
$(function(){
  // Test
  myModel = {
    make: "Honda",
    model: "Prelude",
    year: "1997",
    doors: "2",
    transmission: "5M",
    engine: "I-4",
    drive: "front",
    hp: "201",
    trq: "151",
    Zto60: "7.2",
    Zto100: "15.1",
    topSpeed: "141"
  };

  $("#myForm").modelbind({
    model: myModel,
    bindAttribute: "data-field-name"
  });

// Get the modified model (after the user makes changes on the page)
var model = $("#myForm").modelbind("getModel");

// Update the page with a modified or new model
model.transmission = "Automatic";
$("#myForm").modelbind("setModel", model);

});
```

### Usage and Configuration
Setup and usage is easy and straightforward.
 * Include jQuery and the Modelbind plugin on your page.
 * Define a model.
 * Call the modelbind plugin for the form (this can also be a DIV or other container).
 * When the form is updated, so is the model. Simply get the changed model from the instance by calling "getModel".
 * Send the modified model to an API call or other service using AJAX or fetch or Websockets, etc.




### Configuration Options

| Option        | Type          | Default  |
| ------------- |:-------------:| --------:|
| bindAttribute | String        | id       |
| model         | object        | n/a      |


### Methods

| Method        | Return type   | Args     |
| ------------- |:-------------:| --------:|
| updateForm    | undefined     | n/a      |
| updateModel   | undefined     | Object   |
| getModel      | Object        | n/a      |


### Compatibility
ModelBind should work with most modern browsers. jQuery >= 2.x is recommended.
 
### License
Modelbind is free and open source, which means it is free to use and the source is available so that it can be modified. It is licensed under the MIT license, as follows:

<pre>
Copyright (c) 2019 James Pino

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre>
