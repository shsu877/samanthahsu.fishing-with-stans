const speaker = {
  STAN: 'stan',
  FORD: 'ford',
  VOIDFISH: 'voidfish'
}


class Snapshot {
  constructor(image, speaker, text) {
    this.image = image;
    this.speaker = speaker;
    this.text = text;
  }
}

const startSeqText = [];
startSeqText.push(
  new Snapshot('sa1', speaker.STAN, "*yawn*"),
  new Snapshot('sa1', speaker.STAN, "What are you up to?"),
  new Snapshot('sa1', speaker.FORD, "Good afternoon, Stanley. I'm thinking of doing some fishing."),
  new Snapshot('sa2', speaker.STAN, "SAY NO MORE SIXER!"),
  new Snapshot('sa2', speaker.FORD, "I’ve analyzed their digestive tracts all morning and found that these particular specimens only consume true works of art."),

  new Snapshot('sb1', speaker.STAN, "What did you not get about “say no more”"),
  new Snapshot('sb1', speaker.FORD, "But where to find some art…"),
  new Snapshot('sb2', speaker.STAN, "Hey, how bout this clown painting I made of you sleeping!"),

  new Snapshot('sc1', speaker.FORD, "see this, Stanley, is why I can’t sleep more than once a week."),

  new Snapshot('sd1', speaker.FORD, "Anyways that won’t do, they are looking for sophistication and metaphorical meaning-"),
  new Snapshot('sd1', speaker.STAN, "HEY!"),
  new Snapshot('sd1', speaker.FORD, "Perhaps my journals will be accepted!"),
  new Snapshot('sd2', speaker.FORD, "..."),
  new Snapshot('sd3', speaker.FORD, "..."),

  new Snapshot('se1', speaker.FORD, ""),
  new Snapshot('se1', speaker.STAN, "See, they appreciate my work of art for what it is!"),
  new Snapshot('sf1', speaker.FORD, "Baffling, but we are going to need a lot of bait."),
  new Snapshot('sf1', speaker.STAN, "Sixer, what are you-"),
  new Snapshot('sf2', speaker.STAN, ""),
  new Snapshot('sf3', speaker.STAN, "My masterpiece!!!"),
  new Snapshot('sf4', speaker.FORD, "Stanley, you painted this in at most 15 minutes, I’m sure you can make more, besides, it's for research!"),
  new Snapshot('sf4', speaker.STAN,"BESMIRTCHED!!!!"),
  new Snapshot('sf4', speaker.FORD,"So you are going to let me take all the fishing glory-"),
  new Snapshot('sf5', speaker.STAN, "Don’t even dream about it!"),
)


class SceneCutsceneStart extends Phaser.Scene {
    constructor() {      
      super({ key: "SceneCutsceneStart" });
    }
  
    preload() {
      this.load.image('sa1', 'assets/cutscene-start-a1.png');
      this.load.image('sa2', 'assets/cutscene-start-a2.png');
      this.load.image('sb1', 'assets/cutscene-start-b1.png');
      this.load.image('sb2', 'assets/cutscene-start-b2.png');
      this.load.image('sc1', 'assets/cutscene-start-c1.png');
      this.load.image('sd1', 'assets/cutscene-start-d1.png');
      this.load.image('sd2', 'assets/cutscene-start-d2.png');
      this.load.image('sd3', 'assets/cutscene-start-d3.png');
      this.load.image('se1', 'assets/cutscene-start-e1.png');
      this.load.image('sf1', 'assets/cutscene-start-f1.png');
      this.load.image('sf2', 'assets/cutscene-start-f2.png');
      this.load.image('sf3', 'assets/cutscene-start-f3.png');
      this.load.image('sf4', 'assets/cutscene-start-f4.png');
      this.load.image('sf5', 'assets/cutscene-start-f5.png');

      this.load.image('ford', 'assets/p-ford.png');
      this.load.image('stan', 'assets/p-stan.png');
      this.load.image('vfish', 'assets/p-voidfish.png');

      this.load.image('ffButton', 'assets/btn-ff.png');
    }

    create() {
      // fast forward
      const ffButton = this.add.image(600, 30, 'ffButton');
      ffButton.setDepth(1);
      ffButton.setInteractive();
      ffButton.on('pointerdown', function(pointer) 
      {
        this.scene.start("SceneMain"); 
      }, this); 
      
      var seqIndex = 0;
      this.add.image(0,0,startSeqText[seqIndex].image).setOrigin(0,0);

      this.dialog = new Dialog(this);
      this.dialog.setDialog(startSeqText[seqIndex].speaker, startSeqText[seqIndex].text);
      

      this.input.on('pointerdown', function(pointer) 
      {
        if (seqIndex >= startSeqText.length - 1) {
          this.scene.start("SceneMain"); 
          return;
        }
        seqIndex++;
        this.add.image(0,0,startSeqText[seqIndex].image).setOrigin(0,0);
        this.dialog.setDialog(startSeqText[seqIndex].speaker, startSeqText[seqIndex].text);
        }, this); 
    }
  }