import { Avion } from './avion.class.js';
import { Enemi } from './enemi.class.js';
import { Obstacle } from './obstacle.class.js';
import { Bonus } from './bonus.class.js';

class Jeu {
    constructor() {
        this.enCours = false;
        this.avion = null;
        this.enemis = [];
        this.obstacles = [];
        this.bonus = [];
        this.tirs = []; // Disparos del avión
        this.tiresEnemi = []; // Disparos de los enemigos
        this.score = 0;
        this.vie_extra = 1;

        this.carte = document.getElementById('carte');
        this.scoreElement = document.getElementById('score');

        document.addEventListener('keydown', this.demarrerAvecEntree);
    }

    demarrerAvecEntree = (event) => {
        if (event.key === 'Enter' && !this.enCours) {
            this.demarrerJeu();
        }
    }

    demarrerJeu() {
        this.enCours = true;
        document.getElementById('ecran-demarrage').style.display = 'none';
        document.getElementById('jeu').style.display = 'block';

        this.avion = new Avion(this.carte, this);
        document.addEventListener('keydown', this.gestionClavier);

        this.intervalleEnemis = setInterval(() => this.creerEnemis(), 2000);
        this.intervalleObstacles = setInterval(() => this.creerObstacles(), 3000);
        this.intervalleBonus = setInterval(() => this.creerBonus(), 5000);

        this.boucleJeu();
    }

    boucleJeu = () => {
        this.verifierCollisions();
        if (this.enCours) requestAnimationFrame(this.boucleJeu);
    }

    creerEnemis() {
        const nouvelEnemi = new Enemi(this.carte, this);
        this.enemis.push(nouvelEnemi);
    }

    creerObstacles() {
        const nouvelObstacle = new Obstacle(this.carte);
        this.obstacles.push(nouvelObstacle);
    }

    creerBonus() {
        const nouvelBonus = new Bonus(this.carte);
        this.bonus.push(nouvelBonus);
    }


    verifierCollisions() {
        this.tirs.forEach((tir, indexTir) => {
            this.enemis.forEach((enemi, indexEnemi) => {
                if (enemi.comproverColisionAvecTirAvion(tir)) {
                    enemi.detruire();
                    tir.remove();
                    this.enemis.splice(indexEnemi, 1);
                    this.tirs.splice(indexTir, 1);
                }
            });

            this.obstacles.forEach((obstacle, indexObstacle) => {
                if (obstacle.comproverColisionAvecTirAvion(tir)) {
                    obstacle.detruire();
                    tir.remove();
                    this.obstacles.splice(indexObstacle, 1);
                    this.tirs.splice(indexTir, 1);
                }
            });
        });

        this.enemis.forEach((enemi) => {
            if (this.avion.comproverColisionAvecEnemi(enemi)) {
                this.avion.detruire()
            }
        });

        this.bonus.forEach((bonus, indexBonus) => {
            if (this.avion.comproverColisionAvecBonus(bonus)) {
                if (bonus.src === "assets/img/bonus_1.png") {
                    vie_extra++
                }
                else if (bonus.src === "assets/img/bonus_2.png") {
                    this.avion.ameliorer()
                }
                else if (bonus.src === "assets/img/bonus_3.png") {
                    this.score += 1000;
                    this.actualiserScore();
                }
                else{
                    this.score += 0;
                    this.actualiserScore();
                }
                bonus.detruire();
                this.bonus.splice(indexBonus, 1);
            }
        });

        this.obstacles.forEach((obstacle) => {
            if (this.avion.comproverColisionAvecObstacle(obstacle)) {
                this.avion.detruire()
            }
        });

        this.tiresEnemi.forEach((tirEnemi) => {
            if (this.avion.comproverColisionAvecTirEnemi(tirEnemi)) {
                this.avion.detruire()
            }
        });
    }

    actualiserScore() {
        this.scoreElement.textContent = String(this.score).padStart(6, '0');
    }

    gestionClavier = (event) => {
        if (!this.avion) return;

        switch (event.key) {
            case 'ArrowUp': this.avion.deplacer('haut'); break;
            case 'ArrowDown': this.avion.deplacer('bas'); break;
            case 'ArrowLeft': this.avion.deplacer('gauche'); break;
            case 'ArrowRight': this.avion.deplacer('droite'); break;
            case ' ': this.avion.tirer(this.tirs); break;
            case 'Escape': this.finDuJeu(); break;
        }
    }

    finDuJeu() {
        this.enCours = false;
        clearInterval(this.intervalleEnemis);
        clearInterval(this.intervalleObstacles);
        clearInterval(this.intervalleBonus);

        document.getElementById('ecran-demarrage').style.display = 'flex';
        document.getElementById('jeu').style.display = 'none';
        this.carte.innerHTML = '';
        this.score = 0;
        this.scoreElement.textContent = '000000';
    }
}

new Jeu();
