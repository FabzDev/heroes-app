import { Pipe, PipeTransform } from "@angular/core";
import { Hero } from "../interfaces/heroes.interface";

@Pipe({ name: 'heroCardImg' })
export class CardImgPipe implements PipeTransform{

  transform(hero: Hero): string {

    if (!hero.id && !hero.alter_img) return 'assets/no-image.png'

    if (hero.alter_img) return hero.alter_img

    return "assets/heroes/" + hero.id + ".jpg";
  }

}
