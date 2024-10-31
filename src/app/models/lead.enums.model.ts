import { IndustryModel } from './industry.model';
import { LeadModel } from './lead.model';
import { LeadSourceModel } from './lead.source.model';
import { LeadStatusModel } from './lead.status.model';
import { RatingModel } from './rating.model';
import { SalutationModel } from './salutation.model';

export class LeadEnumsModel {
  leadStatuses: LeadStatusModel[] = [];
  leadSources: LeadSourceModel[] = [];
  ratings: RatingModel[] = [];
  salutations: SalutationModel[] = [];
  industries: IndustryModel[] = [];
  model: LeadModel = new LeadModel();
}
