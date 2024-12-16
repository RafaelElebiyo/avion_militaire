const enemis = ["assets/img/enemi.png", "assets/img/enemi_2.png", "assets/img/enemi_3.png"];

export class Enemi {
    constructor(carte, jeu) {
      this.jeu = jeu;
      this.carte = carte;
      this.positionX = Math.random() * (carte.offsetWidth - 45); // Limita X al ancho del mapa
      this.positionY = 0;

      this.element = document.createElement('img');
      this.element.src = enemis[Math.floor(Math.random()*enemis.length)] ;
      this.element.className = 'enemi';
      this.carte.appendChild(this.element);

      this.vitesse = Math.random() * 2 + 1;
      this.commencerMouvement();
      this.tirs = [];
      this.initTirAleatoire();
    }

    initTirAleatoire() {
      const intervalleTir = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000; // entre 1 et 3 secondes
      setInterval(() => {
        this.tirer();
      }, intervalleTir);
    }

    tirer() {
      const tir = document.createElement('img');
      tir.src = 'assets/img/tir_enemi.png';
      tir.className = 'tir';
      tir.style.left = `${this.positionX + 15}px`; 
      tir.style.top = `${this.positionY + 20}px`;
      this.carte.appendChild(tir);

      const intervalle = setInterval(() => {
        tir.style.top = `${parseInt(tir.style.top) + 10}px`;

        if (parseInt(tir.style.top) > 600) {
          clearInterval(intervalle);
          tir.remove();
        }
      }, 30);
    }

    comproverColisionAvecTirAvion(tir) {
      const tirRect = tir.getBoundingClientRect();
      const elementRect = this.element.getBoundingClientRect();
  
      return !(
          tirRect.right < elementRect.left-10 ||
          tirRect.left > elementRect.right-10 ||
          tirRect.bottom < elementRect.top-10 ||
          tirRect.top > elementRect.bottom-10
      );
  }

    commencerMouvement() {
      const intervalleMouvement = setInterval(() => {
        this.positionY += this.vitesse;
        this.mettreAJourPosition();

        if (this.positionY > 600) {
          clearInterval(intervalleMouvement);
          this.element.remove();
        }
      }, 50);
    }

    mettreAJourPosition() {
      this.element.style.left = `${this.positionX}px`;
      this.element.style.top = `${this.positionY}px`;
    }
  }
