

class FlatButton extends Phaser.GameObjects.Container{
    constructor(config){
        if(!config.scene){
            console.log("missing scene!");
            return;
        }
        if(!config.key){
            console.log("missing key!");
            return;
        }

        super(config.scene);

        this.config = config;
        this.scene = config.scene;
        this.backGround = this.scene.add.image(0,0, config.key);

        this.add(this.backGround);
        if (config.text) {
            if(config.textConfig){
                this.text1 = this.scene.add.text(0, 0, config.text, config.textConfig);
            } else {
                this.text1 = this.scene.add.text(0, 0, config.text);
            }
            this.text1.setOrigin(0.5, 0.5);
            this.add(this.text1);
        }

        if(config.x){
            this.x = config.x;
        }
        if(config.y){
            this.y = config.y;
        }

        this.scene.add.existing(this);

        if (config.event){
            this.backGround.setInteractive();
            this.backGround.on('pointerdown', this.pressed, this);
        }

        if (model.isMobile == -1){
            this.backGround.on("pointerover", this.over, this);
            this.backGround.on("pointerout", this.out, this);
        }
    }

    over(){
        this.alpha = .9;
    }

    out(){
        this.alpha = 1;
    }

    pressed(){
        if(this.config.params){
            emitter.emit(this.config.event, this.config.params);
        }else {
            emitter.emit(this.config.event);
        }
    }
}