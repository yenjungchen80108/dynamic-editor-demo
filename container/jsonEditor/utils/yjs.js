import * as Y from 'yjs'

/** 遞歸把普通 Object 灌進 Y.Map */
export const loadJsonToYMap = (obj, ymap) => {
  Object.entries(obj).forEach(([key, val]) => {
    if (val !== null && typeof val === 'object') {
      const sub = new Y.Map()
      ymap.set(key, sub)
      loadJsonToYMap(val, sub)
    } else {
      ymap.set(key, val)
    }
  })
}
