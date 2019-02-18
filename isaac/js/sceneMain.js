class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {

        this.load.image("apple", "images/apple.png");
        this.load.image("ground", "images/ground.png")

    }

    create(){
        this.apple = this.physics.add.sprite(240, 300, 'apple');
        this.apple.setGravityY(200);

        this.ground = this.physics.add.sprite(240, 600, 'ground');
        this.ground.setImmovable();
        this.physics.add.collider(this.apple, this.ground);
        this.apple.setBounce(0, .5);
        this.apple.setInteractive();
        this.apple.on('pointerdown', this.moveApple, this);
    }

    moveApple(){
        this.apple.setVelocity(0, -200);
    }

    update() {

    }

}