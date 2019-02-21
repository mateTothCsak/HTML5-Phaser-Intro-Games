
var game;
var model;
var emitter;
var G;
var controller;
var mediaManager;

window.onload = function(){
    var isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }

    //isMobile == -1 -> Laptop or Desktop
    if (isMobile == -1) {
        var config = {
            type: Phaser.AUTO,
            width: 480,
            height: 640,
            parent: 'phaser-game ',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            scene: [SceneLoad, SceneMain, SceneTitle, SceneOver]
        };
    } else {
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            scene: [SceneLoad, SceneMain, SceneTitle, SceneOver]
        };
    }

    G = new Constants();
    model = new Model()
    model.isMobile = isMobile;
    game = new Phaser.Game(config);
}