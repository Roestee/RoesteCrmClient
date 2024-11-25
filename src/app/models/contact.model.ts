import { AccountModel } from './account.model';
import { AddressModel } from './address.model';
import { LeadSourceModel } from './lead.source.model';
import { SalutationModel } from './salutation.model';
import { UserModel } from './user.model';

export class ContactModel {
  id: string = '';
  firstName: string = '';
  middleName?: string = '';
  lastName: string = '';
  title?: string = '';
  email: string = '';
  phone?: string = '';
  description?: string = '';
  department?: string = '';
  website?: string = '';

  createdDate: string = '';
  modifiedDate: string = '';

  mailingAddress: AddressModel = new AddressModel();
  otherAddress: AddressModel = new AddressModel();

  leadSourceId: string = '';
  salutationId: string = '';
  accountId: string = '';
  contactOwnerId: string = '';
  createdById: string = '';
  modifiedById: string = '';

  leadSource: LeadSourceModel = new LeadSourceModel();
  salutation: SalutationModel = new SalutationModel();
  account: AccountModel = new AccountModel();
  contactOwner: UserModel = new UserModel();
  createdBy: UserModel = new UserModel();
  modifiedBy: UserModel = new UserModel();

  fullName: string = '';

  constructor() {
    this.fullName = `${this.firstName} ${this.middleName ?? ''} ${
      this.lastName
    }`;
  }
}
