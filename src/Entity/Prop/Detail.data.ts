import { Quality, MaterialType, Material, MaterialSubtype } from "./Prop.data";
import Game from "../../Game";
import { Random } from "ossuary";

type PhraseFn = (quality: Quality, game: Game) => string;
type DetailFn = (materials?: Material[] | MaterialType[]) => PhraseFn;

enum Descriptors {
  RUINED = '{ruined|damaged|destroyed}',
  TIME_AGO = '{appears to have long ago|has since|has long ago}',
  NOT_EVER = '{no longer|not|will never again be}',
  GLORIOUS = '{glorious|wondrous|beautiful|enchanting|captivating}',
  SEVERELY = '{severly|badly|intensely|extremely|highly}',
  RUSTED = '{is coated in coarse rust|is almost rusted through|is tinged with rust|is rusted}'
}

const parseMaterial = (materials: Material[] | MaterialType[], game: Game): Material => {
  const material: Material | MaterialType = Random.pluck(materials);
  let m: any = {};
  // It's only a material type, choose the subtype
  if (!(<Material>material).subtype) {
    m.type = <MaterialType>material;
    m.subtype = <MaterialSubtype>(game.legendary.parse(`[materials.${material}]`));
    return <Material>m;
  } else {
    return <Material>material;
  }
}

// Details
const Inlaid: DetailFn = (materials?: Material[] | MaterialType[]) => {
  return (quality: Quality, game: Game): string => {
    let material; // @TODO factor this out - this is tedious
    if (materials) {
      material = parseMaterial(materials, game);
    }
    let str = '';
    switch (quality) {
      case Quality.RUINED:
      case Quality.POOR:
        str += `was inlaid with some kind of ${material.type}, `;
        str += `but ${Descriptors.TIME_AGO} been ${Descriptors.RUINED}.`;
        return str;
      case Quality.FAIR:
      case Quality.COMMON:
      case Quality.GOOD:
      case Quality.EXCEPTIONAL:
      case Quality.LEGENDARY:
      case Quality.MYTHICAL:
        return '1';
    }
  }
}

const Embroidered: DetailFn = (materials?: Material[] | MaterialType[]) => {
  return (quality: Quality, game: Game): string => {
    let material;
    if (materials) {
      material = parseMaterial(materials, game);
    }
    let str = '';
    switch (quality) {
      case Quality.RUINED:
      case Quality.POOR:
        str += `was embroided with some kind of ${material.type}, `;
        str += `but the threads are ${Descriptors.NOT_EVER} ${Descriptors.GLORIOUS} and are now ${Descriptors.RUINED}.`;
        return str;
      case Quality.FAIR:
      case Quality.COMMON:
      case Quality.GOOD:
      case Quality.EXCEPTIONAL:
      case Quality.LEGENDARY:
      case Quality.MYTHICAL:
        return '125125';
    }
  }
}

const Scratched: DetailFn = (materials?: Material[] | MaterialType[]) => {
  return (quality: Quality, game: Game): string => {
    let material;
    if (materials) {
      material = parseMaterial(materials, game);
    }
    let str = '';
    switch (quality) {
      case Quality.RUINED:
      case Quality.POOR:
        str += `is ${Descriptors.SEVERELY} ${Descriptors.RUINED}.`
        return str;
      case Quality.FAIR:
      case Quality.COMMON:
      case Quality.GOOD:
      case Quality.EXCEPTIONAL:
      case Quality.LEGENDARY:
      case Quality.MYTHICAL:
        return '1252';
    }
  }
}

const Rusted: DetailFn = (materials?: Material[] | MaterialType[]) => {
  return (quality: Quality, game: Game): string => {
    let material;
    if (materials) {
      material = parseMaterial(materials, game);
    }
    let str = '';
    switch (quality) {
      case Quality.RUINED:
      case Quality.POOR:
        str += `is ${Descriptors.RUSTED}.`
        return str;
      case Quality.FAIR:
      case Quality.COMMON:
      case Quality.GOOD:
      case Quality.EXCEPTIONAL:
      case Quality.LEGENDARY:
      case Quality.MYTHICAL:
        return '1252';
    }
  }
}


export {
  DetailFn,
  PhraseFn,
  Inlaid,
  Embroidered,
  Scratched
}