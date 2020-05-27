//Création de la classe Arme 
class Arme {
	constructor(position, degat, nom){
		this.position = position;
		this.degat = degat ;
		this.nom = nom ;
	}
	setPosition(newPosition, table){
		if(typeof newPosition == "number" && newPosition >=0 && newPosition<(table.nbCases)){
			this.position = newPosition;
		}
		else{
			console.log("newPosition doit être un nombre entre 0 et 99");
		}
	}
	placerArme(table) {
		this.setPosition(Math.round(Math.random()*table.nbCases)-1, table);
		if(table.around(this.position)==true){
			$("td:eq("+this.position+")").removeClass("libre").addClass(this.nom).addClass("arme");
		}
		else {
			this.placerArme(table);
			}
	}
}