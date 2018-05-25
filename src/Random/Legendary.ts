import { LegendaryData } from './language.data';
import { randomInt, pluck } from './Dice';

class Legendary {

  private lists;

  constructor () {
    // Load language libraries
    this.lists = LegendaryData;
  }

  /**
   * [list] - selects from list, same as ...
   * [list:unique(1)] - selects 1, unique, from list
   * [list:unique(2)] - selects 2, unique, from list
   * [list:any(2)] - selects 2, not unqiue
   * [listA|listB|...listN] - selects 1 from either A..N
   * [listA:any(2).join(' ')] - select 2, join with ' '
   * {A|B} - select A or B
   * [list.sublist] - select 1, unqiue, from sublist
   * {import:list} - specifies that one list belongs to another list
   * {a} - uses a/an on the next word
   * {A} - uses A/An on the next word
   * @param source 
   */
  parse (source: string): string {
    const lists = source.match(/\[.+\]/g);
    const adHocLists = source.match(/\{.+\}/g);
    if (lists) {
      source = this.parseLists(lists, source);
    }
    if (adHocLists) {
      source = this.parseAdHocLists(adHocLists, source);
    }
    return source;
  }

  parseLists (lists: string [], source: string): string {
    lists.forEach((listGroup) => {
      const listReferences = listGroup.split('|');
      let results = [];
      listReferences.forEach((listReference) => {
        const [accessor] = listReference.match(/([a-zA-Z\.])+/);
        const result = this.deepDive(accessor);
        results.push(result);
      });
      source = source.replace(listGroup, pluck(results));
    });
    return source;
  }

  parseAdHocLists (adHocLists: string[], source: string): string {
    return '';
  }

  /**
   * Recursively unfurl and object
   * @param accessor {string}
   */
  deepDive (accessor: string): string {
    let selections = [];
    let a: string|string[];
    let ref: any = this.lists;
    if (accessor.indexOf('.') !== -1) {
      a = accessor.split('.');
      a.forEach((k) => {
        ref = ref[k];
      });
    } else {
      ref = ref[accessor];
    }
    const diveIn = (swimmingPool: any) => {
      if (Array.isArray(swimmingPool)) {
        selections = selections.concat(swimmingPool);
      } else if (typeof swimmingPool === 'object') {
        const keys = Object.keys(swimmingPool);
        keys.forEach((key) => {
          diveIn(swimmingPool[key]);
        });
      } else {
        console.log('Huh?');
      }
    }
    diveIn(ref);
    return pluck(selections);
  }

}
export { Legendary };