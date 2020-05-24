var secretTextStyle = { font: '20px Courier', fill: '#white' };
const secretTextX = 320/2 - 40;
const secretTextY = 480/2;
const secretText1 = "HE BANNED";
const secretText2 = "MY PREFERRED";
const secretText3 = "SHAVING METHOD!";

var background_music;

class SceneMainMenu extends Phaser.Scene {
    constructor() {      
      super({ key: "SceneMainMenu" });
    }
  
    preload() {
      this.load.image('startBG', 'assets/start.png');
      // this.load.audio('bgm', 'assets/bonnie.mp3');
    }

    create() {
      var img = this.add.image(0,0,'startBG').setOrigin(0, 0);
      // var bgm = this.sound.add('bgm', {volume: 0.25, loop: true,}).play();
      // bgm.setRate(0.5);

      // this.game.sound.setDecodeCallback([ background_music], start, this);
      this.input.on('pointerdown', function(pointer) 
      {
        this.scene.start("SceneCutsceneStart"); 
      }, this); 
    }
  }