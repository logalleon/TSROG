import { FloorOptions, FloorPersistance } from './Floor';
import { Range } from '../Random/Dice';
import Game from '../Game';
import { MAX_DUNGEON_DEPTH } from './DungeonGenerator';
import { DeityNames } from '../Data/Deity';
import { MaterialType } from '../Entity/Prop/Prop.data';

import { floorOptions as LFO } from './Regions/Lorlerach'

let floorData: FloorOptions[] = [];
floorData = floorData.concat(LFO);

export { floorData }