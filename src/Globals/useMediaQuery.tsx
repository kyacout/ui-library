import { useEffect, useState } from 'react'

export function useMediaQuery(queryInput, options = {}) {
  const query = queryInput.replace(/^@media( ?)/m, '')

  const supportMatchMedia = typeof window !== 'undefined'
    && typeof window.matchMedia !== 'undefined'

  const {
    defaultMatches = false,
    matchMedia = supportMatchMedia ? window.matchMedia : null,
    noSSR = false,
    ssrMatchMedia = null,
  } = { ...options }

  const [match, setMatch] = useState(() => {
    if (noSSR && supportMatchMedia) {
      return matchMedia(query).matches
    }
    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches
    }

    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return defaultMatches
  })

  useEffect(() => {
    let active = true

    if (!supportMatchMedia) {
      return undefined
    }

    const queryList = matchMedia(query)
    const updateMatch = () => {
      // Workaround Safari wrong implementation of matchMedia
      // https://github.com/mui-org/material-ui/pull/17315#issuecomment-528286677
      if (active) {
        setMatch(queryList.matches)
      }
    }
    updateMatch()
    queryList.addListener(updateMatch)
    return () => {
      active = false
      queryList.removeListener(updateMatch)
    }
  }, [query, matchMedia, supportMatchMedia])

  return match
}
