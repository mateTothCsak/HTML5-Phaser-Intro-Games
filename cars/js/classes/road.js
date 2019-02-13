class Road extends Phaser.GameObjects.Container {

    constructor(config){
        super(config.scene);
        this.scene = config.scene;
        this.back=this.scene.add.image(0, 0, "road");
        this.add(this.back); //back stands for the road background
        this.scene.add.existing(this);

        Align.scaleToGameW(this.back, .5);

        this.setSize(this.back.displayWidth, game.config.height);
        this.lineGroup = this.scene.add.group();
        //you cannot call makeLines here, because ie. X is not set of the road
        // functions working with variables shouldn't be called in the contructor
        this.count=0;
        //add car
        this.car = this.scene.add.sprite( this.displayWidth/4, game.config.height*.9, "cars");
        Align.scaleToGameW(this.car, .1);
        this.add(this.car);

        //add click
        this.back.setInteractive();
        this.back.on('pointerdown', this.changeLanes, this);

        this.addObject();
    }



    changeLanes(){
        if(this.car.x > 0) {
            this.car.x = -this.displayWidth/4;
        } else {
            this.car.x = this.displayWidth/4;
        }
    }

    makeLines(){
        console.log(this);
        this.vSpace=this.displayHeight/10;
        for (var i = 0; i<100; i++){
            var line = this.scene.add.image(this.x, this.vSpace*i-20, "line");
            line.originalY = line.y;
            this.lineGroup.add(line);
        }
    }

    moveLines(){
        this.lineGroup.children.iterate(function(child){
            child.y += this.vSpace/20;
        }.bind(this)); // with bind this the keyword this will refer to the road, not the group
        this.count++;
        if(this.count==20){
            this.count=0;
            this.lineGroup.children.iterate(function(child){
                child.y = child.originalY;
            }.bind(this));
        }
    }

    addObject(){
        var objs = [{key: 'pcar1', speed: 10, scale:10},
                    {key: 'pcar2', speed: 10, scale:10},
                    {key: 'cone', speed: 20, scale:5},
                    {key: 'barrier', speed: 20, scale:8}];
        var index = Math.floor(Math.random()*4);
        var key = objs[index].key;
        var speed = objs[index].speed;
        var scale = objs[index].scale/100;

        this.object=this.scene.add.sprite(-this.displayWidth/4, -50, key);
        this.object.speed=speed;

        var lane = Math.random()*100;
        if(lane < 50){
            this.object.x = this.displayWidth / 4;
        }
        Align.scaleToGameW(this.object, scale);
        this.add(this.object)
    }

    moveObject(){
        this.object.y += this.vSpace / this.object.speed;
        if (Collision.checkCollide(this.car, this.object) == true){
            this.car.alpha= .5;
        }
        if (this.object.y > game.config.height){
            emitter.emit(G.UP_POINTS, 1);
            this.object.destroy();
            this.addObject();

        }
    }
}

    // container = a collection of objects that  you treat as a single object