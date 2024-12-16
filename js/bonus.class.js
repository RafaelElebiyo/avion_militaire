const bonus = ["assets/img/bonus_1.png", "assets/img/bonus_2.png", "assets/img/bonus_3.png"];

export class Bonus {
    constructor(carte) {
        this.carte = carte;
        this.positionX = Math.random() * (carte.offsetWidth - 20); // Limita X al ancho del mapa
        this.positionY = 0;

        this.element = document.createElement('img');
        this.element.src = bonus[Math.floor(Math.random() * bonus.length)];
        this.element.className = 'bonus';
        this.carte.appendChild(this.element);

        this.vitesse = Math.random() * 1.5 + 0.5;
        this.commencerMouvement();
    }

    commencerMouvement() {
        this.intervalle = setInterval(() => this.deplacer(), 50);
    }

    deplacer() {
        this.positionY += this.vitesse;
        if (this.positionY > this.carte.offsetHeight) {
            this.detruire();
        }
        this.mettreAJourPosition();
    }

    mettreAJourPosition() {
        // Asegura que el objeto se mantenga dentro del mapa horizontalmente
        if (this.positionX < 0) this.positionX = 0;
        if (this.positionX > this.carte.offsetWidth - 20) this.positionX = this.carte.offsetWidth - 20;

        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    detruire() {
        clearInterval(this.intervalle);
        this.element.remove();
    }
}
