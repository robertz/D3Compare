### D3Compare

Compare two Diablo 3 characters

### A brief history
This is the third iteration of the Character compare tool. So far I have written
a Node.js application, a Node.js/AngularJS application and now finally a pure
AngularJS implementation.

Basically, these are my "hello world" applications designed to learn javascript
based applications, design patterns and best practices.

### Installation procedures
* Clone the repo
* **npm install** to install the development dependencies (gulp)
* **bower install** to install required browser compononents

### Gulp tasks exposed
- gulp clean - clean the build directory
- gulp build - builds the optimized app.
- gulp watch - watch scss files to build css

### Running DEV server
I generally use the node http-server for development purposes:
```
cd app
http-server
```

### Running BUILD server
```
gulp clean && gulp build
cd build
cp ../template.html ./index.html
http-server
```
