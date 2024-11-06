import { AccountTypeModel } from './account.type.model';
import { AddressModel } from './address.model';
import { ContactModel } from './contact.model';
import { IndustryModel } from './industry.model';
import { OpportunityModel } from './opportunities.model';
import { UserModel } from './user.model';

export class AccountModel {
  id: string = '';
  name: string = '';
  email: string = '';
  website?: string = '';
  description?: string = '';
  phone?: string = '';

  createdDate: string = '';
  modifiedDate: string = '';

  industryId: string = '';
  accountOwnerId: string = '';
  createdById: string = '';
  modifiedById: string = '';
  accountTypeId: string = '';

  billingAddress: AddressModel = new AddressModel();
  shippingAddress: AddressModel = new AddressModel();
  accountOwner: UserModel = new UserModel();
  industry: IndustryModel = new IndustryModel();
  accountType: AccountTypeModel = new AccountTypeModel();
  createdBy: UserModel = new UserModel();
  modifiedBy: UserModel = new UserModel();

  contacts?: ContactModel[];
  opportunities?: OpportunityModel[];
}
