# 1. Introduction
Customer Web is the e-commerce front end for customers. It is built wity TypeScript and Vue.js.

# 2. Source Code Structure
Under the `src/` folder, there are two files and several folders. 

* `index.html`: this is the html file working as a root container for Vue components. 
* `main.ts`: this is the project entry file that creates the root Vue component and renders it inside the `index.html`. 
* `assets\`: this folder stores static assets. 
* `components\`: this folder has the components used in view pages. 
* `infrastructure\`: this folder has the infrastructure code for router, store, i18n and api clients. 
* `router_views`: this folder contains the page level components that are used by router configuration. 
* `sytles`: the folder has scss style files. 

# 3. App Entry and Router
## 3.1. The Entry
The `main.ts` file performs a number of following tasks:  

* create and render the root component (`router_views/App`).
* setup the store.
* configure the router and sync router with store.
* enable i18n functions. 
* set network error handler to a console logger.

## 3.2. The Router
 The `infrastructure/router` folder has router files mapping url paths to components in the `router_views/` folder.
 
 The `index.ts` defines the top level components such as category, product, cart etc. Each router item has a name, a URL path, the corresponding component and some optional meta data. 

 The `cusotmer.ts` defines the routers for customer component and its children. 

# 4. Components
## 4.1. File Structures
A component usually has four files: an `index.vue` file is a container for the two types of elements (template and script) of a component;  the `script.ts` is the script that defines the behavior and state of the component; the `template.html` defines the DOM elements; the `style.scss` defines style. Currently we put all style files in the central `styles/` folder. 

The `index.vue` uses `import`, not `src` attribute, to import script file to make webpack typscript loader happy. Also the `import` and `export` uses two statement to re-export the imported default. 

The path hierarch is the structure of the view: a sub component is in a sub folder. 

The root component and page views are in the `router_views/` folder. The components used by router views are in `components/` folder. 

## 4.1. The `router_views/App/` Folder 
This is the root component. It has header, footer, categories menu, signin, and signup components. It fetches categories and cart in `created` event handler. It has two computed props of cateroies and customer. 

## 4.2. The `components/TheHeader/` folder
The header has the site's logo, search, cart, signin and language selector. 

# 5. Styles
## 5.1. Setup Bootstrap

### 5.1.1. `package.json`
Install `bootstrap`, `jquery` and `tether` in `dependencies`.
Install `node-sass`, `sass-loader` in `devDependencies. 

### 5.1.2. `webpack.base.conf.js`
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

### 5.1.3. `main.ts`
Import the following two files in the entry file `main.ts`. 

```js
import 'bootstrap/dist/js/bootstrap'
import './styles/style.scss'
```

## 5.2. Bootstrap Styles
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
