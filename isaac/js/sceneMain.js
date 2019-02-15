class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {

        this.load.image("apple", "images/apple.png");

    }

    create(){
        this.add.sprite(240, 300, apple);
    }

    update() {

    }

}