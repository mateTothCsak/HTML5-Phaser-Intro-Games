
class SceneTitle extends Phaser.Scene {
    constructor(){
        super('SceneTitle'); //sets SceneTitle to key of phaser.scene obj
    }
    preload(){

    }
    create(){
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();


        this.add.image(0,0, "background").setOrigin(0.5, 0.5);

        this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this})
        //this.alignGrid.showNumbers();

        var title = this.add.image(0,0, 'title');
        Align.scaleToGameW(title, .8);
        this.alignGrid.placeAtIndex(27, title);

        var ship = this.add.image(0, 0, "ship");
        this.alignGrid.placeAtIndex(60, ship);
        Align.scaleToGameW(ship, .125);



        var btnStart= new FlatButton({scene: this, key: 'button1', text: 'Start', event: 'start_game'});
        this.alignGrid.placeAtIndex(104, btnStart);


        emitter.on('start_game', this.startGame, this);
    }

    startGame(){
        this.scene.start("SceneMain");
    }

    update(){

    }
}