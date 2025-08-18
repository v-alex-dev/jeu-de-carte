# Jeu de Cartes

Un jeu de cartes interactif développé avec JavaScript vanilla, Vite et Tailwind CSS. Le but du jeu est de trouver la carte correspondante à celle affichée par l'ordinateur en utilisant le système de glisser-déposer.

## Fonctionnalités

- Interface utilisateur moderne et responsive
- Système de glisser-déposer (drag and drop) pour jouer
- Compteur de score en temps réel
- Minuteur par niveau
- Messages de feedback visuels
- Design accessible conforme aux standards WCAG 2 AA

## Comment jouer

1. Cliquez sur "Démarrer le jeu" pour commencer
2. L'ordinateur affiche une carte mystère (marquée "?")
3. Glissez une de vos cartes vers la zone de dépôt au centre
4. Si votre carte correspond à celle de l'ordinateur :
   - Vous gagnez 1 point
   - La carte disparaît de votre main
   - L'ordinateur génère une nouvelle carte
5. Si votre carte ne correspond pas :
   - Vous perdez 1 point (si votre score est supérieur à 0)
   - La carte retourne à sa position initiale
   - L'ordinateur génère une nouvelle carte
6. Utilisez le bouton "Passer" pour changer la carte de l'ordinateur sans jouer

## Conditions de victoire

- Victoire : Trouvez toutes vos cartes avant la fin du temps imparti
- Défaite : Le temps s'écoule avant d'avoir trouvé toutes les cartes

## Installation et développement

### Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone [URL_DU_PROJET]
cd jeu-de-carte

# Installer les dépendances
npm install
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev
```

Le jeu sera accessible à l'adresse `http://localhost:5173`

### Build de production

```bash
# Générer les fichiers de production
npm run build

# Prévisualiser le build de production
npm run preview
```

## Technologies utilisées

- **JavaScript ES6+** : Logique du jeu et interactions
- **Vite** : Outil de build et serveur de développement
- **Tailwind CSS** : Framework CSS pour le styling
- **HTML5** : Structure de base et API Drag and Drop

## Structure du projet

```
src/
├── main.js                 # Point d'entrée de l'application
├── style.css              # Styles CSS principaux
├── services/
│   └── gameService.js     # Logique métier du jeu
├── templates/
│   └── gamesArea.js       # Template HTML du jeu
└── utils/
    ├── askStartGame.js    # Interface de démarrage
    ├── chronometer.js     # Gestion du temps et messages
    ├── displayComputerCard.js  # Affichage carte ordinateur
    ├── displayedPlayerCard.js  # Affichage cartes joueur
    ├── displayUpdater.js  # Mise à jour de l'affichage
    ├── dragAndDrop.js     # Système glisser-déposer
    ├── eventListeners.js  # Gestionnaires d'événements
    ├── gameEnder.js       # Fin de partie
    ├── gameInitializer.js # Initialisation du jeu
    └── timeFormatter.js   # Formatage du temps
```

## Accessibilité

Le jeu respecte les standards d'accessibilité WCAG 2 AA :

- Contrastes de couleurs suffisants (ratio minimum 4.5:1)
- Navigation possible au clavier
- Textes alternatifs appropriés
- Feedback visuel clair pour toutes les interactions

## Contribuer

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
