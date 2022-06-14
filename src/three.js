import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { InstancedFlow } from 'three/examples/jsm/modifiers/CurveModifier'
import { InteractionManager } from "three.interactive";
import * as dat from 'dat.gui'


import blobVertexShader from './shaders/blob/vertex.glsl'
import blobFragmentShader from './shaders/blob/fragment.glsl'

import planeVertexShader from './shaders/plane/vertex.glsl'
import planeFragmentShader from './shaders/plane/fragment.glsl'

import starsVertexShader from './shaders/stars/vertex.glsl'
import starsFragmentShader from './shaders/stars/fragment.glsl'


const fontLoader = new FontLoader()
const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()

const dot = textureLoader.load('textures/dot.png',(texture)=>{
    texture.minFilter = THREE.NearestFilter
})

//DAT GUI
// const gui = new dat.GUI()

//Scene
const scene = new THREE.Scene()
const canvas = document.querySelector('.webgl')
const group = new THREE.Group()
scene.add(group)
const galaxyGroup = new THREE.Group()
scene.add(galaxyGroup)

const fog = new THREE.Fog('#0e0e0e', 4, 20)
scene.fog = fog


//Lines plane
const linesTexture = textureLoader.load('textures/lines-min.png',(texture)=>{
    texture.minFilter = THREE.LinearMipmapLinearFilter,
    texture.magFilter = THREE.LinearFilter
})

const noisePlaneGeometry = new THREE.PlaneBufferGeometry(1, 0.5, 256, 256)
const noisePlaneMaterial = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms:{
        uTime: {value: 0},
        uTexture: {value: linesTexture},
        uTimeFrequency: {value: 0.1},
        uDistortionFrequency: {value: 8},
        uDistortionStrength: {value: 0.08},
        uColor: {value: new THREE.Color('#2600ff')}
    },
    vertexShader: planeVertexShader,
    fragmentShader: planeFragmentShader
})
const noisePlane = new THREE.Mesh(noisePlaneGeometry, noisePlaneMaterial)
noisePlane.rotation.x = -0.9
noisePlane.scale.setScalar(24)
noisePlane.position.set(0, 0.2, -5)
scene.add(noisePlane)


function createSphereDots(){
    
    const positions = [];

    for (let x = 0; x < 5000; x++) {
      const pos = {
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        lat : 2 * Math.PI * Math.random(),
        long : Math.acos(2 * Math.random() - 1)
      };
      pos.u = Math.cos(pos.long);
      pos.sqrt = Math.sqrt(1 - (pos.u*pos.u));
      positions.push(pos);
    }

    const radius = 2;
    const connections = 3;
    let distance = .3;
    const linesOpacity = 0.6;
    let height = .4;
    // const dots = true;
    const amount = 3000;
    const dotsSize = .06;
    const dotsOpacity = 1;
    const strokesColor = "#1f81d2";
    // const strokesColor = "#87BCDE";
    const dotsColor = "#ddd6ff";


    const galaxy = new THREE.Object3D()
    galaxyGroup.add(galaxy)
    galaxyGroup.position.set(1, 0, 0)
    galaxyGroup.scale.setScalar(1.2)

    const dotTexture = dot

    const dotsMaterial = new THREE.PointsMaterial({
        size: dotsSize,
        map: dotTexture,
        transparent: true,
        opacity: dotsOpacity,
        alphaTest: 0.1
    });

    const strokesMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: linesOpacity
    });

    const strokes = new THREE.LineSegments(new THREE.BufferGeometry(), strokesMaterial);
    galaxy.add(strokes);
    const dotStrokes = new THREE.Points(new THREE.BufferGeometry(), dotsMaterial);
    galaxy.add(dotStrokes);


    function createStrokes() {
        const dots = new THREE.BufferGeometry();
        const dotsArray = []
        const dotsVectorArray = []
        // Create vertices
        for (var i = 0; i < amount; i++) {
          var pos = {
            x: (positions[i].x * height + radius) * positions[i].sqrt * Math.cos(positions[i].lat),
            y: (positions[i].y * height + radius) * positions[i].sqrt * Math.sin(positions[i].lat),
            z: (positions[i].z * height + radius) * positions[i].u
          };
          const vector = new THREE.Vector3(pos.x, pos.y, pos.z);
          dotsVectorArray.push(vector)
          vector.amount = 0;
          dotsArray.push(pos.x, pos.y, pos.z);
        }
        dots.setAttribute('position', new THREE.Float32BufferAttribute(dotsArray, 3))


      // Create segments
      const segments = new THREE.BufferGeometry();
      const segmentsArray = []
    
      for(let i = dotsArray.length / 3 -1 ; i >= 0; i--){
        const vector = dotsVectorArray[i];
        for(let j = dotsArray.length / 3 -1 ; j >= 0; j--){
            if(vector.amount < connections && i !== j && vector.distanceTo(dotsVectorArray[j]) < distance){

            segmentsArray.push(vector.x, vector.y, vector.z)
            segmentsArray.push(dotsVectorArray[j].x, dotsVectorArray[j].y, dotsVectorArray[j].z);
            vector.amount++; 
            // dotsArray[j].amount++;
          }
        }
      }
      segments.setAttribute('position', new THREE.Float32BufferAttribute(segmentsArray, 3))
      segments.computeBoundingSphere()

      strokesMaterial.opacity = linesOpacity;
      strokesMaterial.color = new THREE.Color(strokesColor);
      strokes.geometry = segments;

      dotsMaterial.size = dotsSize;
      dotsMaterial.opacity = dotsOpacity;
      dotsMaterial.color = new THREE.Color(dotsColor);
      dotStrokes.geometry = dots;
    }

    createStrokes()
    galaxy.scale.setScalar(1)
    galaxy.position.set(2.5, 0, -2)
}

createSphereDots()


//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

let contactSizes
let contactCanvasContainer

window.addEventListener('resize', ()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


    contactSizes.width = contactCanvasContainer.clientWidth
    contactSizes.height = contactCanvasContainer.clientHeight

    contactRenderer.setSize(contactSizes.width, contactSizes.height)
    contactRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    contactCamera.aspect = contactSizes.width / contactSizes.height
    contactCamera.updateProjectionMatrix()


    checkWindowWidth()
})



//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 5)
scene.add(camera)



//Lights
const directionalLight = new THREE.DirectionalLight(0xfff0dd, 0.4)
directionalLight.position.set(0, 5, 10)
scene.add(directionalLight)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)


//Mouse
const mouse = new THREE.Vector2(0, 0)

window.addEventListener('mousemove', (event) =>{
    mouse.x = (event.clientX / sizes.width) * 2 -1
    mouse.y = -((event.clientY / sizes.height) * 2 -1)
})



//Render and controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

//intersection-observer




const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    antialias: false,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//Scroll
let scrollY = window.scrollY
window.addEventListener('scroll', (event)=>{
    scrollY = window.scrollY
})

const clock = new THREE.Clock()

function startRender() {
    if (!requestRenderId) {
        requestRenderId = window.requestAnimationFrame(tick);
    }
}

function stopRender() {
    if (requestRenderId) {
       window.cancelAnimationFrame(requestRenderId);
       requestRenderId = undefined;
    }
}

let contactScene, contactCanvas, contactRenderer, contactCamera, blob, interactionManager, starsBackground
let clearRender = false
let clearContactRender = false
let flow = null
let requestRenderId
const tick = () =>{    
    requestRenderId = undefined
    const elapsedTime = clock.getElapsedTime()
    noisePlane.material.uniforms.uTime.value = elapsedTime

    //Rotating sphere dots
    galaxyGroup.children[0].rotation.y = elapsedTime * 0.1
    galaxyGroup.children[0].rotation.x = elapsedTime * 0.2

    //Move camera with cursor
    camera.position.x += (mouse.x / 5 - camera.position.x) / 10



    TWEEN.update()
    renderer.render(scene, camera)


    // if(clearRender === true){
    //     renderer.clear()
    // }else{
    //     renderer.render(scene, camera)
    // }

    startRender()
}
tick()


function checkWindowWidth(){
    // console.log('loaded');
    if(sizes.width < 380){
        const visible = document.querySelector('.overlay')
        visible.style.visibility = 'visible'
        clearRender = true
    }else{
        const visible = document.querySelector('.overlay')
        visible.style.visibility = 'hidden'
        clearRender = false
    }

    if(sizes.width < 680){
        const contactGroup = contactScene.getObjectByName('group')
        window.setTimeout(()=>{
            const contactText = contactScene.getObjectByName('text')
            contactText.scale.setScalar(0.9)
            const curvePoints = [
                new THREE.Vector3( 2, 0, -4 ),
                new THREE.Vector3( 2, 0, 0),
                new THREE.Vector3( -2, 0, 0 ),
                new THREE.Vector3( -2, 0, -4),
            ]
            const curve = new THREE.CatmullRomCurve3(curvePoints)
            curve.curveType = "centripetal"
            curve.closed = true
            flow.updateCurve(0, curve)
        }, 500)
        contactGroup.scale.setScalar(0.5)
        galaxyGroup.scale.setScalar(0.9)
        galaxyGroup.position.set(-1, 0, 0)

    }else{
        const contactGroup = contactScene.getObjectByName('group')
        window.setTimeout(()=>{
            const contactText = contactScene.getObjectByName('text')
            contactText.scale.setScalar(1)
            const curvePoints = [
                new THREE.Vector3( 3, 0, -6 ),
                new THREE.Vector3( 3, 0, 0),
                new THREE.Vector3( -3, 0, 0 ),
                new THREE.Vector3( -3, 0, -6),
            ]
            const curve = new THREE.CatmullRomCurve3(curvePoints)
            curve.curveType = "centripetal"
            curve.closed = true
            flow.updateCurve(0, curve)
        }, 500)
        contactGroup.scale.setScalar(1)
        galaxyGroup.scale.setScalar(1.2)
        galaxyGroup.position.set(1, 0, 0)
    }
}

window.onload = () =>{
    contactRender()
    checkWindowWidth()
}


function contactRender(){
    contactCanvas = document.querySelector(".app__contact-canvas")
    contactCanvasContainer = document.querySelector('.app__contact-wrapper')
    contactScene = new THREE.Scene()
    const contactGroup = new THREE.Group()
    contactGroup.name = 'group'
    contactScene.add(contactGroup)

    contactSizes = {
        width: contactCanvasContainer.clientWidth,
        height: contactCanvasContainer.clientHeight
    }

    contactCamera = new THREE.PerspectiveCamera(45, contactSizes.width / contactSizes.height, 0.1, 100)
    contactCamera.position.set(0, 0, 5)
    contactScene.add(contactCamera)

    contactRenderer = new THREE.WebGL1Renderer({
        canvas: contactCanvas,
        antialias: true,
        alpha: true
    })
    contactRenderer.setSize(contactSizes.width, contactSizes.height)
    contactRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    interactionManager = new InteractionManager(
        contactRenderer,
        contactCamera,
        contactCanvas
    )
    

    const directionalLight = new THREE.DirectionalLight(0xfff0dd, 0.2)
    directionalLight.position.set(0, 5, 10)
    contactScene.add(directionalLight)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
    contactScene.add(ambientLight)
    const pointLight = new THREE.PointLight(0x0000f9, 1, 8, 1)
    pointLight.position.set(0, 0, -3)
    contactGroup.add(pointLight)


    //CURVR POINT
    let curvePoints = [
        new THREE.Vector3( 3, 0, -6 ),
        new THREE.Vector3( 3, 0, 0),
        new THREE.Vector3( -3, 0, 0 ),
        new THREE.Vector3( -3, 0, -6),
    ]
    
    let curve = new THREE.CatmullRomCurve3(curvePoints)
    curve.curveType = "centripetal"
    curve.closed = true
    
    //TEXT
    const textColorStart = new THREE.Color('#b4bdff')
    const textColorEnd = new THREE.Color(0.52, 0, 1)
    fontLoader.load( './fonts/kontesa.json',(font)=>{
        const textGeometry = new TextGeometry('CONTACT ME', {
            font: font,
            size: 0.6,
            height: 0.24,
            curveSegments: 2,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 2,
        })
        textGeometry.rotateX(Math.PI)
        textGeometry.rotateY(Math.PI)
        textGeometry.center()
        const textMaterial = new THREE.MeshStandardMaterial({color: textColorStart})
        const text = new THREE.Mesh(textGeometry, textMaterial)
        // scene.add(text)
        flow = new InstancedFlow(2, 1, textGeometry, textMaterial )
        flow.updateCurve(0, curve)
        flow.name = 'flow'
        contactScene.add(flow.object3D)
        flow.object3D.name = 'text'
        const numberOfInstances = 2
        for(let i = 0; i < numberOfInstances; i++){
            // flow.setCurve(i, 0)
            flow.moveIndividualAlongCurve( i, i * 1 / numberOfInstances );
        }
        // group.scale.setScalar(1)
    })



    //Stars background

    const starsBackgroundGeometry = new THREE.PlaneBufferGeometry(2, 2)
    const starsBackgroundMaterial = new THREE.ShaderMaterial({
        depthTest: false,
        // depthWrite: false,
        precision: 'lowp',
        vertexShader: starsVertexShader,
        fragmentShader: starsFragmentShader,
        uniforms: {
            uTime: {value: 0},
            uCloudTexture: {value: textureLoader.load('textures/cloud.png',(txt) =>{})},
            uStoneTexture: {value: textureLoader.load('textures/stone.jpg',(txt) =>{})},
            uFogColor: {value: new THREE.Vector2(1, 1)}
        }
    })

    starsBackground = new THREE.Mesh(starsBackgroundGeometry, starsBackgroundMaterial)
    contactScene.add(starsBackground)


    
    //BLOB
    const oscilationStart = new THREE.Vector3(0.0,0.0,0.75)
    const oscilationEnd = new THREE.Vector3(0.3,0.0,0.65)
    const blobGeometry = new THREE.IcosahedronBufferGeometry(0.6, 64)
    const blobMaterial = new THREE.ShaderMaterial({
        precision: 'lowp',
        // wireframe: true,
        uniforms: {
            uTime: {value: 0},
            uTimeFrequency: {value: 0.2},
            uDistortionFrequency: {value: 1.6},
            uDistortionStrength: {value: 1.25},
            uDisplacementFrequency: {value: 2.6},
            uDisplacementStrength: {value: 0.15},
            uOscilation: {value: oscilationStart}
        },
        vertexShader: blobVertexShader,
        fragmentShader: blobFragmentShader,
    })
    blob = new THREE.Mesh(blobGeometry, blobMaterial)
    blob.name = 'blob'
    blob.scale.setScalar(3)
    blob.position.set(0, 0, -3)
    contactGroup.add(blob)

    interactionManager.add(blob)
    blob.addEventListener("mouseover",(event)=>{
        pointLight.intensity = 2
        document.body.style.cursor = "pointer";
        event.target.material.uniforms.uOscilation.value = oscilationEnd
        new TWEEN.Tween(event.target.scale).to(new THREE.Vector3(3.3, 3.3, 3.3), 500).easing(TWEEN.Easing.Cubic.Out).start()
        new TWEEN.Tween(starsBackgroundMaterial.uniforms.uFogColor.value).to(new THREE.Vector2(1.5, 0.8), 500).easing(TWEEN.Easing.Cubic.Out).start()
    })
    blob.addEventListener("mouseout",(event)=>{
        document.body.style.cursor = "default";
        pointLight.intensity = 1
        event.target.material.uniforms.uOscilation.value = oscilationStart
        new TWEEN.Tween(event.target.scale).to(new THREE.Vector3(3, 3, 3), 500).easing(TWEEN.Easing.Cubic.Out).start()
        new TWEEN.Tween(starsBackgroundMaterial.uniforms.uFogColor.value).to(new THREE.Vector2(1, 1), 500).easing(TWEEN.Easing.Cubic.Out).start()
    })
    blob.addEventListener("click",()=>{
        window.open('mailto:aiboldosonov@gmail.com?subject=question')
    })

    // contactScene.scale.setScalar(0.5)

    
    function start() {
        if (!requestId) {
           requestId = window.requestAnimationFrame(loop);
        }
    }

    
    function stop() {
        if (requestId) {
           window.cancelAnimationFrame(requestId);
           requestId = undefined;
        }
    }


    //Animate
    let requestId;
    const loop = ()=>{ 
        requestId = undefined;
        const elapsedTime = clock.getElapsedTime()
            //Text
            if(flow !== null){
                flow.moveAlongCurve( -0.002 )
            }
        
            TWEEN.update()
            contactRenderer.render(contactScene, contactCamera)
            interactionManager.update()

            // window.requestAnimationFrame(loop)
           
            // if(contactRenderer){
            //     if(clearContactRender === true){
            //         contactRenderer.clear()
            //         window.cancelAnimationFrame(clearContactRender)
            //     }else if(clearContactRender === false){
            //         // interactionManager.update()
            //         // window.requestAnimationFrame(animate)
            //         // contactRenderer.render(contactScene, contactCamera)
            //     }
            // }


            // if(blob){
                blob.material.uniforms.uTime.value = elapsedTime
            // }
        
            // if(starsBackground){
                starsBackground.material.uniforms.uTime.value = elapsedTime * 1.5
            // }
        start()
    }
    loop()


    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.01
    }
    
    const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                clearRender = false
                startRender()
            } else {
                clearRender = true
                stopRender()
            }
          });
    }, options)
    const contactObserver = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                clearContactRender = false
                start()
            } else {
                clearContactRender = true
                stop()
            }
          });
    }, options)
    contactObserver.observe(contactCanvas)
    observer.observe(canvas)
}

