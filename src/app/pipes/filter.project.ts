import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../projects/project';

@Pipe({
    name: 'filterProject',
    pure: false
})
export class FilterProjectPipe implements PipeTransform {
    transform(items: any[], filter: Project): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item.tema.toLowerCase() == filter.tema.toLowerCase());
    }
}