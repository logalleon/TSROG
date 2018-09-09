"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_data_1 = require("./language.data");
const Random_1 = require("./Random");
const Prop_data_1 = require("../Entity/Prop/Prop.data");
class Legendary {
    constructor() {
        // Load language libraries
        this.lists = Object.assign({}, language_data_1.LegendaryData, Prop_data_1.weaponData, Prop_data_1.materialData);
    }
    /**
     * Does things similar to parse, but retrieves the arbitrary data object
     */
    retrieve(source) {
        const lists = source.match(/\[.+\]/g);
        let selection;
        lists.forEach((listGroup) => {
            const listReferences = listGroup.split('|');
            let results = [];
            let weighted = false;
            listReferences.forEach((listReference) => {
                let [accessor] = listReference.match(/([a-zA-Z\^\.[0-9])+/);
                accessor = accessor.replace('[', '').replace(']', '');
                const result = this.deepDiveRetrieve(accessor);
                results.push(result);
                if (result.val && result.val.indexOf('^') !== -1) {
                }
                else if (result.indexOf('^') !== -1) {
                    weighted = true;
                }
            });
            selection = weighted ? Random_1.weightedPluck(results) : Random_1.pluck(results);
        });
        return selection;
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
    parse(source) {
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
    parseLists(lists, source) {
        lists.forEach((listGroup) => {
            const listReferences = listGroup.split('|');
            let results = [];
            let weighted = false;
            listReferences.forEach((listReference) => {
                let [accessor] = listReference.match(/([a-zA-Z\s\^\.[0-9])+/);
                let scalar;
                // Parse out the scalar for frequency
                if (accessor.indexOf('^')) {
                    [accessor, scalar] = accessor.split('^');
                }
                accessor = accessor.replace('[', '').replace(']', '');
                const result = this.deepDive(accessor);
                if (scalar) {
                    weighted = true;
                    results.push(`${result}^${scalar}`);
                }
                else {
                    results.push(result);
                }
            });
            source = source.replace(listGroup, weighted ? Random_1.weightedPluck(results) : Random_1.pluck(results));
        });
        return source;
    }
    parseAdHocLists(adHocLists, source) {
        adHocLists.forEach((listGroup) => {
            const choices = listGroup.replace(/\{/g, '').replace(/\}/g, '').split('|');
            let results = [];
            let weighted = false;
            choices.forEach((choice) => {
                const [result] = choice.match(/([a-zA-Z\s\^\.0-9])+/);
                results.push(result);
                if (result.indexOf('^') !== -1) {
                    weighted = true;
                }
            });
            source = source.replace(listGroup, weighted ? Random_1.weightedPluck(results) : Random_1.pluck(results));
        });
        return source;
    }
    /**
     * Recursively unfurl an object
     * @param accessor {string}
     */
    deepDive(accessor) {
        let selections = [];
        let a;
        let ref = this.lists;
        if (accessor.indexOf('.') !== -1) {
            a = accessor.split('.');
            a.forEach((k) => {
                ref = ref[k];
            });
        }
        else {
            ref = ref[accessor];
        }
        const diveIn = (swimmingPool) => {
            if (Array.isArray(swimmingPool)) {
                selections = selections.concat(swimmingPool);
            }
            else if (typeof swimmingPool === 'object') {
                const keys = Object.keys(swimmingPool);
                keys.forEach((key) => {
                    diveIn(swimmingPool[key]);
                });
            }
            else {
            }
        };
        diveIn(ref);
        return Random_1.pluck(selections);
    }
    /**
     * Recursively unfurl and object
     * @param accessor {string}
     */
    deepDiveRetrieve(accessor) {
        let selections = [];
        let a;
        let ref = this.lists;
        if (accessor.indexOf('.') !== -1) {
            a = accessor.split('.');
            a.forEach((k) => {
                ref = ref[k];
            });
        }
        else {
            ref = ref[accessor];
        }
        const diveIn = (swimmingPool) => {
            if (Array.isArray(swimmingPool)) {
                selections = selections.concat(swimmingPool);
            }
            else if (typeof swimmingPool === 'object') {
                // This is for fetching datastructures from legendary
                if (swimmingPool.val) {
                    selections.push(swimmingPool);
                }
                else {
                    const keys = Object.keys(swimmingPool);
                    keys.forEach((key) => {
                        diveIn(swimmingPool[key]);
                    });
                }
            }
            else {
            }
        };
        diveIn(ref);
        return Random_1.pluck(selections);
    }
}
exports.Legendary = Legendary;
//# sourceMappingURL=Legendary.js.map