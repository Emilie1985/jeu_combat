class Grille {
	constructor(nbLignes, nbColonnes){
		this.nbLignes = nbLignes;
		this.nbColonnes = nbColonnes;
		this.nbCases = this.nbLignes * this.nbColonnes;
	}
	initGrille(){	
		let lignes;
		let colonnes;
		for(let i=0; i<this.nbColonnes; i++){
			colonnes+='<td></td>';
		}
		for(let i=0; i<this.nbLignes; i++){
			lignes += "<tr>"+colonnes+"</tr>"
		}
		$("#grille").append(lignes);
	}
	//Fonction qui grise une case aleatoire
	griserCase(numeroAleatoire) {
		numeroAleatoire =  Math.round(Math.random()*this.nbCases)-1;
			//si la case ou les cases autour sont libres changer la class en "prise"
		if(this.around(numeroAleatoire)==true){
			$("td:eq("+numeroAleatoire+")").removeClass("libre").addClass("prise");
			//sinon recommencer
		}
		else{
			this.griserCase(numeroAleatoire);
		}
	}
	around(number){
		if(number >=0 && ((number > (this.nbColonnes-1) && number <(this.nbColonnes *(this.nbLignes-1)) && classCase(number) == "libre" && classCase(number - 1) == "libre" && classCase(number + 1) =="libre" && classCase(number-this.nbColonnes) =="libre" && classCase(number+this.nbColonnes) =="libre")
			|| (number<this.nbColonnes && number!=0 && classCase(number) == "libre" && classCase(number- 1) == "libre" && classCase(number + 1) =="libre" && classCase(number+this.nbColonnes) =="libre")
			|| (number ==0 && classCase(number) == "libre" && classCase(number + 1) =="libre" && classCase(number+this.nbColonnes) =="libre")
			|| (number > (this.nbColonnes*(this.nbLignes-1)-1) && number !=((this.nbColonnes*this.nbLignes)-1) && classCase(number) == "libre" && classCase(number - 1) == "libre" && classCase(number + 1) =="libre" && classCase(number-this.nbColonnes) =="libre")
			|| (number ==this.nbCases-1 && classCase(number) == "libre" && classCase(number - 1) == "libre" && classCase(number-this.nbColonnes) =="libre"))){
			return true;
		}
		else{
			return false;
		}
	}
	//Fonction pour choisir le nombre d'armes à positionner
	placerArmes(armes, nbArme){
		for (let i = 0; i < nbArme; i++){
			armes[i].placerArme(this);
		}
	}
}