import { AccountModel } from './account.model';
import { AccountTypeModel } from './account.type.model';
import { IndustryModel } from './industry.model';

export class AccountEnumsModel {
  industries: IndustryModel[] = [];
  accountTypes: AccountTypeModel[] = [];
  model: AccountModel = new AccountModel();
}
