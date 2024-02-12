import { environment } from '../../environments/environment';

export const URI_INSCRIPTION = `${environment.API_URL}/auth/inscription`; // URL to web api
export const URI_CONNEXION = `${environment.API_URL}/auth/connexion`;
export const URI_RAFFRAICHISSEMENT_TOKEN = `${environment.API_URL}/auth/token_raffraichissement`;
export const URI_DECONNEXION = `${environment.API_URL}/auth/deconnexion`;

export const URI_MOI = `${environment.API_URL}/moi`;
export const URI_USERS = `${environment.API_URL}/users`;

export const URI_PRODUITS = `${environment.API_URL}/produits`;
export const URI_CATEGORIES = `${environment.API_URL}/categories`;
export const URI_COMMANDES = `${environment.API_URL}/commandes`;
export const URI_GESTIONNAIRES_COMMANDES = `${environment.API_URL}/gestionnaires/commandes`;
export const URI_PANIERS = `${environment.API_URL}/paniers`;
export const URI_FOURNISSEURS = `${environment.API_URL}/fournisseurs`;
export const URI_BON_DE_COMMANDES = `${environment.API_URL}/bon_de_commandes`;
