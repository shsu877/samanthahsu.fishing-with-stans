class SceneGameWin extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameWin" });
  }

  preload() {
    this.add.text(secretTextX, secretTextY, secretText3, secretTextStyle);

    this.load.image('sa1w', 'assets/cutscene-win-a1.png');
    this.load.image('sb1w', 'assets/cutscene-win-b1.png');
    this.load.image('sb2w', 'assets/cutscene-win-b2.png');
    this.load.image('sb3w', 'assets/cutscene-win-b3.png');
    this.load.image('sc1w', 'assets/cutscene-win-c1.png');
    this.load.image('sc2w', 'assets/cutscene-win-c2.png');
    this.load.image('sd1w', 'assets/cutscene-win-d1.png');
    this.load.image('se1w', 'assets/cutscene-win-e1.png');
    this.load.image('se2w', 'assets/cutscene-win-e2.png');
    this.load.image('sf1w', 'assets/cutscene-win-f1.png');
    this.load.image('sf2w', 'assets/cutscene-win-f2.png');
    this.load.image('sg1w', 'assets/cutscene-win-g1.png');
    this.load.image('sg2w', 'assets/cutscene-win-g2.png');
    this.load.image('sg3w', 'assets/cutscene-win-g3.png');
    this.load.image('sg4w', 'assets/cutscene-win-g4.png');
    this.load.image('sg5w', 'assets/cutscene-win-g5.png');

    this.load.image('ford', 'assets/p-ford.png');
    this.load.image('stan', 'assets/p-stan.png');
    this.load.image('vfish', 'assets/p-voidfish.png');
  }

  create() {
    this.createArray();
    var seqIndex = 0;
    this.add.image(0, 0, this.winSeqText[seqIndex].image).setOrigin(0,0);

    this.dialog = new Dialog(this);
    this.dialog.setDialog(this.winSeqText[seqIndex].speaker, this.winSeqText[seqIndex].text);

    this.input.on('pointerdown', function(pointer) 
    {
      if (seqIndex >= this.winSeqText.length - 1) {
          this.scene.start("SceneMainMenu"); 
        return;
      }
      seqIndex++;
      this.add.image(0,0,this.winSeqText[seqIndex].image).setOrigin(0,0);
      this.dialog.setDialog(this.winSeqText[seqIndex].speaker, this.winSeqText[seqIndex].text);
      }, this); 
  }

  createArray() {
    this.winSeqText = [];
    this.winSeqText.push(
      new Snapshot('sa1w', undefined, "!!!"),

      new Snapshot('sb1w', speaker.STAN, "It's a man-o-war!"),
      new Snapshot('sb1w', speaker.FORD, "Correction Stanley, she’s a woman-o-war!"),
      new Snapshot('sb2w', speaker.STAN, "Well hey babe!"),
      new Snapshot('sb3w', speaker.FORD, "Stan, this is one of the multiverse’s most acclaimed critics and distributors of high art!"),
      new Snapshot('sb2w', speaker.FORD, "Ahem, apologies for my brother."),
      new Snapshot('sb2w', speaker.FORD, "What brings a brilliant curator such as yourself to this humble planet?"),
      new Snapshot('sb2w', speaker.FORD, "..."),

      new Snapshot('sc1w', speaker.FORD, "Apparently she’s been teaching music to the local aquatic population for generations."),
      new Snapshot('sc1w', speaker.FORD, "Who knew fish possess such great capacity for intelligence?"),
      new Snapshot('sc1w', speaker.STAN, "Yeah, yeah, but why is she attacking our boat?"),
      new Snapshot('sc2w', speaker.FORD, "The fish we’ve been catching appear to be her band members..."),
      new Snapshot('sc2w', speaker.FORD, "She wants them back, Stanley."),
      new Snapshot('sc2w', speaker.STAN, "Well, what are we waiting for?"),
      new Snapshot('sc2w', speaker.FORD, "(sigh)"),
      new Snapshot('sc2w', speaker.FORD, "I suppose it's for the best"),
      new Snapshot('sd1w', undefined, ""),

      new Snapshot('se1w', speaker.FORD, "She says thank you - and... she likes... your clown painting?"),
      new Snapshot('se2w', speaker.STAN, "HA! YOU HEAR THAT SIXER?? You robbed the world of a masterpiece!"),

      new Snapshot('sf1w', speaker.FORD, "... oh no"),
      new Snapshot('sf1w', speaker.FORD, "She's broadcasting the painting to every being in the multiverse!"),
      new Snapshot('sf1w', undefined, ""),
      new Snapshot('sf1w', speaker.STAN, "YES! YES!"),
      new Snapshot('sf2w', undefined, ""),

      new Snapshot('sg1w', speaker.FORD, "You know what Stanley?"),
      new Snapshot('sg1w', speaker.FORD, "Now that your painting is seared into my mind and I have no choice but to think of it for the rest of my life..."),
      new Snapshot('sg1w', speaker.FORD, "I think..."),
      new Snapshot('sg1w', speaker.FORD, "- there might just be an ounce of something metaphorical and worth admiring."),

      new Snapshot('sg2w', speaker.STAN, "If it takes a magic portal fish for you to admit you’re wrong Sixer, we’ll be on these seas for a long time."),
      new Snapshot('sg3w', undefined, ""),
      new Snapshot('sg4w', undefined, ""),
      new Snapshot('sg5w', undefined, ""),
    )
  }
}