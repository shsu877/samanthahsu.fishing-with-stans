
const loseSeqText = [];
loseSeqText.push(
  new Snapshot('sa', speaker.STAN, "WHAT?!"),
  new Snapshot('sa', speaker.STAN, "The score must be broken or something, I totally won!"),
  new Snapshot('sa', speaker.FORD, "-Fascinating! Their lungs are so powerful they can breathe on land."),
  new Snapshot('sb', speaker.STAN, "Come one! We’re gonna win this time, I dare you to press it!"),
  new Snapshot('sb', speaker.FORD, "Stanley, who are you talking to? … and what are you pointing at?"),
)

class SceneGameLose extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameLose" });
  }

  preload() {
    this.load.image('sa', 'assets/cutscene-lose-a.png');
    this.load.image('sb', 'assets/cutscene-lose-b.png');

    this.load.image('ford', 'assets/p-ford.png');
    this.load.image('stan', 'assets/p-stan.png');
    this.load.image('vfish', 'assets/p-voidfish.png');

  }

  create() {
    console.log("YOU LOSE");

    var seqIndex = 0;
    this.add.image(0, 0, loseSeqText[seqIndex].image).setOrigin(0,0);

    this.dialog = new Dialog(this);
    this.dialog.setDialog(loseSeqText[seqIndex].speaker, loseSeqText[seqIndex].text);

    this.input.on('pointerdown', function(pointer) 
    {
      if (seqIndex >= loseSeqText.length - 1) {
          this.scene.start("SceneMainMenu"); 
        return;
      }
      seqIndex++;
      this.add.image(0,0,loseSeqText[seqIndex].image).setOrigin(0,0);
      this.dialog.setDialog(loseSeqText[seqIndex].speaker, loseSeqText[seqIndex].text);
      }, this); 
  }
}