import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilterPipe implements PipeTransform {

  transform(noteArray: Array<any>, args?: any): any {
    return noteArray.filter((noteObj)=>{
      if(args){
        var flag = true;
        for(var index in args)
        {
          if(noteObj[index] != args[index])
          {
            flag = false;
            break;
          }
        }
        return flag;
      }
      return noteObj.status == 0
    });
  }

}
