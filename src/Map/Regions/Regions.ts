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

export { RegionNames, RegionData };