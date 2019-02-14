class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {


    }
    create() {
        // define oour objects
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        var mediaManager = new MediaManager({scene: this});

        mediaManager.setBackgroundMusic('backgroundMusic');

        var sb = new SoundButtons({scene: this});

        var bar = new Bar({scene: this, x: 240, y: 320});
        bar.setPercent(.5);

    }

    update() {
        //constant running loop
    }

    customFunctions(){

    }
}