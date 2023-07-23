import { Injectable } from '@angular/core';
import { EnumModel } from 'src/app/models/enum.model';
import { SelectOptionModel } from 'src/app/models/select.option.model';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  public transformObjectToSelectOptions(models : any[], nameProperty : string, 
    valueProperty : string): SelectOptionModel[] {

    let options : SelectOptionModel[] = [];
    for(let i=0; i<models.length; i++) {

      let model = models[i];
      if(typeof model !== 'object' || model === null) {
        options.push({
          name : model,
          value : model
        });
        continue;
      }

      if (!model[nameProperty] || !model[valueProperty]) {
        return null;
      }
      options.push({
        name : model[nameProperty],
        value : model[valueProperty]
      });
    }
    return options;
  }

}