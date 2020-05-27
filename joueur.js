class Joueur {
	constructor(pseudo, avatar, position, vie, force, arme) {
		this.pseudo = pseudo;
		this.avatar = avatar;
		this.position = position;
		this.vie = 100;
		this.force = 10;
		this.arme = arme;
		this.nbCoup = 3;
	}
	setPosition(newPosition, table){
		if(typeof newPosition == "number" && newPosition >=0 && newPosition<table.nbCases){
			this.position = newPosition;
		}
		else{
			console.log("newPosition doit être un nombre entre 0 et " + table.nbCases-1);
		}
	}
	setArme(newArme){
		if(newArme instanceof Arme){
			this.arme = newArme;
		}
		else{
			console.log("newArme doit être une instance de Arme");
		}
	}
	setNbCoup(newNbCoup){
		if(typeof newNbCoup == "number"){
			this.nbCoup = newNbCoup;
		}
		else{
			console.log("newNbCoup doit être un nombre");
		}
	}
	setVie(newVie){
		if(typeof newVie == "number"){
			this.vie = newVie;
		}
		else{
			console.log("newVie doit être un nombre");
		}
	}
	setForce(newForce){
		if(typeof newForce == "number"){
			this.force = newForce;
		}
		else{
			console.log("newForce doit être un nombre");
		}				
	}
	//Description d'un joueur
	decrire() {
		return ("<strong>" +this.pseudo+ "</strong><br>"+ "Points de vie : " + this.vie + "</br> " + "Points de force : " + this.force + " </br>Arme :  " +
		 this.arme.nom);
	}
	//Fonction qui permet de placer les joueurs
	placerJoueurDebut(table){
		if(table.around(this.position)==true){
			$("td:eq("+this.position+")").removeClass("libre").addClass(this.avatar);
		}
		//sinon rechercher une autre position et recommencer 
		else {
			this.setPosition(Math.round(Math.random()*table.nbCases)-1, table);	
			this.placerJoueurDebut(table);
		}	
	}		
	//Fonction qui met en évidence les déplacemements possibles
	choixR(num, table){
		if(this.position % table.nbColonnes < table.nbColonnes-num && this.position < table.nbCases-num && (classCase(this.position+num) == "libre" || classCase(this.position+num).includes( "arme"))){
			return true;
		}
	}
	choixL(num, table){
		if(this.position % table.nbColonnes > num -1 && this.position > num - 1 && (classCase(this.position-num) == "libre" || classCase(this.position-num).includes( "arme"))){
			return true;
		}
	}
	choixT(num, table){
		if(this.position > (num*table.nbColonnes-1) && (classCase(this.position-num*table.nbColonnes) == "libre" || classCase(this.position-table.nbColonnes*num).includes("arme"))){
			return true;
		}
	}
	choixB(num, table){
		if(this.position < (table.nbCases-table.nbColonnes*num) && (classCase(this.position+table.nbColonnes*num) == "libre" || classCase(this.position+table.nbColonnes*num).includes( "arme"))){
			return true;
		}
	}
//Les 3 cases autour de this	
	choix3(table) {
	//à droite : Si la première case est libre surbrillance etc
		if(this.choixR(1, table) == true){
			casePossible(this.position + 1);
			if(this.choixR(2, table) == true){
				casePossible(this.position + 2);
				if(this.choixR(3, table)== true){
					casePossible(this.position + 3);
				}
			}
		}			
	//à gauche : Si la première case est libre surbrillance etc
		if(this.choixL(1, table)==true){
			casePossible(this.position - 1);
			if(this.choixL(2, table) == true){
				casePossible(this.position - 2);
				if(this.choixL(3, table) == true){
					casePossible(this.position - 3);
				}
			}
		}
	// en haut: Si la première case est libre surbrillance etc
		if(this.choixT(1, table)== true){
			casePossible(this.position - table.nbColonnes);
			if(this.choixT(2, table) == true){
				casePossible(this.position - 2*table.nbColonnes);
				if(this.choixT(3, table) == true){
					casePossible(this.position - 3*table.nbColonnes);
				}
			}
		}
	//en bas : Si la première case est libre surbrillance etc
		if(this.choixB(1, table)== true){
			casePossible(this.position + table.nbColonnes);
			if(this.choixB(2, table)== true){
				casePossible(this.position + 2*table.nbColonnes);
				if(this.choixB(3, table)== true){
					casePossible(this.position + 3*table.nbColonnes);
				}
			}
		}
	}
//les 2 cases autour	
	choix2(table) {
		if(this.choixR(1, table) == true){
			casePossible(this.position + 1);
			if(this.choixR(2, table) == true){
				casePossible(this.position + 2);
			}
		}
		if(this.choixL(1, table)== true){
			casePossible(this.position - 1);
			if(this.choixL(2, table)== true){
				casePossible(this.position - 2);
			}
		}
		if(this.choixT(1, table) == true){
			casePossible(this.position - table.nbColonnes);
			if(this.choixT(2, table)== true){
				casePossible(this.position - 2*table.nbColonnes);
			}
		}
		if(this.choixB(1, table) == true){
			casePossible(this.position + table.nbColonnes);
			if(this.choixB(2, table)== true){
				casePossible(this.position + 2*table.nbColonnes);
			}
		}
	}
//la case autour
	choix1(table){
		if(this.choixR(1, table) == true){
			casePossible(this.position + 1);
		}
		if(this.choixL(1, table) == true){
			casePossible(this.position- 1);
		}
		if(this.choixT(1, table)== true){
			casePossible(this.position - table.nbColonnes);
		}
		if(this.choixB(1, table)== true){
			casePossible(this.position + table.nbColonnes);
		}	
	}
//fonction pour attribuer les dégats de l'arme en force
	getForce(liste){
		const arme_initiale = this.arme;
		for(let i=0; i<liste.length; i++){
			if (classCase(this.position).includes(liste[i].nom) && this.arme == arme_initiale){
				this.setForce(liste[i].degat);
				this.setArme(liste[i]);
				$("td:eq("+(this.position)+")").removeClass(liste[i].nom).addClass(arme_initiale.nom);
			}
		}				
	}
//Fonction qui opère les changements sur une case et sur le joueur si mvt vers positionP
	change(positionP, liste, table){
		if(classCase(positionP).includes('possible') && this.nbCoup!=3){
			$('.'+this.avatar).removeClass(this.avatar).addClass("libre");
			$("td:eq("+(positionP)+")").removeClass("libre").addClass(this.avatar);;
			$(".possible").removeClass("possible");
			this.setPosition(positionP, table);
			this.getForce(liste);	
			this.setNbCoup(this.nbCoup +1);
		}
	}		
//Fonction qui effectue un mouvement en fonction d'une touche		
	move(touche, liste, p, table){
		if(touche != "ArrowLeft" && touche != "ArrowUp" && touche != "ArrowRight" && touche != "ArrowDown" ){
			p.innerHTML = "Cette touche n'est pas valide, vous devez utiliser les flèches pour vous diriger";
		}
		else{
			if(touche == "ArrowLeft" && this.position%table.nbColonnes!=0){
			this.change(this.position - 1, liste,table);
			}
			if(touche == "ArrowRight" && this.position %table.nbColonnes !=(table.nbColonnes-1)){
				this.change(this.position + 1, liste, table);
			}
			if(touche == "ArrowDown" && this.position <table.nbColonnes*(table.nbLignes-1)){
				this.change(this.position + table.nbColonnes, liste, table);
			}
			if(touche == "ArrowUp" && this.position >table.nbColonnes-1){	
				this.change(this.position - table.nbColonnes, liste, table);
			}						
		}
	}
}