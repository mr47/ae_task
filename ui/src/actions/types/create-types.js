export default function createTypes(types) {
  return types.reduce((res, key) => { res[key] = key; return res }, {})
}
