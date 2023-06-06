import React, { FC, useState } from 'react'

import { Button } from '@Components/Button'
import { Modal } from '@Components/Modal'

interface CountrySelectionModal {
  destinationText: string
  destinationURL: string
  header: string
  sourceText: string
}

export const CountrySelectionModal: FC<CountrySelectionModal> = (
  {
    destinationText,
    destinationURL,
    header,
    sourceText,
  }: CountrySelectionModal,
) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Modal
      onHide={() => setShowModal(false)}
      show={showModal}
    >
      <h1>{header}</h1>
      <Button
        onClick={() => setShowModal(false)}
        type="button"
      >
        {sourceText}
      </Button>
      <a href={destinationURL}>
        <Button type="button">{destinationText}</Button>
      </a>
    </Modal>
  )
}
