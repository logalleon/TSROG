import { Legendary } from './Legendary';

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
const L = new Legendary();

const source1 = '[animals] is my favorite animal.';
const source2 = '[mammals|reptiles] is cool, too.';
const source3 = '[animals.mammals|mammals^10] is a mammal.';
const source4 = '{something cool|anything^10|nothing^.1} will happen.';

console.log(L.parse(source1));
console.log(L.parse(source2));
console.log(L.parse(source3));
console.log(L.parse(source4));