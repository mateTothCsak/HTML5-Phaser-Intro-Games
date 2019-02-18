class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {

    }
    create() {
        // define oour objects
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        var mediaManager = new MediaManager({scene: this});

        mediaManager.setBackgroundMusic('backgroundMusic');

        var sb = new SoundButtons({scene: this});

        this.flipSound = this.sound.add("flip");
        this.hitSound = this.sound.add("hit");
        this.loseSound = this.sound.add("lose");

        this.velocity = 100;
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;
        this.quarter = game.config.height/4;
        this.pMove = game.config.height/32;
        model.score = 0;

        this.bar = this.add.image(this.centerX, this.centerY, 'bar');
        this.bar.displayWidth = game.config.width/3;
        this.bar.displayHeight = game.config.height;

        this.ball = this.physics.add.sprite(this.centerX, this.centerY, 'balls');
        Align.scaleToGameW(this.ball, .05);

        this.paddle1 = this.physics.add.sprite(this.centerX, this.quarter, 'paddle');
        Align.scaleToGameW(this.paddle1, .25);
        this.pScale = this.paddle1.scaleX;


        this.paddle2 = this.physics.add.sprite(this.centerX, this.quarter*3, 'paddle');
        Align.scaleToGameW(this.paddle2, .25);


        var scoreBox = new ScoreBox({scene : this});
        this.aGrid = new AlignGrid({scene: this, rows:11, cols: 11});
        this.aGrid.placeAtIndex(5, scoreBox);

        this.setBallColor();
        this.ball.setVelocity(0, this.velocity);
        this.paddle1.setImmovable();
        this.paddle2.setImmovable();
        this.physics.add.collider(this.ball, this.paddle1, this.ballHit, null, this);
        this.physics.add.collider(this.ball, this.paddle2, this.ballHit, null, this);
        this.input.on('pointerdown', this.changePaddle, this);
        this.input.on('pointerup', this.onUp, this);
    }

    changePaddle(pointer){
        var paddle = (this.velocity>0) ? this.paddle2 : this. paddle1;
        var scene = this;
        this.tweens.add({targets: paddle,
                        duration: 250,
                        scaleX: 0,
                        onComplete: this.onCompleteHandler,
                        onCompleteParams: [{scope: this, paddle:paddle, scene: scene }]
        });
        this.downY = pointer.y;

        this.flipSound.play();
    }

    onCompleteHandler(tween, targets, custom){
        var paddle = custom.paddle;
        custom.scene.tweens.add({
            targets: paddle,
            duration: 250,
            scaleX: custom.scope.pScale
        });
        var color = (paddle.frame.name == 1) ? 0 : 1;
        paddle.setFrame(color);
    }

    onUp(pointer){
        var diffY = Math.abs(pointer.y - this.downY);
        if (diffY > 300){
            //move paddle back
            this.tweens.add({targets : this.paddle1, duration: 1000, y: this.quarter});
            this.tweens.add({targets : this.paddle2, duration: 1000, y: this.quarter*3});
        }
    }

    setBallColor(){
        var r = Math.floor(Math.random()*100);
        if (r < 50){
            this.ball.setFrame(0);
        } else {
            this.ball.setFrame(1);
        }
    }

    doOver() {
        this.scene.start("SceneOver");
    }

    ballHit(ball, paddle){
        var distY = Math.abs(this.paddle1.y - this.paddle2.y);

        this.velocity = - this.velocity;
        this.velocity *= 1.05;
        this.hitSound.play();
        if (ball.frame.name == paddle.frame.name) {
            var points = 1;
            if(distY < game.config.height/3){
                points = 2;
            }
            if (distY < game.config.height/4){
                points = 3;
            }
            emitter.emit(G.UP_POINTS, points);
        } else {
            this.loseSound.play();
            this.time.addEvent({ delay: 1000,
                                    callback: this.doOver,
                                    callbackScope: this,
                                    loop: false
            });
            return;
        }
        this.setBallColor();
        ball.setVelocity(0, this.velocity);
        var targetY = 0;
        this.setBallColor();
        if (distY > game.config.height/5){
            if(paddle.y > this.centerY){
                targetY = paddle.y - this.pMove;
            } else {
                targetY = paddle.y + this.pMove;
            }
            this.tweens.add({targets : paddle, duration: 1000, y: targetY});
        }
    }


    update() {
        //constant running loop
    }

    customFunctions(){

    }
}