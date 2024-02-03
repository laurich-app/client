#!/bin/sh

# Vérifier si le dossier source a été spécifié en tant qu'argument
if [ -z "$1" ]; then
  echo "Erreur : Le dossier source n'a pas été spécifié."
  echo "Utilisation : $0 chemin_du_dossier_source"
  exit 1
fi

# Dossier source passé en paramètre
source_folder="$1"

/scripts/change-env.sh "$source_folder"
nginx -g "daemon off;"