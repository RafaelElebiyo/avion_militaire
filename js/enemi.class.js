import { TirEnemi } from './tir_enemi.class.js';

const enemis = ["assets/img/enemi.png", "assets/img/enemi_2.png", "assets/img/enemi_3.png"];

export class Enemi {
    constructor(carte) {
        this.carte = carte;
        this.positionX = Math.random() * (590 - 32);
        this.positionY = 0;
        this.element = document.createElement('img');
        this.element.src = enemis[Math.floor(Math.random() * enemis.length)];
        this.element.className = 'enemi';
        this.carte.appendChild(this.element);

        this.mettreAJourPosition();
        this.mouvement();

        this.shootInterval = this.initTirAleatorio();
    }

    mettreAJourPosition() {
        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    mouvement() {
        const vitesse = Math.floor(Math.random()*1+2);
        this.intervalle = setInterval(() => {
            this.positionY += vitesse;
            this.mettreAJourPosition();
            if (this.positionY > 600) {
                clearInterval(this.intervalle);
                clearInterval(this.shootInterval); 
                this.element.remove();
            }
        }, 30);
    }
    

    initTirAleatorio() {
        setTimeout(() => {
            this.shootInterval = setInterval(() => {
                this.tirer();
            }, Math.floor(Math.random() * 300) + 400);
        }, 100);
    }    

    tirer() {
    if (!document.body.contains(this.element)) { 
        clearInterval(this.shootInterval);
        return;
    }
    const x = this.element.offsetLeft + (this.element.offsetWidth / 2) - 5;
    const y = this.element.offsetTop + this.element.offsetHeight;
    new TirEnemi(this.carte, x, y);
}

    
}