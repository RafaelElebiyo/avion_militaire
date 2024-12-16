export class Avion {
    constructor(carte, jeu) {
        this.jeu = jeu;
        this.carte = carte;
        this.positionX = 305;
        this.positionY = 490;

        this.element = document.createElement('img');
        this.element.src = "assets/img/avion.png";
        this.element.className = 'avion';
        this.carte.appendChild(this.element);

        this.mettreAJourPosition();
    }

    deplacer(direction) {
        const distance = 15;

        if (direction === 'haut' && this.positionY > 0) this.positionY -= distance;
        if (direction === 'bas' && this.positionY < 500) this.positionY += distance;
        if (direction === 'gauche' && this.positionX > 0) this.positionX -= distance;
        if (direction === 'droite' && this.positionX < 600) this.positionX += distance;

        this.mettreAJourPosition();
    }

    tirer() {
        const tir = document.createElement('img');
        tir.src = 'assets/img/tir.png';
        tir.className = 'tir';
        tir.style.left = `${this.positionX + 18}px`;
        tir.style.top = `${this.positionY}px`;
        this.carte.appendChild(tir);

        const intervalle = setInterval(() => {
            tir.style.top = `${parseInt(tir.style.top) - 10}px`;

            if (parseInt(tir.style.top) < 0) {
                clearInterval(intervalle);
                tir.remove();
            }
        }, 30);
    }

    comproverColisionAvecEnemi(enemi) {
        const avionRect = this.element.getBoundingClientRect();
        const enemiRect = enemi.element.getBoundingClientRect();

        return !(avionRect.right < enemiRect.left-10 ||
                 avionRect.left > enemiRect.right-10 ||
                 avionRect.bottom < enemiRect.top-10 ||
                 avionRect.top > enemiRect.bottom-10);
    }

    comproverColisionAvecTirEnemi(tirEnemi) {
        const avionRect = this.element.getBoundingClientRect();
        const tirEnemiRect = tirEnemi.getBoundingClientRect();

        return !(avionRect.right < tirEnemiRect.left-10 ||
                 avionRect.left > tirEnemiRect.right-10 ||
                 avionRect.bottom < tirEnemiRect.top-10 ||
                 avionRect.top > tirEnemiRect.bottom-10);
    }

    comproverColisionAvecObstacle(obstacle) {
        const avionRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        return !(avionRect.right < obstacleRect.left-10 ||
                 avionRect.left > obstacleRect.right-10 ||
                 avionRect.bottom < obstacleRect.top-10 ||
                 avionRect.top > obstacleRect.bottom-10);
    }

    comproverColisionAvecBonus(bonus) {
        const avionRect = this.element.getBoundingClientRect();
        const bonusRect = bonus.element.getBoundingClientRect();

        return !(avionRect.right < bonusRect.left-10 ||
                 avionRect.left > bonusRect.right-10 ||
                 avionRect.bottom < bonusRect.top-10 ||
                 avionRect.top > bonusRect.bottom-10);
    }

    mettreAJourPosition() {
        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    ameliorer(){
    this.element.src="assets/img/avion_2.png"
    }

    detruire() {
        this.element.src = "assets/img/explotion.gif";
    
        // Supprimer l'élément DOM après un court délai pour laisser le gif jouer
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.remove(); // Retire l'élément du DOM
            }
        }, 2000); // délai en millisecondes pour laisser l'animation s'exécuter
    }
    
}