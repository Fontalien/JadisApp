📚 Projet DevOps : API de bibliothèque numérique (sans base de données)

🎯 Objectif
===========

Développer une API REST en Node.js + Express pour gérer une bibliothèque numérique avec des données stockées en mémoire (fichiers JSON ou tableaux JS), et mettre en place un pipeline CI/CD sur Azure DevOps.

🔗 Liens utiles
===============

📁 Repository Azure DevOps : https://projetdevops29@dev.azure.com/projetdevops29/projetDevOps29/\_git/projetDevOps29

🚀 Déploiement Azure Web App : [https://projetgroup29-c5c4eta8bghfdqb2.germanywestcentral-01.azurewebsites.net](https://projetgroup29-c5c4eta8bghfdqb2.germanywestcentral-01.azurewebsites.net/)

🚧 État d’avancement
====================

Fonctionnalité

État

API Livres: Terminé

API Utilisateurs: Terminé

API Emprunts: Terminé

API Export CSV: Terminé

Tests unitaires: Terminé

Tests d’intégration: Terminé

Pipeline CI/CD: Terminé

Documentation README: Terminé

📄 Instructions de déploiement
==============================

1\. Cloner le repo :

git clone https://projetdevops29@dev.azure.com/projetdevops29/projetDevOps29/\_git/projetDevOps29

2\. Installer les dépendances :

npm install

3\. Lancer les tests :

npm test

4\. Déploiement automatique :

\- À chaque push sur la branche main, le pipeline Azure DevOps :

\- Lance les tests

\- Déploie l’application sur Azure Web App

👥 Répartition des rôles
========================

Fontana Aurélien: API Livres + Tests

Duchene Lucas: API Utilisateurs + CI/CD

Belbachir Moulay: API Emprunts + Documentation

Ahandoc Mohamed: Export csv

Conclusion
==========

Fontana Aurelien : La principale difficulté que j’ai rencontré fut lors du merge de nos branches vers master

Duchene Lucas :

Belbachir Moulay :

Ahandoc Mohamed :