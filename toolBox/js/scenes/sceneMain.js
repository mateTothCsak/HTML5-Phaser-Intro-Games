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


    }

    update() {
        //constant running loop
    }

    customFunctions(){

    }
}