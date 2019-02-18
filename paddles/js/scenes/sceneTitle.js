
class SceneTitle extends Phaser.Scene {
    constructor(){
        super('SceneTitle'); //sets SceneTitle to key of phaser.scene obj
    }
    preload(){
        this.load.image("title", "images/title.png");
        this.load.image("button1", "images/ui/buttons/round1.png");
        this.load.image("button2", "images/ui/buttons/round5.png");
    }
    create(){
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this})
        //this.alignGrid.showNumbers();

        var title = this.add.image(0,0, 'title');
        Align.scaleToGameW(title, .8);
        this.alignGrid.placeAtIndex(38, title);

        var btnStart= new FlatButton({scene: this, key: 'button1', text: 'Start', event: 'start_game'});
        this.alignGrid.placeAtIndex(93, btnStart);

        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        this.ball = this.physics.add.sprite(this.centerX, this.centerY, 'balls');
        Align.scaleToGameW(this.ball, .05);
        this.ball.body.setBounce(0, 1);
        this.ball.body.setVelocity(0, 100);
        this.ball.body.collideWorldBounds = true;

        emitter.on('start_game', this.startGame, this);
    }

    startGame(){
        this.scene.start("SceneMain");
    }

    update(){

    }
}