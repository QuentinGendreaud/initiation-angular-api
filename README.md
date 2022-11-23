# Angular-Initiation
Ce projet à pour but de réaliser le développement d'une application Angular basique pas à pas pour aborder une partie des notions de base d'Angular.

Le projet sera découpé en deux partie:

## Une application Node
Application basique ayant pour but de servir d'Api.
Un swagger est disponible ici: ***Lien à Ajouter***

## Une application Angular
L'application aura pour but de permettre d'effectuer les actions suivantes:
- Connexion à l'application
- Ajout d'utilisateur
- Administration des utilisateurs (admins)
- Permettre à l'utilisateur de gérer une liste d'équipe (admin)
- Permettre à l'utilisateur de gérer une liste match (admin)
- Permettre à l'utilisateur d'effectuer un pronostique

Une branche pour chaque étape sera mise en place pour permettre de vous débloquer au besoin.

Dans un premier temps, clonez le repertoire git et allez sur la branche `start` qui contiendra l'application node complète ainsi que l'initialisation de la page de connexion

Ce projet utilise Angular Material pour la mise en place de composant graphiques.

Gardez bien au chaud le lien suivant: https://material.angular.io/components/categories

## Pré requis
Liste des pré requis avant de se lancer dans les différentes étapes:
- Installer nodejs (https://nodejs.org/en/download/)
- Installer Angular-cli `npm install -g @angular/cli`
- Installer Express (pour l'api node)
- Faire un `npm install` dans les deux applications (node et angular)

Veuillez vous rendre dans le répertoire des deux applications et lancer la commande `npm run start`.

Cette commande aura pour effet de démarrer les deux serveurs et vous permettra d'accéder à l'application en environnement local

## Etape n°1 - Mise en place de la page de connexion
On souhaite mettre en place la page de connexion, pour se faire on va créer un composant **login.component** pour mettre en place le fonctionnement de notre formulaire 
> La commande `ng generate component login` permettra d'initialiser le composant.

Le formulaire devra afficher une erreur et griser le bouton de connexion dès qu'une des conditions suivantes n'est pas respectée:
- L'identifiant ne doit pas être vide
- Le mot de passe doit faire au moins 6 charactères

On va ensuite déclarer un service pour s'authentifier qui appelera la route '/login' de l'api une fois le formulaire complet

Il faudra ensuite modifier le app-routing.module et créer un guard de sorte à ce que la route vers laquelle on est redirigé soit bien la page d'authentification.

> **Note :** Le app.component.html devra contenir un menu de navigation (vide avant la connexion) ainsi que la ligne suivante `<router-outlet></router-outlet>`
> Si l'envie vous prends, il peut être intéressant de gérer le cas d'erreur d'authentification

### Liens utiles
- Tutoriel Réactives Forms: https://angular.io/guide/reactive-forms
- Guard (utilisation de la méthode canActivate): https://angular.io/api/router/CanActivate
- Tutoriel navigation: https://angular.io/guide/router-tutorial
- Router (documentation du module): https://angular.io/api/router/Router
- Card Material: https://material.angular.io/components/card/overview

### Routes Api à utiliser
- [POST] "/login" ==> Retourne l'utilisateur correspondant ou une erreur si l'utilisateur n'existe pas

## Etape n°2 - Gestion des habilitations des utilisateurs
Cette étape consistera à ajouter un élément au menu de navigation pour les utilisateurs admin uniquement (habilitation utilisateur === 1) et d'afficher une liste d'utilisateur dans un tableau.

La dernière colonne du tableau devra contenir un select permettant de sélectionner le rôle à donner.

L'appel à l'api devra se déclencher dès la modification de la sélection.

Une nouvelle route devra être créé pour accéder au composant d'habilitation des utilisateurs.

Cette route devra être protégé via un AdministratorGuard de sorte à ce qu'il ne soit pas possible d'y accéder avec un utilisateur non habilité

### Liens utiles
- Tutoriel Services: https://angular.io/guide/http
- Tableau Material: https://material.angular.io/components/table/overview

### Routes Api à utiliser
- [GET] "/users"
- [PUT] "/users/:id/habilitation"

## Etape n°3 - Gestion des équipes

Cette étape consiste à créer un écran pour créer les équipes.

Cette fonctionnalité sera reserver aux admins uniquement et devra permettre d'afficher une liste d'équipe, d'en modifier, d'en supprimer et d'en ajouter via un formulaire.

### Routes Api à utiliser
- [GET] "/teams"
- [POST] "/teams"
- [PUT] "/teams"
- [DELETE] "/teams/:id"

### Liens utiles
- Tutoriel Services: https://angular.io/guide/http
- Tableau Material: https://material.angular.io/components/table/overview

## Etape n°4 - Gestion des matchs
Comme pour l'étape 3 on souhaite pouvoir faire une gestion des matchs.

Cette fonctionnalité sera réservé au mode admins

Il sera psosible d'ajotuer, modifer et supprimer des matchs

### Liens utiles
- Tutoriel Services: https://angular.io/guide/http
- Tableau Material: https://material.angular.io/components/table/overview

### Routes Api à utiliser
- [GET] "/matchs"
- [POST] "/matchs"
- [PUT] "/matchs"
- [DELETE] "/matchs/:id"

## Etape n°5 - Gestion des pronostiques
Cette étape consiste en la mise en place de pronostiques.

Cette écran sera accessible à tous les utilisateurs et devra permettre de voir une liste de carte pour les différents matchs programmés.
Pour chacun des rencontre, une code devra apparaitre pour le cas de victoire de l'équipe A, de match nul entre les deux équipes ou de victoire de l'équipe B.

3 boutons devrons être mis en place pour permettre le pronostique

Au chargement de l'écran, l'affichage devra mettre en avant les pronostiques déjà enregistrés

### Liens utiles
- Tutoriel Services: https://angular.io/guide/http
- Card Material: https://material.angular.io/components/card/overview

### Routes Api à utiliser
- [GET] "/matchs/pronostics/:userId"
- [PUT] "/pronostics"
- [POST] "/pronostics"

## Etape n°6 - Mise en place du lazy loading (module admin / module pronostique)
Cette partie consiste en une optimisation de performance de l'application.

Du lazy-loading devra être mis en place pour faire en sorte que les différents modules (administration, pronostiques) ne soient chargés que si nécessaire.

### Liens utiles
- Tutorial Lazy-loading: https://angular.io/guide/lazy-loading-ngmodules

## Etape n°7 - Mise en place tests unitaires
Cette étape consistera en l'implémentation des tests unitaires de notre application.

Pour se faire, je vous invites à jeter un oeil à la documentation suivante: https://jasmine.github.io/pages/docs_home.html

Il sera possible d'executer nos tests à l'aide de la méthode `npm run test`

Dans un optique d'éviter les effets de bords des tests unitaires, il vous faudra mocker les méthodes des services à l'aide des propriétés spyOn de jasmine.

**Cette section sera à compléter**

## Etape n°8 - Mise en place NgRx
Cette étape sera plus une initiation au fonctionnement de NgRx.

A noter que l'implémentation de store management est à faire que dans certains cas **et n'est en aucun cas la règle générale**.

**Cette section sera à compléter**