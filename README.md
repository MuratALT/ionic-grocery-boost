# Grocery Boost

Le projet **Grocery Boost** a été effectué par ALTINDAL Murat, BUT3A.
Ceci est un projet ionic contenant toutes les fonctionnalités demandées.

## Installation

Afin de configurer et d'utiliser l'application il faut :

- Installer les packages avec `npm install`. (Assurez-vous d'avoir ionic sur votre machine)
- Démarrer le serveur avec `ionic serve`.

PS : Étant donné que je suis sur ubuntu, j'ai rencontré un warning qui polluait ma console ionic, c'était une erreur au niveau de npm qui s'affichait dans une boucle infinie. Après quelques recherches, ceci ne serait dû uniquement au niveau de la configuration de la machine. Ainsi, si vous avez cette erreur sur ubuntu, voici la commande à rentrer dans votre terminal : `sudo sysctl fs.inotify.max_user_watches=524288`.

## Build le projet

Voici un guide afin de build le projet vous-même, ce guide est appuyé sur l'OS linux (de préférence de distribution debian) :

- Exécuter la commande `ionic build` afin de build une première fois le projet.
- Puis, exécuter `ionic capacitor build android` afin de le build sous format android.
- Un dossier `android` s'est crée, rendez-vous sur celui-ci puis exécuter la commande `./gradlew assembleDebug` afin de constituer une version release d'un apk Android.
- L'apk est disponible ici : `/android/app/build/outputs/apk/debug/app-debug.apk`
