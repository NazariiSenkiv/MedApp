import { Pipe, PipeTransform } from '@angular/core';
import { DataProvider } from '../interfaces/data-provider';

@Pipe({
  name: 'filterDataprovider'
})
export class FilterDataproviderPipe implements PipeTransform {

  transform(items: DataProvider[], searchText: string): DataProvider[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item =>
      item.name.toLowerCase().includes(searchText) ||
      item.type.toLowerCase().includes(searchText)
    );
  }

}
