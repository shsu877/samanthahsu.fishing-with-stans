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
      this.load.audio('oceanM', 'assets/ocean.mp3');
      this.load.audio('creakM', 'assets/wood-creak.mp3');

    }

    create() {
      var musicConfig = {
        mute: false,
        volume: 0.5,
        loop: true
      }
      var img = this.add.image(0, 0, 'startBG').setOrigin(0, 0);
      var ocean = this.sound.add('oceanM', musicConfig);
      ocean.play();
      var creak = this.sound.add('creakM', musicConfig);
      creak.play();

      this.input.on('pointerdown', function(pointer) 
      {
        ocean.stop();
        creak.stop();
        this.scene.start("SceneCutsceneStart"); 
      }, this); 
    }
  }