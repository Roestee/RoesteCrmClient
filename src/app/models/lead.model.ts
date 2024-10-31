import { AddressModel } from './address.model';
import { IndustryModel } from './industry.model';
import { LeadSourceModel } from './lead.source.model';
import { LeadStatusModel } from './lead.status.model';
import { RatingModel } from './rating.model';
import { SalutationModel } from './salutation.model';
import { UserModel } from './user.model';

export class LeadModel {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  title: string = '';
  company: string = '';
  phone: string = '';
  email: string = '';
  website: string = '';
  description: string = '';

  createdDate: string = '';
  modifiedDate: string = '';

  leadOwnerId: string = '';
  leadStatusId: string = '';
  leadSourceId: string = '';
  salutationId: string = '';
  ratingId: string = '';
  industryId: string = '';
  addressId: string = '';
  createdByUserId: string = '';
  modifiedByUserId: string = '';

  leadOwner: UserModel = new UserModel();
  leadStatus: LeadStatusModel = new LeadStatusModel();
  leadSource: LeadSourceModel = new LeadSourceModel();
  salutation: SalutationModel = new SalutationModel();
  rating: RatingModel = new RatingModel();
  address: AddressModel = new AddressModel();
  industry: IndustryModel = new IndustryModel();
  createdBy: UserModel = new UserModel();
  modifiedBy: UserModel = new UserModel();

  [key: string]: any;
}
