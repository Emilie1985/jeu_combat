$(function(){
	const tableau = new Grille(10,10);
	tableau.initGrille();
//Donner à chaque case la classe "libre"
	$("td").each(function(index){  
		$("td:eq("+index+")").addClass("libre");
	})
//Placement des 10 cases grises du début
	for(let i = 0; i < 10; i++) {
		tableau.griserCase();
	}	
//Création des armes
	const hache = new Arme(null, 10, "hache");
	const arc = new Arme(null, 15, 'arc'); 
	const colt = new Arme(null, 20, "colt");
	const laser = new Arme(null, 25, "laser"); 
	const armes = [];
	armes.push(hache, arc, colt, laser);
	tableau.placerArmes(armes, 4);
//Création de 2 joueurs	
	const joueur1 = new Joueur("Dave", "pion1", null, null, null, hache); 
	const joueur2 = new Joueur('Jimmy', "pion2", null, null, null, hache);
//Apparition des 2 joueurs
	joueur1.placerJoueurDebut(tableau);
	joueur2.placerJoueurDebut(tableau);
//afficher le resultat de la description dans le paragraphe
	const p_joueur1 = document.getElementById("joueur1");
	const p_joueur2 = document.getElementById("joueur2");
	const en_cours = document.getElementById("en_cours");
	const p_combat = document.getElementById("combat");
	p_joueur1.innerHTML = joueur1.decrire();
	p_joueur2.innerHTML = joueur2.decrire();
	joueur1.setNbCoup(0);
	joueur1.choix3(tableau);
	en_cours.innerHTML = joueur1.pseudo + " c'est à vous de commencer.</br>Il vous reste 3 coups.";
	keyPress(joueur1, joueur2, armes, p_combat, en_cours, p_joueur1, p_joueur2, tableau);
});
