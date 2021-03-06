(function(){
	document.querySelector('body').style.cursor = 'crosshair';
	
	var game = new Phaser.Game(340,620,Phaser.CANVAS,'',{preload:preload,create:create,update:update});
	
	//Variáveis Globais
	var tank,controls = {},cannon,bullets,fireRate = 100,nextFire = 0;
	
	function preload(){
		game.load.image('tank','img/tank.png');
		game.load.image('cannon','img/cannon.png');
		game.load.image('bullet','img/bullet.png');
	}
	
	function create(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = '#C78839';
		
		tank = game.add.sprite(game.world.centerX,game.world.centerY,'tank');
		tank.anchor.set(.5);
		game.physics.enable(tank);
		
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.createMultiple(50,'bullet');
		bullets.setAll('checkWorldBounds',true);
		bullets.setAll('outOfBoundsKill',true);
		bullets.setAll('anchor.x',.5);
		bullets.setAll('anchor.y',.5);
		
		cannon = game.add.sprite(tank.x,tank.y,'cannon');
		cannon.anchor.set(.3,.5);
		game.physics.enable(cannon);
		
		
		controls.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
		controls.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
		controls.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
		controls.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
	}
	
	function update(){
		cannon.x = tank.x;
		cannon.y = tank.y;
		cannon.rotation = game.physics.arcade.angleToPointer(cannon);
	
		if(controls.up.isDown){
			//Aplica uma velocidade nos eixos X e Y do sprite dado o de inclinação deste
			//Recebe como parâmetros: a inclinação em radianos, a velocidade a ser aplicada e o parâmetro a ser afetado
			game.physics.arcade.velocityFromRotation(tank.rotation,100,tank.body.velocity);
		} else
		if(controls.down.isDown){
			game.physics.arcade.velocityFromRotation(tank.rotation,-50,tank.body.velocity);
		} else {
			tank.body.velocity.set(0);
		}
		
		if(controls.left.isDown){
			if(controls.down.isDown){
				tank.body.rotation++;
			} else {
				tank.body.rotation--;
			}
		} else
		if(controls.right.isDown){
			if(controls.down.isDown){
				tank.body.rotation--;
			} else {
				tank.body.rotation++;
			}
		}
		
		if(game.input.activePointer.isDown){
			fire();
		}
		
		//permite a realocação de um sprite em relação ao mundo do jogo
		//recebe como parâmetros: o sprite a ser realocado e uma margem em pixels 
		game.world.wrap(tank,75);
		game.world.wrap(cannon,75);
	}
	
	function fire(){
		if(game.time.now > nextFire && bullets.countDead() > 0){
			var bullet = bullets.getFirstDead();
				bullet.reset(cannon.x + Math.cos(cannon.rotation) * 80,cannon.y + Math.sin(cannon.rotation) * 80);
				
				game.physics.arcade.moveToPointer(bullet,300);
				
				nextFire = game.time.now + fireRate;
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}());
