class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        this.load.image("button1", "images/ui/buttons/round1.png");
        this.load.image("button2", "images/ui/buttons/round5.png");
        this.load.audio('cat', ["audio/meow.mp3", "audio/meow.ogg "])
        this.load.audio('backgroundMusic', ["audio/background.mp3"]);
        //load our images or sounds

        this.load.image("toggleBack", "images/ui/toggles/2.png");
        this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
        this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
        this.load.image("musicOn", "images/ui/icons/music_on.png");
        this.load.image("musicOff", "images/ui/icons/music_off.png");

    }
    create() {
        // define oour objects
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        var mediaManager = new MediaManager({scene: this});

        mediaManager.setBackgroundMusic('backgroundMusic');

        var fireText = {color: 'black ', fontSize: 30}
        var flatButton = new FlatButton({scene:this, key:'button1', text:'Fire!', x:240, y:100, event: "button_pressed", params: "fire_lasers", textConfig: fireText});
        var flatButton = new FlatButton({scene:this, key:'button2', text:'Destroy!', x:240, y:300, event: "button_pressed", params: "self_destruct"});

        var toggleButton = new ToggleButton({scene: this, backKey: 'toggleBack', onIcon: 'musicOn' ,offIcon: 'musicOff', event: G.TOGGLE_MUSIC, x:240, y:450});

        emitter.on('button_pressed', this.buttonPressed, this);
    }

    buttonPressed(params){
        model.musicOn = !model.musicOn;
        //emitter.emit(G.PLAY_SOUND, 'cat');
        //this.scene.start("SceneOver");
    }
    update() {
        //constant running loop
    }

    customFunctions(){

    }
}