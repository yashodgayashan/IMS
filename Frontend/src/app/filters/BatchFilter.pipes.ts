// import { Pipe, PipeTransform, Injectable } from '@angular/core';
// @Pipe({
//     name: 'filter'
// })
// @Injectable()
// export class BatchFilter implements PipeTransform {
//     transform(items: any[], field: string, value: string): any[] {
//         if (!items) {
//             return [];
//         }
//         if (!field || !value) {
//             return items;
//         }
//         return items.filter(singleItem => singleItem[field].toLowerCase().includes(value.toLowerCase()));
//     }
// }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'batch'
})
export class BatchFilter implements PipeTransform {

  transform(items: Array<any>, nameSearch: string, emailSearch: string, indexSearch: string) {
    if (items && items.length) {
      return items.filter(item => {
        if (nameSearch && item.name.toString().toLowerCase().indexOf(nameSearch.toLowerCase()) === -1) {
          return false;
        }
        if (emailSearch && item.email.toLowerCase().indexOf(emailSearch.toLowerCase()) === -1) {
          return false;
        }
        if (indexSearch && item.id.toLowerCase().indexOf(indexSearch.toLowerCase()) === -1) {
          return false;
        }
        return true;
      });
    } else {
      return items;
    }
  }

}