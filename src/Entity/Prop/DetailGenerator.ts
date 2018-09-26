import { Quality } from "./Prop.data";
import { Random } from "ossuary";

class DetailGenerator {

  getNumberOfDetails (quality: Quality): number {
    switch (quality) {
      case Quality.RUINED:
      case Quality.POOR:
        return Random.randomInt(1, 3);
      case Quality.FAIR:
      case Quality.COMMON:
        return Random.randomInt(1, 4);
      case Quality.GOOD:
      case Quality.EXCEPTIONAL:
        return Random.randomInt(2, 5);
      case Quality.LEGENDARY:
        return Random.randomInt(5, 7);
      case Quality.MYTHICAL:
        return Random.randomInt(6, 10);
    }
  }

}

export { DetailGenerator };