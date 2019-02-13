class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        this.load.image("button1", "images/buttons/round1.png");
        this.load.image("button2", "images/buttons/round5.png");
        //load our images or sounds
    }
    create() {
        // define oour objects

        var fireText = {color: 'black ', fontSize: 30}
        var flatButton = new FlatButton({scene:this, key:'button1', text:'Fire!', x:240, y:100, event: "button_pressed", params: "fire_lasers", textConfig: fireText});
        var flatButton = new FlatButton({scene:this, key:'button2', text:'Destroy!', x:240, y:300, event: "button_pressed", params: "self_destruct"});

        emitter.on('button_pressed', this.buttonPressed, this);
    }

    buttonPressed(params){
        console.log(params)
        this.scene.start("SceneOver");
    }
    update() {
        //constant running loop
    }

    customFunctions(){

    }
}