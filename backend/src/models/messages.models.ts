export interface Message {
  id: number;
  destinateurId: number;
  destinataireId: number;
  contenu: string;
  createdAt: Date;
}