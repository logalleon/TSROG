import { FloorOptions, FloorPersistance } from './Floor';
import { Range } from '../Random/Dice';
import Game from '../Game';
import { MAX_DUNGEON_DEPTH } from './DungeonGenerator';
import { MaterialType } from '../Prop/Prop.data';

enum DeityNames {
  Xhsoa = 'Xhsoa',
  Ktipara = 'Ktipara',
  Qirak = 'Qirak',
  Thothr = 'Thothr'
}

interface Deity {
  name: DeityNames,
  alignment: Alignment,
  description: string,
  favors: Subject[],
  disfavors: Subject[]
}

enum RegionNames {
  Lorlerach = 'Lorlerach',
  Jirdenth = 'Jirdenth',
  Emdynusk = 'Emdynusk',
  Peruskkal = 'Peruskkal',
  Oughmoren = 'Oughmoren',
  Ranwarir = 'Ranwarir',
  Lytandel = 'Lytandel',
  Ydra = 'Ydra',
  Burm = 'Burm',
  Iltara = 'Iltara'
}

interface RegionData {
  name: RegionNames,
  description: string
}

const regionData: RegionData[] = [
  {
    name: RegionNames.Lorlerach,
    description: `
      The crypts of Lorlerach quickly descend into lightless tunnels
      and labyrinthine passageways. The walls of this place are decorated
      with horrid depictions of skeletal uprisings and apocalyptic
      raptures where the likes of the living are overthrown by wave
      after wave of the undead.
    `
  },
  {
    name: RegionNames.Jirdenth,
    description: `
      The mines and temples of Jirdenth recall the past glory of delving dwarves,
      their now vermin-and-beast-infested hallways the least of an adventurer\s concerns.
      In addition to the likes of natural monsters, mechanical traps of all kinds still
      prove deadly obstacles, though they often guard long-empty caches of dwarven treasures.
    `
  },
  {
    name: RegionNames.Emdynusk,
    description: `
      The lost city of Emdynusk is a testament to the foolishness of humans who
      in their pride attempted to rival and even exceed the masterwork tunnels and great halls
      of their dwarven cousins. While they revelled in short-lived success, they were soon overcome
      by the Wandering Madness and became slaves to mind-rotting diseases or worse:
      they were taken by the Touch of ${DeityNames.Xhsoa}.
    `
  },
  {
    name: RegionNames.Peruskkal,
    description: `
      The endless maze of Peruskkal is the first truly wicked place an adventurer of
      the Sunken Realms might encounter. Thus, the early halls of Peruskkal are lined with
      the bodies of the failed, their armor and bones forming high piles that sometimes block
      passageways. None but the bravest soldier onwards, revealing the true terrors of this
      place, deadly traps of acid, statues that come to life, and hallways that flood with
      black blood constructed by the lesser Mad Ones.
    `
  },
  {
    name: RegionNames.Oughmoren,
    description: `
      The sewers of Oughmoren are a dangerous place indeed. Created by the Mad One ${DeityNames.Ktipara},
      they extend far and wide, their rooms and passageways lurking with poisonous plants and venomous
      creatures. They are a place of decay, descruction, and desecration, littered with sordid
      and defaced shrines of the Hallowed Ones. As one slogs through Oughmoren hope begins
      to grow thin.
    `
  },
  {
    name: RegionNames.Ranwarir,
    description: `
      The petrified crypts of Ranwarir are a place few mortal has travelled. Entombed in ice and
      stone, Renwarir is a relic of an age before humans that had fallen so long that few have
      memory of its old era of glory. The elegant halls are now littered with ancient dragons
      who await the return of time-lost masters who dare not be disturbed.
    `
  },
  {
    name: RegionNames.Lytandel,
    description: `
      The halls of Lytandel writhe with the horrid creatures of Mad One ${DeityNames.Qirak}, their shifting
      shapes and shadowy limbs stretch out across rough hewn walls and blood-stained tiles. ${DeityNames.Qirak}
      had long-since abandoned the nightmares of Lytandel when they were first discovered by the demi-god
      heroes of old. What little information is known is passed down from generations on ancient, brittle
      tombs filled with the scrawled writings of insane monks.
    `
  },
  {
    name: RegionNames.Ydra,
    description: `
      The mire of Ydra stretches out for leagues, its walls etched with the marks of lost demons. What
      spawned this great waste of chaos? What terrible being once called this world its home? One can
      only hope that the Mad One that created Ydra has perished lest its hand might sculpt another
      diabolical realm.
    `
  },
  {
    name: RegionNames.Burm,
    description: `
      The Hell of Burm burns with the fury of ${DeityNames.Thothr}, the Mad One trapped in a world of
      flames and sorrow. None who have been banished to the Sunken Realm of Burm have ever seen the 
      mortal sun again.
    `
  },
  {
    name: RegionNames.Iltara,
    description: `
      In the fading realm of Iltara, beyond the reaches of sanity, in the farthest corners of the
      Sunken Realms, there was said to be a object of great power - the Eye of Rogg. It was said that
      one who possessed the Eye could alter the fabric of time itself, and so it was hidden away in a
      dark and impossible world that it might be forgotten, forever.
    `
  }
];

const floors = {

  // Lorlerach
  [RegionNames.Lorlerach]: [
    {
      regionName: RegionNames.Lorlerach
      name: `
        {Halls|Corridors|Catacombs|Rooms}
        of
        {Hungry|Haunting|Unending|Sunless}
        {Woe|Yearning|Sorrow|Loss|Rust|Dust|}
      `
    },
    {
      regionName: RegionNames.Lorlerach,
      name: `
        The
        {Skeleton|Skull|Bone|Femur|Torrid|Grim|Undying|Zombie}
        {Caves|Caverns|Grounds|Maze|Wastes|Passages|Blight}
      `
    },
    {
      regionName: RegionNames.Lorlerach,
      name: `
        The
        {Sanctum|Cloisters|Altars|Pillars}
        of
        {Bones|Skulls|Fractures|Dust|Fear|Undying|Gravefrost|Death Chill}
      `
    }
  ],


  // Jirdenth
  [RegionNames.Jirdenth]: [
    {
      regionName: RegionNames.Jirdenth,
      name: `
        The
        {Desecrated|Ruined|Devoured|Forgotten|Secret}
        {Temple|Sanctum|Halls}
        of
        [civilizations.dwarf.names]
      `
    },
    {
      regionName: RegionNames.Jirdenth,
      name: `
        The
        {Overgrown|Rusted|Lonesome|Unspoken|Trapped}
        {Bridges|Halls|Factories|Workshops}
      `
    },
    {
      regionName: RegionNames.Jirdenth,
      name: `
        The
        [${MaterialType.METAL}|${MaterialType.STONE}]
        {Works|Forge|Stockpile|Stores}
      `
    }
  ],

  // Emdynusk
  [RegionNames.Emdynusk]: [
    {
      regionName: RegionNames.Emdynusk
      name: `
        The
        {Lost|Mired|Corrupted}
        {Village|Quarters|Town|Wasteland|Burrow}
      `
    },
    {
      regionName: RegionNames.Emdynusk,
      name: `
        [civilizations.human.names]\s
        {Sorrow|Madness|Folly|Fall|Hatred|Longing|Disease|Grave}
      `
    },
    {
      regionName: RegionNames.Emdynusk,
      name: `
        The
        {Longing|Infinite|Insane|Secret|Furtive}
        {Graves|Corpse|Madness|Knives|Claws|Wind|Passages|Labyrinth|Daggers|Stricken|Heretics}
      `
    }
  ],

};

const floorData: FloorOptions[] = [
  {
    maxCR: 10,
    floorCRRange: { low: 1, high: 1 },
    variantEnemiesRange: { low: 0, high: 1 },
    pickupsRange: { low: 0, high: 1 },
    floorHeight: 80,
    floorWidth: 80,
    roomHeightRange: { low: 5, high: 8 },
    roomWidthRange: { low: 5, high: 8 },
    numRoomsRange: { low: 5, high: 10 },
    corridorLengthRange: { low: 3, high: 12 },
    depthRange: { low: 0, high: 4 },
    floorPersistance: <FloorPersistance>{
      persistance: <Range>{ low: 0, high: 2}
    },
    name: `{Dank|Meme|Heroic} Dungeon`,
    regionName: RegionNames.Burm
  },
  {
      maxCR: 10,
      floorCRRange: { low: 1, high: 2 },
      variantEnemiesRange: { low: 0, high: 1 },
      pickupsRange: { low: 0, high: 1 },
      floorHeight: 60,
      floorWidth: 60,
      roomHeightRange: { low: 5, high: 8 },
      roomWidthRange: { low: 5, high: 8 },
      numRoomsRange: { low: 5, high: 10 },
      corridorLengthRange: { low: 3, high: 12 },
      depthRange: { low: 0, high: MAX_DUNGEON_DEPTH },
      name: `{Terrible|Awful} Mire`,
      regionName: RegionNames.Jirdenth
  }
];


export { RegionNames, floorData }