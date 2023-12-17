import { Pipe, PipeTransform } from '@angular/core';
import { AnalysisShortInfo } from '../interfaces/analysis';

@Pipe({
  name: 'filterFullname'
})
export class FilterFullnamePipe implements PipeTransform {
  
  transform(items: AnalysisShortInfo[], searchText: string): AnalysisShortInfo[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item =>
      item.patient_name.toLowerCase().includes(searchText) ||
      item.patient_surname.toLowerCase().includes(searchText)
    );
  }

}
