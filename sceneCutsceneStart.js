const startSeq = [];
startSeq.push('sceneA1', 'sceneB1', 'sceneC1', 'sceneD1', 'sceneE1');


class SceneCutsceneStart extends Phaser.Scene {
    constructor() {      
      super({ key: "SceneCutsceneStart" });
    }
  
    preload() {
        this.load.image(startSeq[0], 'assets/cutscene-start-a.png');
        this.load.image('sceneB1', 'assets/cutscene-start-b.png');
        this.load.image('sceneC1', 'assets/cutscene-start-c.png');
        this.load.image('sceneD1', 'assets/cutscene-start-d.png');
        this.load.image('sceneE1', 'assets/cutscene-start-e.png');

        this.load.image('ford', 'assets/p-ford.png');

        this.load.image('ffButton', 'assets/btn-ff.png');
    }

    create() {
      var seqIndex = 0;
      var img = this.add.image(0, 0, startSeq[seqIndex]).setOrigin(0, 0).setDepth(0);

      // fast forward
      const ffButton = this.add.image(600, 30, 'ffButton');
      ffButton.setDepth(1);
      ffButton.setInteractive();
      ffButton.on('pointerdown', function(pointer) 
      {
        this.scene.start("SceneMain"); 
      }, this); 
      
      this.dialog = new Dialog(this);

      this.input.on('pointerdown', function(pointer) 
      {
        if (seqIndex >= startSeq.length - 1) {
          this.scene.start("SceneMain"); 
          return;
        }
        seqIndex++;
        var img = this.add.image(0,0, startSeq[seqIndex]).setOrigin(0,0);
      }, this); 
    }
  }