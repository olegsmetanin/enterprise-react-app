export function entitiesShallowEquals(oldEntities, newEntities): boolean {

  if (typeof oldEntities !== "object" || oldEntities === null || typeof newEntities !== "object" || newEntities === null) {
    return false;
  }

  let oldNames = Object.keys(oldEntities);
  let newNames = Object.keys(newEntities);

  if (oldNames.length !== newNames.length) {
    return false;
  }

  const equal = newNames.every(name => {
    return Object.keys(newEntities[name]).every(id => {
      return Object.is(oldEntities[name][id], newEntities[name][id])
    })
  })

  return equal;
}