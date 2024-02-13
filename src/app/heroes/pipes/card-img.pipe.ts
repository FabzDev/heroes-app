import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'heroCardImg' })
export class HeroCardImgPipe implements PipeTransform{

  transform(value: string): string {
   return "assets/heroes/" + value + ".jpg";
  }

}
