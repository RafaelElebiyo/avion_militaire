const obstacles = ["assets/img/obstacle.png", "assets/img/obstacle_2.png", "assets/img/obstacle_3.png"];

export class Obstacle {
    constructor(carte) {
        this.carte = carte;
        this.positionX = Math.random() * (carte.offsetWidth - 30); // Limita X al ancho del mapa
        this.positionY = 0;

        this.element = document.createElement('img');
        this.element.src = obstacles[Math.floor(Math.random() * obstacles.length)];
        this.element.className = 'obstacle';
        this.carte.appendChild(this.element);

        this.vitesse = Math.random() * 2 + 1;
        this.commencerMouvement();
    }

    commencerMouvement() {
        this.intervalle = setInterval(() => this.deplacer(), 50);
    }

    comproverColisionAvecTirAvion(tir) {
        const tirRect = tir.getBoundingClientRect();
        const elementRect = this.element.getBoundingClientRect();
    
        return !(
            tirRect.right < elementRect.left ||
            tirRect.left > elementRect.right ||
            tirRect.bottom < elementRect.top ||
            tirRect.top > elementRect.bottom
        );
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
        if (this.positionX > this.carte.offsetWidth - 30) this.positionX = this.carte.offsetWidth - 30;

        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    detruire() {
        clearInterval(this.intervalle);
        this.element.remove();
    }
}
