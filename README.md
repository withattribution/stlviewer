[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)  
# STL Model Viewer using [three.js](https://threejs.org/)  

A custom web element for viewing STL formatted 3D models using three.js

## Usage  

From the root folder of this repo run ```npm install && npm start``` then navigate to the component folder in your browser. The component folder includes two custom tag examples with various demo attributes. The full list is shown as follows:

```
    <stl-viewer
        data-src="../drainCover.stl" (path to stl file)
        clearColor=#e3e3e3 (background color, default is white)
        modelColor=#FF00FF (model color, default is red)
        height=500         (optional height default set to model height)
        width=500          (optional width default set to model width)
        rotate             (set the model to automatically rotate)
    ></stl-viewer>
```

## Developing  

```shell
    npm run dev
```
