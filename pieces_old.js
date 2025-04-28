// Récupération des pièces depuis le fichier JSON fetch = récuperer
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

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
 }

 /*  listener au bouton “Trier par prix croissants” puis trier avec sort */
 const boutonTrier = document.querySelector(".btn-trier");

 /* copier la liste avec array.from et trier avec sort  */
 boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
 });

 /*  listener au bouton “Filtrer les pièces non abordables” puis filtrer avec filter */
 const boutonFiltrer = document.querySelector(".btn-filtrer");

 boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.prix <= 35;
    });
    console.log(piecesFiltrees);
});

 /*  listener au bouton “décroissant” puis trier avec sort */
 const boutonDecroissant = document.querySelector(".btn-decroissant");

 boutonDecroissant.addEventListener("click", function () {
     const piecesOrdonnees = Array.from(pieces);
 
     piecesOrdonnees.sort(function (a, b) {
         return  b.prix - a.prix;
     });
     console.log(piecesOrdonnees);
 })
 
/*  listener au bouton “description” puis filtrer avec filter */
const boutonNoDescription = document.querySelector(".btn-no-description");

boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.description
    });
    console.log(piecesFiltrees);
});

/* MAPER => Generer la liste des pièces */
const noms = pieces.map(pieces => pieces.nom);

for (let i = pieces.length -1 ; i >= 0; i--){
    if (pieces[i].prix > 35){
        noms.splice(i,1)
    }        
} console.log(noms) 

/* créer la liste  PIECES ABORDABLES*/
const abordablesElements = document.createElement('ul');
/* ajout de chaque nom à la liste */
for(let i = 0; i < noms.length; i++ ) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
/* raccrocher cette liste au parent */
document.querySelector(".abordables").appendChild(abordablesElements)

/* Generer la liste des pièces  PIECES DISPONIBLES*/
const nomsDisponibles = pieces.map(pieces => pieces.nom)
const prixDisponibles = pieces.map(pieces => pieces.prix)

/* ajout de chaque nom à la liste */
for (let i = pieces.length -1; i >= 0; i--) {
    if (pieces[i].disponibilite == false){
        nomsDisponibles.splice(i,1)
        prixDisponibles.splice(i,1)        
    }      
} console.log(noms)

/* créer la liste ul */
const disponiblesElements = document.createElement('ul');
/* ajout de chaque nom à la liste */
for(let i = 0; i < nomsDisponibles.length; i++ ) {
    const nomPrixElement = document.createElement('li');
    nomPrixElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
/* raccrocher cette liste au parent */
    disponiblesElements.appendChild(nomPrixElement);    
} 
document.querySelector(".disponibles").appendChild(disponiblesElements)


/* PROPRIETE innerHTML CREER DU CODE HTML*/
document.body.innerHTML = '<article>'
    + '<img src="' + piece.image + '" />'
    + '<h2>' + piece.nom + '</h2>'
    // ...
    + '</article>'

    /* PROPRIETE innerHTML EFFACER LE CONTENU D'UNE BALISE ET DE LA PAGE WEB*/ 
    document.querySelector(".fiches").innerHTML = '';
	











    





