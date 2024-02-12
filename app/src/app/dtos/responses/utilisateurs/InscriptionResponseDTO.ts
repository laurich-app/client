export interface InscriptionResponseDTO {
  tokenDTO: {
    access_token: string;
    refresh_token: string;
  };
  utilisateur: {
    id: string;
    pseudo: string;
    email: string;
  };
}
