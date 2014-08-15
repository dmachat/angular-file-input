# Angular File Input
Input text data using a bootstrap style button for file input.

 - Works in all browsers
 - Lightweight
 - No dependency on jQuery

## Example
```html
<div
  class="btn btn-primary btn-file-input"
>Upload</div>
```

## Install
Clone to your vendor directory
```sh
git clone git@github.com:dmachat/angular-file-input.git
```

Add the module to your app dependencies and include it in your page
```js
angular.module('app', [
  'fileInput'
]);
```
```html
<script src='[VENDOR_DIR]/angular-file-input/angular-file-input.min.js'></script>
```

```css
@import "[VENDOR_DIR]/angular-file-input/src/directives/btnFileInput.less"; /* or .min.css */
```

And you are good to go!

## Documentation over parameters

### File Input button
The directive masks the normal file input and makes it look like a button

```html
<div
  class="btn btn-primary btn-file-input"
  file-input-button

>Fileinput</div>
```

## Build it yourself!
angular-file-input is built with grunt.

To run the tests
```sh
grunt test
```

or run in autotest mode

```sh
grunt autotest
```

And when you're done minify it
```sh
grunt package
```
