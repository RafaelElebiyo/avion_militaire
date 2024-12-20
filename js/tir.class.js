export class Tir {
    constructor(carte, x, y,ameliorer) {
        this.carte = carte;
        this.positionX = x;
        this.positionY = y;
        this.element = document.createElement('img');
        if(ameliorer){
            this.element.src = "assets/img/tir_2.png";
            this.element.className = 'tir_2';
        }
        else{
            this.element.src = "assets/img/tir.png";
            this.element.className = 'tir';
        }
        
        this.carte.appendChild(this.element);

        this.mettreAJourPosition();
        this.mouvement();
    }

    mettreAJourPosition() {
        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    mouvement() {
        const vitesse = -10; 
        this.intervalleTir = setInterval(() => {
            this.positionY += vitesse;
            this.mettreAJourPosition();
            if (this.positionY < 0) {
                clearInterval(this.intervalleTir);
                this.element.remove();
            }
        }, 30);
    }
}