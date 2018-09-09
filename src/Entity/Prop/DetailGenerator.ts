import { Quality } from "./Prop.data";
import { randomInt } from "../../Random/Random";

class DetailGenerator {

  getNumberOfDetails (quality: Quality): number {
    switch (quality) {
      case Quality.RUINED:
      case Quality.POOR:
        return randomInt(1, 3);
      case Quality.FAIR:
      case Quality.COMMON:
        return randomInt(1, 4);
      case Quality.GOOD:
      case Quality.EXCEPTIONAL:
        return randomInt(2, 5);
      case Quality.LEGENDARY:
        return randomInt(5, 7);
      case Quality.MYTHICAL:
        return randomInt(6, 10);
    }
  }

}

export { DetailGenerator };