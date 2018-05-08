enum Quality {
  RUINED = 'ruined',
  POOR = 'poor',
  FAIR = 'fair',
  COMMON = 'common',
  GOOD = 'good',
  EXCEPTIONAL = 'exceptional',
  LEGENDARY = 'legendary',
  MYTHICAL = 'mythical'
}

interface Material {
  type: MaterialType,
  subtype: MaterialSubtype
}

interface MaterialType {
  name: EMaterialType,
  description?: string
}

interface MaterialSubtype {
  name: EMaterialSubtype,
  description?: string
}

enum EMaterialType {
  METAL,
  WOOD,
  STONE,
  BONE,
  LEATHER,
  CLOTH
}

enum EMaterialSubtype {

}

export { Quality };