#!/bin/sh

# Vérifier si le dossier source a été spécifié en tant qu'argument
if [ -z "$1" ]; then
  echo "Erreur : Le dossier source n'a pas été spécifié."
  echo "Utilisation : $0 chemin_du_dossier_source"
  exit 1
fi

# Dossier source passé en paramètre
source_folder="$1"

# Appliquer envsubst aux fichiers .js de manière récursive
find "$source_folder" -type f -name "*.js" | while read -r file; do
  echo "Traitement du fichier : $file"
	# Il faut préciser chaque variable d'environnement aussi, afin de ne pas avoir de conflict avec les variables existantes.
  envsubst '$API_URL' < "$file" > "$file.tmp" && mv "$file.tmp" "$file"
done

echo "Terminé !"
exit 0