import { useState, useEffect } from 'react'
import * as Y from 'yjs'

import { loadJsonToYMap } from '../utils/yjs'

export const useS3File = (fileName) => {
  const [doc] = useState(() => new Y.Doc())
  const [yroot] = useState(() => doc.getMap('json'))

  // const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!fileName) {
      // 不換 doc，只清空 map
      doc.transact(() => yroot.clear())
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(`/api/json/get-file?fileName=${encodeURIComponent(fileName)}&t=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (cancelled) return
        doc.transact(() => loadJsonToYMap(json, yroot), 'load')
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [doc, fileName, yroot])

  return { doc, yroot, loading, error }
}
