import { Pipe, PipeTransform } from '@angular/core';
import { LeadModel } from '../models/lead.model';

@Pipe({
  name: 'lead',
  standalone: true,
})
export class LeadPipe implements PipeTransform {
  transform(value: LeadModel[], search: string): LeadModel[] {
    if (search === '') {
      return value;
    }

    return value.filter(
      (p) =>
        p.firstName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.phone.toString().includes(search) ||
        p.company.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
}
