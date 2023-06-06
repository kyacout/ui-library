import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@Components/Button'
import { Link } from '@Components/Link'
import { Modal, ModalProps } from '@Components/Modal'
import { NavigationEvent } from '@Events/Navigation'
import { SuggestionLink } from '@Globals/API/Info/SuggestionLinks'

import css from './index.styl'

interface SuggestionsModalProps extends ModalProps {
  submit: () => void
  suggestionsList: SuggestionLink[]
}

export const SuggestionsModal: FC<SuggestionsModalProps> = ({
  submit,
  suggestionsList,
  ...props
}: SuggestionsModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal {...props}>
      <span className={css.Title}>{t('contact:CONTACT_PAGE_MAYBE_ALREADY_ANSWERED_LABEL')}</span>
      <div className={css.SuggistionsListWrap}>
        {suggestionsList.map(l => (
          <Link
            key={l.text}
            className={css.Link}
            event={new NavigationEvent({
              attributes: {
                dest_page_type: '',
                dest_page_type_id: '',
                source_id: 'link_suggestion',
              },
              eventName: 'nav_link_click',
            })}
            href={l.href}
            rel="noreferrer"
            target="_blank"
          >
            {l.text}
          </Link>
        ))}
      </div>
      <Button onClick={submit} type="button">
        {t('contact:CONTACT_PAGE_NO_SEND_EMAIL_LABEL')}
      </Button>
    </Modal>
  )
}
