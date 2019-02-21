
class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }

    preload(){

        this.bar = new Bar({scene: this, x: game.config.width/2, y: game.config.height/2});
        this.progText = this.add.text(game.config.width/2, game.config.height/2, "0%", {color: '#ffffff', fontSize: game.config.width/20});
        this.progText.setOrigin(0.5, 0.5);
        this.load.on('progress', this.onProgress, this);
        this.load.image("title", "images/player/title.png");

        this.load.image("button1", "images/ui/buttons/round1.png");
        this.load.image("button2", "images/ui/buttons/round5.png");
        //this.load.audio('cat', ["audio/meow.mp3", "audio/meow.ogg "])
        //this.load.audio('backgroundMusic', ["audio/background.mp3"]);
        //load our images or sounds

        this.load.audio('explode',["audio/explode.wav", "audio/explode.ogg"]);
        this.load.audio('enemyShoot',["audio/enemyShoot.wav", "audio/enemyShoot.ogg"]);
        this.load.audio('laser',["audio/laser.wav", "audio/laser.ogg"]);
        this.load.audio('backgroundMusic',["audio/background.mp3", "audio/background.ogg"]);

        this.load.image("toggleBack", "images/ui/toggles/2.png");
        this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
        this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
        this.load.image("musicOn", "images/ui/icons/music_on.png");
        this.load.image("musicOff", "images/ui/icons/music_off.png");

        this.load.image("ship", "images/player/player.png");
        this.load.image("eship", "images/player/eship.png")
        this.load.image("background", "images/player/background.jpg")
        this.load.image("bullet", "images/player/bullet.png");
        this.load.image("ebullet", "images/player/ebullet.png");


        this.load.spritesheet('rocks', 'images/player/rocks.png', {frameWidth: 128, frameHeight: 100 })
        this.load.spritesheet('exp', 'images/player/exp.png', {frameWidth: 64, frameHeight: 64})

  }

    onProgress(value){
        console.log(value);
        this.bar.setPercent(value);
        var per = Math.floor(value*100)
        this.progText.setText(per);
    }

    create(){
        var frameNames = this.anims.generateFrameNumbers('exp');
        var f2 = frameNames.slice();
        f2.reverse();
        var f3 = f2.concat(frameNames);

        this.anims.create({
            key: 'boom',
            frames: f3,
            frameRate: 48,
            repeat: false
        });


        this.scene.start("SceneTitle");
    }
}

