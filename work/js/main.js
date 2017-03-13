/**
 * Created by hanshiqiang1 on 2017/2/21.
 */
var scene, camera, renderer,container;
var ww = window.innerWidth;
var wh = window.innerHeight;
var aspect = ww / wh;
function initThree() {
    // 创建场景
    scene = new THREE.Scene();
    // 创建相机
    camera = new THREE.PerspectiveCamera(70, aspect, 1, 2000);
    camera.position.set(0, 0, 100);
    // 创建渲染器（WebGL渲染器）
//        renderer = new THREE.WebGLRenderer({antialias: true,alpha: true});
    renderer = new THREE.WebGLRenderer({alpha:true});//alhpa:true 才能显示背景图片
//        renderer.setClearColor(0xffffff, 0);
    renderer.setSize(ww, wh);
    container=document.getElementById('container');
//        console.log(container);
    container.appendChild(renderer.domElement);

    createPointLight();
//        createDireLight();
}
// 创建点光源 需要照亮场景
function createPointLight() {
    var light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(50, 50, 50);
    scene.add(light);
}

// 创建方向光 金属感强烈
/*function createDireLight() {
 var direLight = new THREE.DirectionalLight(0xffe502, 1000);
 direLight.position.set(0, 500, 0);
 direLight.castShadow = true;
 scene.add(direLight);
 }*/

// 执行动画
function animate() {
//        TWEEN.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}
var texts='Empathink';

// 创建文字
function createText() {
//        var text = new THREE.FontLoader().load('font/helvetiker_regular.typeface.json', function(text) {
    var text = new THREE.FontLoader().load('font/helvetiker_bold.typeface.json', function(text) {
//        var text = new THREE.FontLoader().load('font/optimer_bold.typeface.json', function(text) {
//        var text = new THREE.FontLoader().load('font/gentilis_bold.typeface.json', function(text) {
//        var text = new THREE.FontLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/droid_sans_bold.typeface.js', function(text) {
        var gem = new THREE.TextGeometry( texts,{
            size: 10, //字号大小，一般为大写字母的高度
            height: 2, //文字的厚度
            weight: 'normal', //值为'normal'或'bold'，表示是否加粗
            font: text, //字体，默认是'helvetiker'，需对应引用的字体文件
            style: 'normal', //值为'normal'或'italics'，表示是否斜体
            bevelThickness: 0, //倒角厚度
            bevelSize: 0, //倒角宽度
            curveSegments: 16,//弧线分段数，使得文字的曲线更加光滑
            bevelEnabled: false//e布尔值，是否使用倒角，意为在边缘处斜切
        });
        console.log(gem.children)
        gem.center();//文字放中央
//            console.log(gem.faces[3]);
//            console.log(gem.faces[3].vertexNormals[3]);
        var mat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 30,
            shading: THREE.FlatShading
        });
        var textObj = new THREE.Mesh(gem, mat);
        textObj.castShadow = true;
        scene.add(textObj);
//            new TWEEN.Tween(textObj.rotation).to({y: Math.PI * 2}, 2000).repeat(Infinity).yoyo(true).start();
    });
}
// start
function threeStart() {
    initThree();
    createText();
    animate();
}
// resize
function onResize() {
    ww = window.innerWidth;
    wh = window.innerHeight;
    renderer.setSize(ww, wh);
    camera.aspect=ww / wh;
    camera.updateProjectionMatrix();//更新相机投影矩阵，必须在参数发生变化条用

}
window.addEventListener('load', threeStart, false);
window.addEventListener('resize', onResize, false);