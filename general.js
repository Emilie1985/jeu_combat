//Fonction qui determine la classe d'une case
function classCase(numero){
	return $("td:eq("+numero+")").attr('class');
}
//Fonction qui met en evidence les cases de déplacements possibles	
function casePossible(positionT){
	$("td:eq("+positionT+")").addClass('possible');
}
//Fonction pour demander si le joueur souhaite recommencer
function recommencer(p1, p2){
	p1.innerHTML = "Souhaitez-vous recommencer ? O / N ?  ";
	$(document).keydown(function(event){
		switch(event.key){
			//Si le joueur tape "O" ou "o"
			case "o":
			case "O":
				location.reload();
				break;
			//Si le joueur tape "N" ou "n"	
			case "n":  
			case "N" :
				p2.innerHTML = "";
				p1.innerHTML = "A bientôt !";
				break;
			default : 
				$(p2).css("font-size", "25px");
				p2.innerHTML = "Vous devez rentrer 'O' pour oui ou 'N' pour non."
				recommencer(p1, p2);
				break;	
		}
	})
}
let first;
let other;
function attaque(mainPlayer, otherPlayer){
	otherPlayer.setVie(Math.max(0, otherPlayer.vie - mainPlayer.force));
	first = otherPlayer;
	other = mainPlayer;
}
function defense(mainPlayer, otherPlayer){
	mainPlayer.setVie(Math.max(0, mainPlayer.vie - otherPlayer.force/2));
	first = otherPlayer;
	other = mainPlayer;
}
//Fonction combat lorsque les 2 joueurs se croisent
function battle(joueur1, joueur2, p1, p2, p1_joueur, p2_joueur){
	$(document).off("keydown");
	$("table").css("opacity", 0.5);
	$('#texte').css("background-color", "#FFA07A");
	if(joueur1.vie >0 && joueur2.vie >0){
		p1.innerHTML = first.pseudo + " souhaitez-vous attaquer ou vous défendre ? A / D ? "
		$(document).keydown(function(event){
			p2.innerHTML = "Combat !" ;
			if(event.key == "d" || event.key == "D"){
				defense(first, other);
			}
			else if(event.key == "a" || event.key == "A"){
				attaque(first, other);		
			}
			else{
				p2.innerHTML = "Vous devez saisir D pour défense ou A pour attaque";
			}
			battle(joueur1, joueur2, p1, p2, p1_joueur, p2_joueur);
			p1_joueur.innerHTML = joueur1.decrire();
			p2_joueur.innerHTML = joueur2.decrire();
		})
	}
	else{
		if(joueur1.vie<=0 && joueur2.vie>joueur1.vie){
			p2.innerHTML =  joueur2.pseudo + " vous avez gagné";
		}
		if(joueur2.vie<=0 && joueur2.vie<joueur1.vie){
			p2.innerHTML = joueur1.pseudo + " vous avez gagné.";
		}
		if(joueur1.vie<=0 && joueur2.vie<=0 && joueur1.vie == joueur2.vie){
			p2.innerHTML = "Egalité ! ";
		}
		$('#en_cours').css("font-size", "45px");
		$(document).off("keydown");
		recommencer(p1, p2);
	}			
}
//Fonction pour détecter quand les 2 joueurs sont proches
let fight = 0;	
function testFight(joueur1, joueur2, table){
	if(Math.floor (joueur1.position /table.nbColonnes) == Math.floor(joueur2.position/table.nbColonnes) && Math.abs(joueur1.position - joueur2.position)==1){
		fight = 1 ;
	}	
	if(joueur1.position % table.nbColonnes == joueur2.position % table.nbColonnes && Math.abs(joueur1.position - joueur2.position) == table.nbColonnes){
		fight = 1;
	}
}
function firstStep(mainPlayer, otherPlayer, touche, liste, p2, table){
	mainPlayer.move(touche, liste, p2, table);
	testFight(mainPlayer, otherPlayer, table);
	mainPlayer.choix2(table);
	if(mainPlayer.nbCoup == 1){
		p2.innerHTML = mainPlayer.pseudo + " il vous reste 2 coups."
	}
}
function secondStep(mainPlayer, otherPlayer, touche, liste, p2, table){
	mainPlayer.move(touche, liste, p2, table);
	testFight(mainPlayer, otherPlayer, table);
	mainPlayer.choix1(table);
	if(mainPlayer.nbCoup ==2){
		p2.innerHTML = mainPlayer.pseudo + " il vous reste 1 coup."
	}
}
function thirdStep(mainPlayer, otherPlayer, touche, liste, p2, table){
	mainPlayer.move(touche, liste, p2, table);
	if (mainPlayer.nbCoup == 3){
		otherPlayer.choix3(table);
		otherPlayer.setNbCoup(0);
		p2.innerHTML = mainPlayer.pseudo + " votre tour est fini. </br>" + otherPlayer.pseudo + " c'est à vous il vous reste 3 coups."
	}				
	testFight(mainPlayer, otherPlayer, table);	
}

//Fonction qui se déclenche lorsque l'on presse une touche
function keyPress(joueur1, joueur2, liste, p1, p2, p1_joueur, p2_joueur, table){
	$(document).keydown(function(event){
		if(fight==0){		
			if(joueur1.nbCoup == 0 && joueur2.nbCoup !=2){
				firstStep(joueur1, joueur2, event.key, liste, p2, table);
			}
			else if(joueur1.nbCoup == 1){
				secondStep(joueur1, joueur2, event.key, liste, p2, table);
			}
			else if(joueur1.nbCoup == 2){
				thirdStep(joueur1, joueur2, event.key, liste, p2, table);
			}
			else if(joueur2.nbCoup == 0 && joueur1.nbCoup !=2){	
				firstStep(joueur2, joueur1, event.key, liste, p2, table);
			}
			else if(joueur2.nbCoup ==1){
				secondStep(joueur2, joueur1, event.key, liste, p2, table);
			}
			else if(joueur2.nbCoup == 2){
				thirdStep(joueur2, joueur1, event.key, liste, p2, table);
			}			
		}
		if(fight==1){
			if (joueur1.nbCoup == 1 || joueur1.nbCoup ==2 || (joueur1.nbCoup ==3 && joueur2.nbCoup==0)){
				first = joueur1;
				other = joueur2;
			}
			else{
				first = joueur2;
				other = joueur1;
			}
			p2.innerHTML = "Combat ! ";
			battle(joueur1, joueur2, p1, p2, p1_joueur, p2_joueur);
		}
		p1_joueur.innerHTML = joueur1.decrire();
		p2_joueur.innerHTML = joueur2.decrire();
	})
}