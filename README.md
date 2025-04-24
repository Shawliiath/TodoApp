TaskMaster
Application de gestion de tâches.
Installation
bash# Créer un nouveau projet Vite
pnpm create vite@latest nom-du-projet
cd nom-du-projet

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm run dev
Fonctionnalités

Gestion des tâches (ajout, modification, suppression)
Thème clair/sombre
Sauvegarde locale des données
Interface responsive

Structure
src/
├── components/      # Composants UI
├── hooks/           # Custom hooks React
├── layouts/         # Mise en page
├── services/        # Logique métier et API
├── styles/          # CSS global et par composant
└── types/           # Types TypeScript
Technologies

React + TypeScript
Vite
CSS custom properties (variables)
localStorage

Licence
MIT