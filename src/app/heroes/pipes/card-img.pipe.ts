import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'cardImg' })
export class CardImgPipe implements PipeTransform{

  transform(value: string): string {
   return "assets/heroes/" + value + ".jpg";
  }

}
