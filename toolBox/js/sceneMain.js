class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        //load our images or sounds
    }
    create() {
        // define oour objects
        var gridConfig={rows:5, cols:5, scene:this};
        var alignGrid = new AlignGrid(gridConfig);
        alignGrid.showNumbers();

        this.face = this.add.sprite(0, 0, "face");
        alignGrid.placeAtIndex(16, this.face);
    }
    update() {
        //constant running loop
    }

    customFunctions(){

    }
}