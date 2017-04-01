# Styles
We use Bootstrap 4 as the style framework

## 1. Setup Bootstrap
### 1.1. `package.json`
Install `bootstrap`, `jquery` and `tether` in `dependencies`.
Install `node-sass`, `sass-loader` in `devDependencies.

### 1.2. `webpack.base.conf.js`
Add the `jquery` and `tether` to the plugins.

```js
plugins: [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Tether: 'tether'
  })
]
```

### 1.3. `main.ts`
Import the following two files in the entry file `main.ts`.

```js
import 'bootstrap/dist/js/bootstrap'
import './styles/style.scss'
```

## 2. Bootstrap Styles
We use bootstrap 4 to style the web site. All style files are in the `styles/` folder.

The `style.scss` is the root style file that only import two files:

```
// import from node_module
@import "~bootstrap/scss/bootstrap";

// import ./_theme.scss.
// files with a "_" prefix is not compiled by scss
@import "./theme";
```

In addtion to the `bootstrap` node module, the `_theme.scss` imports all local variable and styles. The component styles are in the `components/` subfolder.

## 3. Font Awesome
Download Font Awesome from http://fontawesome.io/ and unzip it. 

Copy the unzipped folder content to `styles/font-awesome` folder. 

Add `@import "./font-awesome/scss/font-awesome"` to `styles/style.scss`. 

Finally, change `$fa-font-path` variable in `styles/font-awesome/scss/_variables.scss` file to a value of `"font-awesome/fonts" !default;`. 
