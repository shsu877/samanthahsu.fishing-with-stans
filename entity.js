class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this); // add to scene
        this.scene.physics.world.enableBody(this, 0); // instantiate to rendering queue
        this.setData("type", type);
        this.setData("isDead", false);
    }
}

class Hook extends Entity {
    constructor(scene)
    {
        super(scene, 320, 240, 'hook');
        this.setImmovable();
        this.setCircle(10, -5, 410);

        this.fish = null;

        scene.input.on('pointermove', function(pointer) {
            this.y = Phaser.Math.Clamp(pointer.y - 180, -50, 500);
            if (this.hasFish())
                this.setFishY();
        }, this);
        scene.input.on('pointerdown', function(pointer) 
        {
            scene.letFishGo();  
        }, this);      
    }

    // returns true if there is fish on hook
    hasFish() {
        return this.fish != null;
    }

    setFishY() { this.fish.y = Phaser.Math.Clamp(this.y + 200, -50, 500);}

    addFish(fish) {
        this.fish = fish;
        this.fish.setVelocity(0);
        this.fish.x = 320;
        this.setFishY(fish);
        this.fish.setRotation(-Math.PI/2);
    }

    removeFish(isCaught) {
        if (isCaught) {
            this.fish.destroy();
        } else {
            this.fish.flee();
        }
        this.fish = null;
    }
}


// makes random debris appear
class Debris extends Entity {
    constructor(scene) {
        var x = Phaser.Math.Between(680, 700);
        var y = Phaser.Math.Between(200, 470);

        var texture;
        switch(Phaser.Math.Between(0, 2)) {
            case 0:
                texture = 'banjo-polish'
                break;
            case 1:
                texture = 'melodica'
                break;
            case 2:
                texture = 'tuba'    
        }

        super(scene, x, y, texture);
        var speed = 50;
        this.setVelocity(-speed, 0);
        this.setScale(0.5);
        this.setRotation(Phaser.Math.Between(0, Math.PI/2))
    }

    update() {
        if (this.x < -150) {
            this.destroy();
        }
    }

}

class GabbleWinker extends Entity {

    constructor(scene, isLeft) {
        var x;
        var y;
        var speed;
        if (isLeft) {
            x = -300;
        } else {
            x = 640 + 300;
        }
        var y = Phaser.Math.Between(200, 470);
        super(scene, x, y, 'gobble');
        
        if (isLeft) {
            speed = 150;
            this.setCircle(60, 520, 40);
            this.setFlip(isLeft);
        } else {
            speed = -150;
            this.setCircle(60, -20, 40);
        }
        this.setVelocity(speed, 0);
    }

    update() {
        if (this.x < -300 || this.x > 300 + 640) {
            this.destroy();
        }
    }

}
