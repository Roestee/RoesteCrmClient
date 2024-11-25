import { AccountModel } from './account.model';
import { ContactModel } from './contact.model';
import { LeadSourceModel } from './lead.source.model';
import { SalutationModel } from './salutation.model';

export class ContactEnumsModel {
  leadSources: LeadSourceModel[] = [];
  salutations: SalutationModel[] = [];
  accounts: AccountModel[] = [];

  model: ContactModel = new ContactModel();
}
