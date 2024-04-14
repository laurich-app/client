import { NotificationEtatEnum } from '../../../enums/notification_etat.enum';
import { NotificationFonctionEnum } from '../../../enums/notification_fonction.enum';
import { NotificationTypeEnum } from '../../../enums/notification_type.enum';

export interface NotificationResponseDTO {
  _id: string;
  email: string;
  pseudo: string;
  date_creation: string;
  etat: NotificationEtatEnum;
  type: NotificationTypeEnum;
  fonction: NotificationFonctionEnum;
}
