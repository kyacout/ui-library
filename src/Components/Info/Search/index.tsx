
import React, { useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import SearchIcon from '@Assets/SVG/Search'
import { TextField } from '@Components/FormElements/UI/TextField'
import { SVGIcon } from '@Components/Icons'
import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { useSuggestionLinks } from '@Globals/API/Info/SuggestionLinks'
import { MetadataContext } from '@Globals/Metadata'
import { storeURL } from '@Globals/Store'

import css from './index.styl'

export const Search = () => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const infoResultURL = storeURL('info/result')

  const { store } = useContext(MetadataContext)
  const [suggestionLinks, fetchSuggestionLinks] = useSuggestionLinks(store?.name)

  const hasSuggestions = suggestionLinks.length > 0
  const hasInput = inputRef?.current?.value?.length > 1

  return (
    <form
      className={css.root}
      onSubmit={(e) => {
        e.preventDefault()
        const url = new URL(infoResultURL)
        url.searchParams.set('q', inputRef?.current?.value || '')
        window.location.href = url.toString()
      }}
    >
      <TextField
        adornments={{
          end: (
            <button type="submit">
              <div className={css.searchIcon}>
                <SVGIcon icon={SearchIcon} size="24px" />
              </div>
            </button>
          ),
        }}
        label={t('info:INFO_CENTER_SEARCH_PLACEHOLDER')}
        onKeyUp={(e) => {
          const input = (e.target as HTMLInputElement).value
          if (input.length > 1) {
            return fetchSuggestionLinks(input)
          }
          return fetchSuggestionLinks('')
        }}
        ref={inputRef}
        type="text"
        withoutLabelAnimation
      />
      {hasSuggestions && hasInput && (
        <div className={css.suggestionsList}>
          {suggestionLinks.map(l => (
            <Link
              key={l.text}
              event={new NavigationEvent({
                attributes: {
                  dest_page_type: 'info',
                  dest_page_type_id: l.id,
                  source_id: 'link_suggestion',
                },
                eventName: 'nav_link_click',
              })}
              href={l.href}
            >
              {l.text}
            </Link>
          ))}
        </div>
      )}
    </form>
  )
}
