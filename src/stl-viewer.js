import {
    HemisphereLight,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from 'three';

import {WEBGL} from 'three/examples/jsm/WebGL';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
    }
  </style>
  <canvas id="stl-canvas"></canvas>
`;

export class STLViewerComponent extends HTMLElement {

  constructor() {
      super();
      this.attachShadow({mode:'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.canvas = this.shadowRoot.querySelector("#stl-canvas");
  }

  connectedCallback() {
      this.viewSTL();
  }

  viewSTL() {
    const scope = this;

    if (!WEBGL.isWebGLAvailable()) {
      scope.shadowRoot.host.parentElement.appendChild(WEBGL.getWebGLErrorMessage());
      return;
    }
    //Load STL from path and render scene
    (new STLLoader()).load(scope.datasrc, function(geometry){
      geometry.computeBoundingBox();
      const clearColor = scope.clearColor || '#FFFFFF';
      const color = scope.modelColor || '#FF0000';
      const light = new HemisphereLight(0xffffff, 0x000000, 1.5)
      const material = new MeshPhongMaterial({ color: color, specular: 10, shininess: 50 });
      const mesh = new Mesh(geometry, material);
      const renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas: scope.canvas });
      const scene = new Scene();
      
      const height = scope.height || geometry.boundingBox.max.y;
      const width = scope.width || geometry.boundingBox.max.x;
      const camera = new PerspectiveCamera(60,width/height,1,10000);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.rotateSpeed = 0.05;
      controls.dampingFactor = 0.1;
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.autoRotate = scope.rotate;
      controls.autoRotateSpeed = 1.5;

      scene.add(light);
      scene.add(mesh);

      // Pull the camera away as needed
      camera.position.z = Math.max(
        geometry.boundingBox.max.x,
        geometry.boundingBox.max.y,
        geometry.boundingBox.max.z) * 2.5;

      renderer.setClearColor(clearColor);
      renderer.setSize(width, height);
      renderer.render(scene,camera);

      const animate = function () {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene,camera);
      };
      animate();
    });
  }

  set datasrc(val) {this.setAttribute('data-src',val);}
  get datasrc() {return this.getAttribute('data-src');}

  set height(val) {this.setAttribute('height',val);}
  get height() { return this.getAttribute('height');}

  set width(val) {this.setAttribute('width',val);}
  get width() {return this.getAttribute('width');}

  set modelColor(val) {this.setAttribute('modelColor',val);}
  get modelColor() {return this.getAttribute('modelColor');}

  set clearColor(val) {this.setAttribute('clearColor',val);}
  get clearColor() {return this.getAttribute('clearColor');}

  set rotate(val) {
    const rotateVal = Boolean(val);
    if (rotateVal) {
      this.setAttribute('rotate','');
    }else {
      this.removeAttribute('rotate');
    }
  }
  get rotate() {return this.hasAttribute('rotate');}
}

customElements.define('stl-viewer', STLViewerComponent);