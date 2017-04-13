# Code Structure
This doc describes the file structure of the customer web project. 

## 1. Introduction
Customer Web is the e-commerce front end for customers. It is built wity TypeScript and Vue.js.

## 2. Source Code Structure
Under the `src/` folder, there are two files and several folders.

* `index.html`: this is the html file working as a root container for Vue components.
* `main.ts`: this is the project entry file that creates the root Vue component and renders it inside the `index.html`.
* `assets/`: this folder stores static assets.
* `components/`: this folder has the components used in view pages.
* `infrastructure/`: this folder has the infrastructure code for router, store, i18n and api clients.
* `router_views/`: this folder contains the page level components that are used by router configuration.
* `sytles/`: the folder has scss style files.

Prefer using absolute path(`'src/'`) instead of relative path(`'../../'`) with import statements. Both webpack and Typescript support the path alias to use absolute path.

## 3. App Entry and Router
### 3.1. The Entry
The `main.ts` file performs a number of following tasks:

* create and render the root component (`router_views/App`).
* setup the store.
* configure the router and sync router with store.
* enable i18n functions.
* set network error handler to a console logger.

### 3.2. The Router
The `infrastructure/router` folder has router files mapping url paths to components in the `router_views/` folder.

The `index.ts` defines the top level components such as category, product, cart etc. Each router item has a name, a URL path, the corresponding component and some optional meta data.

The `cusotmer.ts` defines the routers for customer component and its children.

## 4. Components
### 4.1. File Structures
A component usually has four files: an `index.vue` file is a container for the two types of elements (template and script) of a component;  the `script.ts` is the script that defines the behavior and state of the component; the `template.html` defines the DOM elements; the `style.scss` defines style. Currently we put all style files in the central `styles/` folder.

The `index.vue` uses `import`, not `src` attribute, to import script file to make webpack typscript loader happy. Also the `import` and `export` uses two statement to re-export the imported default.

The path hierarch is the structure of the view: a sub component is in a sub folder.

The root component and page views are in the `router_views/` folder. The components used by router views are in `components/` folder.

### 4.2. The `router_views/App/` Folder
This is the root component. It has header, footer, categories menu, login, and signup components. It fetches categories and cart in `created` event handler. It has two computed props of cateroies and customer.

### 4.3. The `components/TheHeader/` folder
The header has the site's logo, search, cart, login and language selector.

## 5. Fetch Data
We use vuex action to send http requests to fetch data. To maintain the data consistent and avoid redundant fetching, we have the folloiwng "cache" mechanism: 

* The fetch action has a `forceFetch` flag indicating if a fecth operation should always be executed. It checks if the local data exists, if not, fecth, otherwise, do nothing. The `forceFetch` has a default value of `false`. 
* When there is a related event, use `forceFecth=true` to fetch data. An example is that when a user is logged in, fetch the user's address or payment info. 
* In all components, call fetch in `created()` to fetch data without setting `forceFetch`. 
