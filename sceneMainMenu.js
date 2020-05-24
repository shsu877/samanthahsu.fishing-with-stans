class SceneMainMenu extends Phaser.Scene {
    constructor() {      
      super({ key: "SceneMainMenu" });
    }
  
    preload() {
      this.load.image('startBG', 'assets/start.png');
    }

    create() {
      var img = this.add.image(0,0,'startBG').setOrigin(0, 0);

      this.input.on('pointerdown', function(pointer) 
      {
        this.scene.start("SceneCutsceneStart"); 
      }, this); 
    }
  }