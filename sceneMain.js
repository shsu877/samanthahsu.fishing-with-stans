
class SceneMain extends Phaser.Scene {

    constructor() {
      super({ key: "SceneMain"});
    }
      
    preload ()
    {     
        this.load.image('bg', 'assets/bg.png');
        this.load.image('hook', 'assets/fishing-line.png');
    
        this.load.image('big', 'assets/big-fish.png');
        this.load.image('medium', 'assets/med-fish.png');
        this.load.image('small', 'assets/small-fish.png');
        
        this.score = 0;
        this.scoreText;
        this.hook;
        this.fishes = this.add.group();
        this.debris = this.add.group();

        // SPAWN THE FISHES!!!
        this.time.addEvent( {
            delay: 1000,
            callback: function() {
                var fish = new Fish(this);
                this.fishes.add(fish);
            },
            callbackScope: this,
            loop: true
        });
    }
    
    
    create ()
    {
        // add background image
        this.add.image(0, 0, 'bg').setOrigin(0,0);
    
        // HOOK
        this.hook = new Hook(this);
        // this.hook = this.add.sprite(320, 0, 'hook');
        // this.hook.scene.add.existing(this);
        // this.hook.scene.physics.world.enableBody(this, 0);
        // this.input.on('pointermove', function(pointer) {
        //     this.hook.y = Phaser.Math.Clamp(pointer.y - 180, -50, 500);
        //     }, this);
        // this.input.on('pointerdown', function(pointer) 
        // {
        //    this.letFishGo();  
        // }, this);

        this.physics.add.collider(this.hook, this.fishes, this.hookFish());

        // SCORE
        this.scoreText = this.add.text(16, 16, 'fishes: 0', { fontSize: '16px', fill: '#000'});
    }
    
    update ()
    {
    }

    // lets the fish off the hook, it within range of catching, add to score, otherwise it runs away
    letFishGo(){
        console.log("letFishGo");
        if (false) {
            score += 1; // gives more fishes for bigger fish
            this.scoreText.setText('fishes: ' + score);
        }
    }

    // attaches fish to the hook if no current fish on the hook
    hookFish() {
        console.log("hookFish");
    }
}

