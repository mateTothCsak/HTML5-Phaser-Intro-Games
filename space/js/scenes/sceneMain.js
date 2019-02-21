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



        this.shields = 100;
        this.eshields = 100;
        model.playerWon = true;

        this.centerX = game.config.width / 2;
        this.centerY = game.config.height / 2;

        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);
        this.ship = this.physics.add.sprite(this.centerX, this.centerY, 'ship');
        Align.scaleToGameW(this.ship, .125);

        this.background.scaleX = this.ship.scaleX;
        this.background.scaleY = this.ship.scaleY;

        this.physics.world.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);


        this.background.setInteractive();
        this.background.on('pointerup', this.backgroundClicked, this);
        this.background.on('pointerdown', this.onDown, this);

        this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
        this.cameras.main.startFollow(this.ship, true);

        this.bulletGroup = this.physics.add.group();
        this.ebulletGroup = this.physics.add.group();
        this.rockGroup = this.physics.add.group();
        this.makeRocks();

        

        //in case only a group is added as parameter all of its members will collide with each other



        this.eship = this.physics.add.sprite(this.centerX, 0, 'eship');
        Align.scaleToGameW(this.eship, .25);
        this.eship.body.collideWorldBounds = true;
        this.ship.body.collideWorldBounds = true;

        this.makeInfo();

        this.setColliders();

        // var sb = new SoundButtons({scene: this});

    }

    makeRocks(){
        if(this.rockGroup.getChildren().length==0){
            this.rockGroup = this.physics.add.group({
                key: 'rocks',
                frame: [0, 1, 2],
                frameQuantity: 4,
                bounceX: 1,
                bounceY: 1,
                angularVelocity: 1,
                collideWorldBounds: true
            });
            this.rockGroup.children.iterate(function (child) {
                var xx = Math.floor(Math.random() * this.background.displayWidth);
                var yy = Math.floor(Math.random() * this.background.displayHeight);
                child.x = xx;
                child.y = yy;
                Align.scaleToGameW(child, 0.1);

                var vx = Math.floor(Math.random()*2)-1;   //velocities
                var vy = Math.floor(Math.random()*2)-1;
                if (vx == 0 && vy == 0){
                    vx = 1;
                    vy = 1;
                }
                var speed = Math.floor(Math.random()*200) +10;
                child.body.setVelocity(vx*speed, vy*speed);

            }.bind(this));
            this.setRockColliders();
        }
    }



    setColliders(){
        this.physics.add.collider(this.bulletGroup, this.eship, this.damageEnemy, null, this);
        this.physics.add.collider(this.ebulletGroup, this.ship, this.damagePlayer, null, this);
    }

    setRockColliders(){
        this.physics.add.collider(this.rockGroup);
        this.physics.add.collider(this.bulletGroup, this.rockGroup, this.destroyRock, null, this);
        this.physics.add.collider(this.ebulletGroup, this.rockGroup, this.destroyRock, null, this);
        this.physics.add.collider(this.rockGroup, this.ship, this.rockHitPlayer, null, this);
        this.physics.add.collider(this.rockGroup, this.eship, this.rockHitEnemy, null, this);
    }

    makeInfo(){
        this.text1 = this.add.text(0, 0, "Shields \n100", {fontSize: game.config.width/30, align: "center", backgroundColor: '#000000'});
        this.text2 = this.add.text(0, 0, "Enemy Shields \n100", {fontSize: game.config.width/30, align: "center", backgroundColor: '#000000'});

        this.text1.setOrigin(0.5, 0.5);
        this.text2.setOrigin(0.5, 0.5);

        this.uiGrid = new AlignGrid({scene:this, rows: 11, cols: 11});

        this.uiGrid.placeAtIndex(2, this.text1);
        this.uiGrid.placeAtIndex(9, this.text2);

        this.icon1 = this.add.image(0, 0, "ship");
        this.icon2 = this.add.image(0, 0, "eship");
        Align.scaleToGameW(this.icon1, .05);
        Align.scaleToGameW(this.icon2, .05);

        this.icon1.angle = 270;
        this.icon2.angle = 270;

        this.uiGrid.placeAtIndex(1, this.icon1);
        this.uiGrid.placeAtIndex(7, this.icon2);

        this.text1.setScrollFactor(0);
        this.text2.setScrollFactor(0);
        this.icon1.setScrollFactor(0);
        this.icon2.setScrollFactor(0);
    }

    downPlayer(){
        this.shields--;
        this.text1.setText("Shields\n" + this.shields);
        if (this.shields == 0){
            model.playerWon = false;
            this.scene.start("SceneOver");
        }
    }

    downEnemy(){
        this.eshields--;
        this.text2.setText("Enemy Shields\n" + this.eshields);
        if (this.eshields == 0){
            model.playerWon = true;
            this.scene.start("SceneOver");
        }
    }


    rockHitPlayer(ship, rock){
        var explosion = this.add.sprite(rock.x,  rock.y, 'exp');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND, "explode");
        rock.destroy();
        this.downPlayer();
        this.makeRocks();
    }

    rockHitEnemy(ship, rock){
        var explosion = this.add.sprite(rock.x,  rock.y, 'exp');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND, "explode");
        rock.destroy();
        this.downEnemy();
        this.makeRocks();
    }

    damageEnemy(ship, bullet){
        var explosion = this.add.sprite(bullet.x, bullet.y, 'exp');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND, "explode");
        bullet.destroy();
        var angle2 = this.physics.moveTo(this.eship, this.ship.x, this.ship.y, 100);
        this.eship.angle = this.toDegrees(angle2);
        this.downEnemy();
    }

    damagePlayer(ship, bullet){
        var explosion = this.add.sprite(this.ship.x, this.ship.y, 'exp');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND, "explode");
        bullet.destroy();
        this.downPlayer();
    }

    destroyRock(bullet, rock){
       bullet.destroy();
       var explosion = this.add.sprite(rock.x,  rock.y, 'exp');
       explosion.play('boom');
        emitter.emit(G.PLAY_SOUND, "explode");
        rock.destroy();
          this.makeRocks();
    }


    getTimer(){
        var d = new Date();
        return d.getTime();
    }

    onDown(){
        this.downTime = this.getTimer();
    }

    backgroundClicked(){
        var elapsed = Math.abs(this.downTime-this.getTimer());
        if (elapsed < 200) {
            this.tx = this.background.input.localX * this.background.scaleX;
            this.ty = this.background.input.localY * this.background.scaleY;

            var angle = this.physics.moveTo(this.ship, this.tx, this.ty, 100);
            this.ship.angle = this.toDegrees(angle);


            var distX2 = Math.abs(this.ship.x - this.tx);
            var distY2 = Math.abs(this.ship.y - this.ty);
            if (distX2 > 30 && distY2 > 30){
                var angle2 = this.physics.moveTo(this.eship, this.ship.x, this.ship.y, 60);
                this.eship.angle = this.toDegrees(angle2);
            }
        } else {
            this.makeBullet();
        }


    }

    toDegrees(angle){
        return angle * (180 / Math.PI);
    }

    fireEBullet(){
        var elapsed = Math.abs(this.lastEbullet-this.getTimer());
        if (elapsed < 500){
            return;
        }
        this.lastEbullet = this.getTimer();
        var ebullet = this.physics.add.sprite(this.eship.x,
                                              this.eship.y,
                                              'ebullet');


        this.ebulletGroup.add(ebullet);

        ebullet.body.angularVelocity = 10;
        this.physics.moveTo(ebullet, this.ship.x, this.ship.y, 100);
        emitter.emit(G.PLAY_SOUND, "enemyShoot");

    }

    getDirFromAngle(angle){
       var rads=angle*Math.PI/180;
       var tx = Math.cos(rads);
       var ty = Math.sin(rads);
       return {tx,ty}
      }

    makeBullet(){
        var dirObj = this.getDirFromAngle(this.ship.angle);
        var bullet = this.physics.add.sprite(this.ship.x + dirObj.tx * 30,
                                             this.ship.y + dirObj.ty * 30,
                                             'bullet');
        this.bulletGroup.add(bullet);
        bullet.angle = this.ship.angle;
        bullet.body.setVelocity(dirObj.tx * 200, dirObj.ty * 200);
        emitter.emit(G.PLAY_SOUND, "laser");
    }


    update(){

        if (this.ship && this.eship) {

            var distX = Math.abs(this.ship.x - this.tx);
            var distY = Math.abs(this.ship.y - this.ty);
            if (distX < 10 && distY < 10) {
                if(this.ship.body) {
                    this.ship.body.setVelocity(0, 0);
                }
            }

            var distX2 = Math.abs(this.ship.x - this.eship.x);
            var distY2 = Math.abs(this.ship.y - this.eship.y);
            if (distX2 < game.config.width / 5 && distY2 < game.config.height / 5) {
                this.fireEBullet();
            }
        }
    }


}