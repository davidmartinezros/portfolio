import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';

declare var OrbitControls: any;

declare var LavaShader: any;

@Injectable({
  providedIn: 'root'
})
export class EngineService implements OnDestroy {

  private start = Date.now();

  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;
  private directionalLight: THREE.DirectionalLight;
  private ms_Controls;

  private material: THREE.ShaderMaterial;

  private SEPARATION = 120;
  private AMOUNTX = 70;
  private AMOUNTY = 70;
  private particles: THREE.Sprite[];
  private particle: THREE.Sprite;
  private count = 0;

  private marsMesh: THREE.Mesh;
  private moonMesh: THREE.Mesh;
  private venusMesh: THREE.Mesh;

  private static frameId: number = null;

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy() {
    EngineService.ngOnDestroy();
  }

  public static ngOnDestroy() {
    if (EngineService.frameId != null) {
      cancelAnimationFrame(EngineService.frameId);
    }
  }

  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);

    // create the scene
    this.scene = new THREE.Scene();
 
    this.scene.fog = new THREE.Fog(0xffffff, 3000, 100000);

    this.camera = new THREE.PerspectiveCamera(55.0, window.innerWidth / window.innerHeight, 0.5, 3000000);
		this.camera.position.set(350, 100, -450);
    
    // soft white light
    this.light = new THREE.AmbientLight( 0x404040 );
    this.light.position.z = 10;
    this.scene.add(this.light);

    // Add light
		this.directionalLight = new THREE.DirectionalLight(0xffff55, 1);
		this.directionalLight.position.set(-600, 300, 600);
    this.scene.add(this.directionalLight);
    
    // Initialize Orbit control		
		this.ms_Controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.ms_Controls.userPan = false;
		this.ms_Controls.userPanSpeed = 0.0;
		this.ms_Controls.maxDistance = 5000.0;
		this.ms_Controls.maxPolarAngle = Math.PI * 0.495;

    this.createObjects();

  }

  createObjects(): void {

    this.particles = new Array();

    var PI2 = Math.PI * 2;

    var materialParticle = new THREE.SpriteMaterial( { color: 0x2aabd2, opacity: 1.0 } );

    var i = 0;

    for ( var ix = 0; ix < this.AMOUNTX; ix ++ ) {

      for ( var iy = 0; iy < this.AMOUNTY; iy ++ ) {

        this.particle = this.particles[ i ++ ] = new THREE.Sprite( materialParticle.clone() );
        this.particle.position.x = ix * this.SEPARATION - ( ( this.AMOUNTX * this.SEPARATION ) / 2 );
        this.particle.position.y = -200;
        this.particle.position.z = iy * this.SEPARATION - ( ( this.AMOUNTY * this.SEPARATION ) / 2 );
        this.scene.add( this.particle );

      }

    }

    // sphere with fire
    this.material = new THREE.ShaderMaterial( {

      uniforms: {
        tExplosion: {
          type: "t",
          value: new THREE.TextureLoader().load('assets/textures/explosion.png'),
        },
        time: {
          type: "f",
          value: 0.0
        }
      },
      vertexShader: LavaShader.vertexShader,
      fragmentShader: LavaShader.fragmentShader
    
    } );
    
    let mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry( 40, 4 ),
        this.material
    );
    mesh.translateY(150);
    this.scene.add( mesh );

    this.camera.lookAt(mesh.position);

    var geometry1   = new THREE.SphereGeometry(1000, 32, 32);
    var material1  = new THREE.MeshBasicMaterial();
    material1.map   = new THREE.TextureLoader().load('assets/textures/2k_mars_little_mes_petita.jpg');
    material1.side  = THREE.BackSide;
    this.marsMesh = new THREE.Mesh(geometry1, material1);
    this.marsMesh.position.x = -40000;
    this.marsMesh.position.y = 5000;
    this.marsMesh.position.z = 20000;

    this.scene.add(this.marsMesh);

    var geometry2   = new THREE.SphereGeometry(1000, 32, 32);
    var material2  = new THREE.MeshBasicMaterial();
    material2.map   = new THREE.TextureLoader().load('assets/textures/2k_venus_surface_little_mes_petita.jpg');
    material2.side  = THREE.BackSide;
    this.venusMesh = new THREE.Mesh(geometry2, material2);
    this.venusMesh.position.x = -50000;
    this.venusMesh.position.y = 8000;
    this.venusMesh.position.z = 10000;

    this.scene.add(this.venusMesh);

    var geometry3   = new THREE.SphereGeometry(1000, 32, 32);
    var material3  = new THREE.MeshBasicMaterial();
    material3.map   = new THREE.TextureLoader().load('assets/textures/2k_moon_little_mes_petita.jpg');
    material3.side  = THREE.BackSide;
    this.moonMesh = new THREE.Mesh(geometry3, material3);
    this.moonMesh.position.x = 1000;
    this.moonMesh.position.y = 2500;
    this.moonMesh.position.z = 25000;

    this.scene.add(this.moonMesh);

  }
  
  animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  render() {
    EngineService.frameId = requestAnimationFrame(() => {
      this.render();
    });

    this.material.uniforms[ 'time' ].value = .00025 * ( Date.now() - this.start );

    var i = 0;

    for ( var ix = 0; ix < this.AMOUNTX; ix ++ ) {

      for ( var iy = 0; iy < this.AMOUNTY; iy ++ ) {

        this.particle = this.particles[ i++ ];
        this.particle.position.y = -200 + ( Math.sin( ( ix + this.count ) * 0.3 ) * 50 ) +
          ( Math.sin( ( iy + this.count ) * 0.5 ) * 50 );
        if(this.particle.position.y >= -110) {
          this.particle.material.color = new THREE.Color(0x925f01);
        } else if(this.particle.position.y > -140 && this.particle.position.y < -110) {
          this.particle.material.color = new THREE.Color("orange");
        } else if(this.particle.position.y > -170 && this.particle.position.y < -140) {
          this.particle.material.color = new THREE.Color(0xf85d09);
        } else {
          this.particle.material.color = new THREE.Color(0x2aabd2);
        }
        this.particle.scale.x = this.particle.scale.y = ( Math.sin( ( ix + this.count ) * 0.3 ) + 1 ) * 4 +
          ( Math.sin( ( iy + this.count ) * 0.5 ) + 1 ) * 4;

      }

      //this.moonMesh.rotateX(0.00001);
      //this.moonMesh.rotateY(0.00001);
      //this.moonMesh.rotateZ(0.00001);

    }

    this.count += 0.1;

    this.ms_Controls.update();

    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize( width, height, false );
  }

}
