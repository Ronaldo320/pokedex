import { Pipe, PipeTransform } from '@angular/core';
import PokedexVersionModel from 'src/app/core/services/pokedex-version/pokedex-version.model';

@Pipe({
  name: 'pokemonImageUrl',
})
export class PokemonImageUrlPipe implements PipeTransform {
  transform(position: number, pokedexVersion: PokedexVersionModel): string {
    // Forzamos la URL a minúsculas para que Azure (Linux) encuentre la carpeta
    const baseUrl = pokedexVersion.sprites.url.toLowerCase();
    return `${baseUrl}/${position}.gif`;
  }
}
