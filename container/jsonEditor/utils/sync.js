// 深度比較兩個 JSON 對象，找出差異
export const getJsonDifferences = (original, current) => {
  const differences = new Map()

  const findDiffs = (orig, curr, path = '') => {
    if (typeof orig !== 'object' || typeof curr !== 'object') {
      if (orig !== curr) {
        differences.set(path, { original: orig, current: curr })
      }
      return
    }

    if (orig === null || curr === null) {
      if (orig !== curr) {
        differences.set(path, { original: orig, current: curr })
      }
      return
    }

    // 處理數組
    if (Array.isArray(orig) && Array.isArray(curr)) {
      if (JSON.stringify(orig) !== JSON.stringify(curr)) {
        differences.set(path, { original: orig, current: curr })
      }
      return
    }

    // 處理對象
    const allKeys = new Set([...Object.keys(orig), ...Object.keys(curr)])

    for (const key of allKeys) {
      const newPath = path ? `${path}.${key}` : key

      if (!(key in orig)) {
        differences.set(newPath, { original: undefined, current: curr[key] })
      } else if (!(key in curr)) {
        differences.set(newPath, { original: orig[key], current: undefined })
      } else {
        findDiffs(orig[key], curr[key], newPath)
      }
    }
  }

  findDiffs(original, current)
  return differences
}

// 根據路徑設置值
export const setValueByPath = (obj, path, value) => {
  if (!path) return

  const keys = path.split('.')
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }

  const lastKey = keys[keys.length - 1]
  if (value === undefined) {
    delete current[lastKey]
  } else {
    current[lastKey] = value
  }
}

// 智能合併三個版本：base（初始）、local（本地修改）、remote（遠端修改）
export const smartMergeJson = (base, local, remote) => {
  // 找出本地和遠端相對於 base 的變化
  const localDiffs = getJsonDifferences(base, local)
  const remoteDiffs = getJsonDifferences(base, remote)

  console.log('Local changes:', Array.from(localDiffs.entries()))
  console.log('Remote changes:', Array.from(remoteDiffs.entries()))

  // 從 base 開始，應用所有變化
  let result = JSON.parse(JSON.stringify(base))

  // 先應用遠端變化
  for (const [path, change] of remoteDiffs) {
    setValueByPath(result, path, change.current)
  }

  // 再應用本地變化（本地優先）
  for (const [path, change] of localDiffs) {
    // 檢查是否有衝突
    if (remoteDiffs.has(path)) {
      const remoteChange = remoteDiffs.get(path)
      if (JSON.stringify(change.current) !== JSON.stringify(remoteChange.current)) {
        console.warn(`Conflict detected at ${path}:`, {
          local: change.current,
          remote: remoteChange.current,
        })
        // 這裡可以實作衝突解決策略，目前採用本地優先
      }
    }
    setValueByPath(result, path, change.current)
  }

  return result
}

// 深度設置值
export const deepSet = (obj, path, value) => {
  const keys = path.split('.')
  let cur = obj
  keys.forEach((k, idx) => {
    if (idx === keys.length - 1) {
      cur[k] = value
    } else {
      if (cur[k] === undefined) cur[k] = {}
      cur = cur[k]
    }
  })
}
