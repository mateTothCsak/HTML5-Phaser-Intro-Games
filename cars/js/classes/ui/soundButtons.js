

class SoundButtons{

    constructor(config){
        this.scene = config.scene;

        this.musicButton = new ToggleButton({scene: this.scene, backKey: 'toggleBack', onIcon: 'musicOn' ,offIcon: 'musicOff', event: G.TOGGLE_MUSIC});
        this.sfxButton = new ToggleButton({scene: this.scene, backKey: 'toggleBack', onIcon: 'sfxOn' ,offIcon: 'sfxOff', event: G.TOGGLE_SOUND, x:240, y:450});
/*
        this.add(this.musicButton);
        this.add(this.sfxButton);
*/
        this.musicButton.y = this.musicButton.height/2;
        this.musicButton.x = this.musicButton.width/2;

        this.sfxButton.y = this.musicButton.y;
        this.sfxButton.x = game.config.width-this.sfxButton.width/2;

        if(model.musicOn == false){
            this.musicButton.toggle();
        }
        if(model.soundOn == false){
            this.sfxButton.toggle();
        }
    }
}