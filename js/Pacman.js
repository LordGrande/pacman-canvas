/* global ctx, Direction, map, puntos, canvas */

class Pacman {
	constructor (){
		this.x = 420;
		this.y = 705;
		this.vx = 0;
		this.vy = 0;
		this.radio = 20;
		this.direccion = Direction.DEFAULT;
		this.eatedBigCoco = false;
		
		this.audioWaka = document.getElementById("soundWaka");
	}
	
	draw() {
		ctx.fillStyle = "rgb(255,255,0)";
		ctx.beginPath();
		switch (this.direccion) {
			case Direction.UP:
				ctx.arc(this.x, this.y, this.radio, 1.25 * Math.PI, Math.PI * 1.75, true);
				break;
			case Direction.DOWN:
				ctx.arc(this.x, this.y, this.radio, Math.PI / 4, Math.PI / 1.3, true);
				break;
			case Direction.LEFT:
				ctx.arc(this.x, this.y, this.radio, Math.PI / 1.4, 1.25 * Math.PI, true);
				break;
			case Direction.RIGHT:
				ctx.arc(this.x, this.y, this.radio, 1.75 * Math.PI, Math.PI / 4, true);
				break;
			default:
				ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI, true);
				break;
		}
		ctx.lineTo(this.x, this.y);
		ctx.fill();
	}
	
	resetPosition(){
		this.x = 420;
		this.y = 705;
		this.direccion = Direction.DEFAULT;
	}
	
	interaccion(key){
		var KEY_LEFT = 37;
		var KEY_UP = 38;
		var KEY_RIGHT = 39;
		var KEY_DOWN = 40;
		switch (key) {
			case KEY_DOWN:
				if (limit(Direction.DOWN, this.x, this.y)) {
					this.vx = 0;
					this.vy = 1;
					this.direccion = Direction.DOWN;
				}
				break;
			case KEY_UP:
				if (limit(Direction.UP, this.x, this.y)) {
					this.vx = 0;
					this.vy = -1;
					this.direccion = Direction.UP;
				}
				break;
			case KEY_RIGHT:
				if (limit(Direction.RIGHT, this.x, this.y)) {
					this.vx = 1;
					this.vy = 0;
					this.direccion = Direction.RIGHT;
				}
				break;
			case KEY_LEFT:
				if (limit(Direction.LEFT, this.x, this.y)) {
					this.vx = -1;
					this.vy = 0;
					this.direccion = Direction.LEFT;
				}
				break;
		}
	}
	
	move(){
		if (limit(this.direccion, this.x, this.y)) {
			this.x += this.vx * 5;
			this.y += this.vy * 5;
			if (this.x < 0) {
				this.x = canvas.width - 15;
			} else if (this.x + 16 > canvas.width) {
				this.x = 0;
			}
			if (estaCentrado(Direction.UP, this.x, this.y) && estaCentrado(Direction.LEFT, this.x, this.y)){
				var auxY = Math.trunc((this.y) / 30);
				var auxX = Math.trunc((this.x) / 30);
				if(map.arrayMapa[auxY][auxX] !== 1) {
					map.arrayMapa[auxY][auxX] = 1;
					map.drawCocos();
					puntos += 10;
					document.getElementById("puntos").innerHTML = puntos;
					this.audioWaka.play();
				} else {
					this.audioWaka.pause();
				}
			}
		} else {
			this.direccion = Direction.DEFAULT;
			this.audioWaka.pause();
		}
	}
}