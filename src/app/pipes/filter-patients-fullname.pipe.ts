import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../interfaces/user';

@Pipe({
  name: 'filterPatientsFullname',
})
export class FilterPatientsFullnamePipe implements PipeTransform {

  transform(items: UserModel[], searchText: string): UserModel[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item =>
      item.name.toLowerCase().includes(searchText) ||
      item.surname.toLowerCase().includes(searchText)
    );
  }

}
