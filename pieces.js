// Pour que l’ajout de la fonction  ajoutListenersAvis ne génère pas d’erreur, nous devons l’importer avant de l’utiliser. Cet import doit être réalisé à la première ligne du fichier :
// importer la fonction de avis.js : 

import { ajoutListenersAvis, ajoutListenersEnvoyerAvis } from "./avis.js";


// Récupération des pièces depuis le fichier JSON fetch = récuperer
const reponse = await fetch('http://localhost:8081/pieces/');
const pieces = await reponse.json();
// On appelle la fonction pour ajouter le listner au formulaire
ajoutListenersEnvoyerAvis()

function genererPieces(pieces){
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];

        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;

        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;

        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";

        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

        /* BOUTON AVIS */
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
       
    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);

    // On rattache les propriétés à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);    
    //Ajout des éléments au DOM pour l'exercice
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);
   
    //Ajout BOUTON AVIS
    pieceElement.appendChild(avisBouton);
 }
 // Ajout de la fonction ajoutListenersAvis
 ajoutListenersAvis();
 
}

genererPieces(pieces);

/* GESTION DES BOUTONS */
 /*  listener au bouton “Trier par prix croissants” puis trier avec sort */
 const boutonTrier = document.querySelector(".btn-trier");

 /* copier la liste avec array.from et trier avec sort  */
 boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
 });

 /*  listener au bouton “Filtrer les pièces non abordables” puis filtrer avec filter */
 const boutonFiltrer = document.querySelector(".btn-filtrer");

 boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

 /*  listener au bouton “décroissant” puis trier avec sort */
 const boutonDecroissant = document.querySelector(".btn-decroissant");

 boutonDecroissant.addEventListener("click", function () {
     const piecesOrdonnees = Array.from(pieces);
 
     piecesOrdonnees.sort(function (a, b) {
         return  b.prix - a.prix;
     });
     document.querySelector(".fiches").innerHTML = "";
     genererPieces(piecesOrdonnees);
 })
 
/*  listener au bouton “description” puis filtrer avec filter */
const boutonNoDescription = document.querySelector(".btn-no-description");

boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.description
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

/* MAPER => Generer la liste des pièces */
const noms = pieces.map(pieces => pieces.nom);

for (let i = pieces.length -1 ; i >= 0; i--){
    if (pieces[i].prix > 35){
        noms.splice(i,1)
    }        
} console.log(noms) 

/* CREATION DE L'EN-TETE */
const pElement = document.createElement('p')
pElement.innerText = "Pièces abordables";

/* créer la liste  PIECES ABORDABLES*/
const abordablesElements = document.createElement('ul');
/* ajout de chaque nom à la liste */
for(let i = 0; i < noms.length; i++ ) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
/* raccrocher cette liste au parent */
document.querySelector(".abordables")
.appendChild(pElement)
.appendChild(abordablesElements)

/* Generer la liste des pièces  PIECES DISPONIBLES*/
const nomsDisponibles = pieces.map(pieces => pieces.nom)
const prixDisponibles = pieces.map(pieces => pieces.prix)

/* ajout de chaque nom à la liste */
for (let i = pieces.length -1; i >= 0; i--) {
    if (pieces[i].disponibilite == false){
        nomsDisponibles.splice(i,1)
        prixDisponibles.splice(i,1)        
    }      
} 

/* créer la liste ul */
const disponiblesElements = document.createElement('ul');

/* ajout de chaque nom à la liste */
for(let i = 0; i < nomsDisponibles.length; i++ ) {
    const nomPrixElement = document.createElement('li');
    nomPrixElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
/* raccrocher cette liste au parent */
    disponiblesElements.appendChild(nomPrixElement);    
} 

const pElementDisponible = document.createElement('p')
pElementDisponible.innerText = "Pièces disponibles:";
document.querySelector('.disponibles').appendChild(pElementDisponible).appendChild(disponiblesElements)

/*EXERCICE : ajoutez une balise input de type range dans la page web, représentant le prix maximum pour filtrer les pièces : 
valeur min : 0
valeur max : 60
step: 5.*/

/* CREATION DE L'EN-TETE */
const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
})



