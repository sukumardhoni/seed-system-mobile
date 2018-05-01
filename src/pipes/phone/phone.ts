import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
 
  transform(val, args) {
   // console.log(val)
    val = val.charAt(0) != 0 ? '' + val : '' + val;
    console.log('pipe' +val) //+2651772428
    let newStr = '';

    for(var i=0; i < (Math.floor(val.length/2) - 2); i++){
       newStr = newStr+ val.substr(i*2, 2) + ' ';
    }
    console.log('pipe' +newStr)
    return newStr+ val.substr(i*2);
}

}
