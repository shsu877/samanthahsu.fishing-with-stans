
// CONSTANTS
const t1 = 2;
const t2 = 20;
const tf = 60;
const SMALL_SPAWN_TIME = 2000;
const MEDIUM_SPAWN_TIME = 4000;
const BIG_SPAWN_TIME = 8000;

const fishSize = {
    SMALL: 0,
    MEDIUM: 1,
    BIG: 2
}

class SceneMain extends Phaser.Scene {

    constructor() {
      super({ key: "SceneMain"});
    }
      
    preload ()
    {     
        this.load.image('bg', 'assets/bg.png');
        this.load.image('hook', 'assets/fishing-line.png');
        this.load.image('blank', 'assets/hook-fish-hitbox.png')
    
        this.load.image('big', 'assets/big-fish.png');
        this.load.image('medium', 'assets/med-fish.png');
        this.load.image('small', 'assets/small-fish.png');
        

        // VARIABLES
        this.score = 0;
        this.scoreText;
        this.threshhold = t1;
        this.level = 0;
        this.hook;
        this.fishes = this.add.group();
        this.debris = this.add.group();

        // SPAWN THE FISHES!!!
        this.time.addEvent( {
            delay: SMALL_SPAWN_TIME,
            callback: function() {
                var fish = new Fish(this, 'small', fishSize.SMALL);
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
        this.physics.add.overlap(this.hook, this.fishes, this.hookFish);

        // SCORE
        this.scoreText = this.add.text(16, 16, 'fishes: 0', { fontSize: '16px', fill: '#000'});
        
    }
    
    update ()
    {
        // console.log(this.hook.y)
    }

    // lets the fish off the hook, it within range of catching, add to score, otherwise it runs away
    letFishGo(){
        if (!this.hook.hasFish()) return; // if nothing on hook, nothing happens
        
        if (this.hook.y <= -45) {
            this.increaseScore(); // gives more fishes for bigger fish
            this.scoreText.setText('fishes: ' + this.score);
            this.hook.removeFish(true);

            if (this.score >= this.threshhold)
                this.increasDifficulty();

        } else {
            this.hook.removeFish();
        }
    }
   
    


    // adds to current score based on fish size
    increaseScore() {
        this.score += 1;
    }

    // attaches fish to the hook if no current fish on the hook
    hookFish(hook, fish) {
        if (fish.size == fishSize.SMALL && !hook.hasFish()) {
            hook.addFish(fish);
        } else if (!hook.hasFish()) {
            return;
        } else if (fish.size == fishSize.MEDIUM && hook.fish.size == fishSize.SMALL) {
            hook.removeFish(false);
            hook.addFish(fish);
        } else if (fish.size == fishSize.BIG && hook.fish.size == fishSize.MEDIUM) {
            hook.removeFish(false);
            hook.addFish(fish);
        }       
    }

    
    // adds more fish variety && obstacles
    increasDifficulty(){
        console.log("next threshhold " + this.threshhold);
        switch (this.level) {
            case 0:
                this.threshhold = this.t2;
                this.time.addEvent( {
                    delay: MEDIUM_SPAWN_TIME,
                    callback: function() {
                        var fish = new Fish(this, 'medium', fishSize.MEDIUM);
                        this.fishes.add(fish);
                    },
                    callbackScope: this,
                    loop: true
                });        
                this.level++;
            case 1:
                this.level++;
        }
        
    }
}

