export class TirEnemi {
    constructor(carte, x, y) {
        this.carte = carte;
        this.positionX = x;
        this.positionY = y;
        this.element = document.createElement('img');
        this.element.src = "assets/img/tir_enemi.png";
        this.element.className = 'tir_enemi';
        this.carte.appendChild(this.element);

        this.mettreAJourPosition();
        this.mouvement();
    }

    mettreAJourPosition() {
        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    mouvement() {
        const vitesse = 4;
        this.intervalle = setInterval(() => {
            this.positionY += vitesse;
            this.mettreAJourPosition();
            if (this.positionY > 600) {
                clearInterval(this.intervalle);
                this.element.remove();
            }
        }, 30);
    }
    
    
}