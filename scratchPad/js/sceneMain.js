class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        //load our images or sounds
        this.load.image("face", "images/face.png");
        this.load.spritesheet('boy', 'images/boy.png', { frameWidth: 120, frameHeight: 200 });
        this.load.audio('cat', ['audio/meow.mp3', 'audio/meow.ogg']);

    }
    create() {
        // define our objects

        this.face = this.add.image(0, 0, "face"); // middle of sprite will be placed on the xy coordinates
        this.face.setOrigin(0,0); //adjusts sprite sides to the xy coordinates

        this.face.x = this.game.config.width/2;
        this.face.y = this.game.config.height/2; //centers picture
        this.face.alpha = .5; // between 0 and 10 trancparency
        this.face.angle = 45; //rotates image by 45°
        this.face.scaleX =.5;
        this.face.scaleY =.5; //X and Y % size changes
        this.face.displayWidth = 100;
        this.face.displayHeight = 100; //exact width and height changes

        this.face.setInteractive();
        this.face.on('pointerdown', this.onDown, this);
        this.face.on('pointerup', this.onUp, this);

        this.char = this.add.sprite(this.game.config.width/2, this.game.config.height/2, "boy");

        var frameNames= this.anims.generateFrameNumbers('boy');

        this.anims.create({
            key: 'walk',
            frames: frameNames,
            frameRate: 8,
            repeat: -1 //how many times repeat the loop. -1 stands for forever
        });

        this.char.play("walk");
        this.doWalk();

        var textConfig={fontFamily: 'Major Mono Display', fontSize: '40px', color: '#ff0000'}
        this.text1 = this.add.text(this.game.config.width/2, this.game.config.height/2, "HELLO!", textConfig);
        this.text1.setOrigin( 0.5, 0.5);


        this.graphics=this.add.graphics();
        this.graphics.lineStyle(8, 0xffffff);
        this.graphics.moveTo(100, 500);
        this.graphics.lineTo(400, 500);
        this.graphics.strokePath();
        this.graphics.strokeRect(100, 600, 100, 15);
        this.graphics.strokeCircle(35, 35, 30);
        //if you define fillStyle you can get filled elements too (eg. fillCircle)

        this.catSound=this.sound.add('cat');
        this.catSound.play();
    }

    doWalk(){
        this.tweens.add({
            targets: this.char,
            duration: 3000,
            x:this.game.config.width,
            y:0,
            alpha:0,
            onComplete: this.onCompleteHandler.bind(this),
            onCompleteParams: [this]});
        //this line sets the exact milliseconds to move the character across the screen. [kb áttűnés megfelelője]

    }

    onCompleteHandler(tween, targets, custom){
        var char = targets[0];
        char.x = 0;
        char.y = this.game.config.height/2;
        char.alpha = 1;
        this.doWalk();
    }

    onDown(){
        this.face.alpha=1;
    }

    onUp(){
        this.face.alpha=.5;
    }

    update() {
        //constant running loop
        this.char.x++;
        if (this.char.x>this.game.config.width){
            this.char.x = 0;
        }

    }

}