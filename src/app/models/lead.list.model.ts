export class LeadListModel {
  id: string = '';
  fullName: string = '';
  company: string = '';
  city: string = '';
  email: string = '';
  leadStatusName: string = '';
  createdDate: string = '';

  /**
   *
   */
  constructor(
    id: string,
    fullName: string,
    company: string,
    city: string,
    email: string,
    leadStatusName: string,
    createdDate: string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.company = company;
    this.city = city;
    this.email = email;
    this.leadStatusName = leadStatusName;
    this.createdDate = createdDate;
  }
}
