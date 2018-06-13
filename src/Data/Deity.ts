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

enum Alignment {

}

interface Subject {
  name: string
}

export { DeityNames, Alignment, Subject, Deity };