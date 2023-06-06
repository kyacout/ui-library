import React, { FC } from 'react'

interface TrustIconProps {
  image: string
}

export const TrustIcon: FC<TrustIconProps> = ({ image }: TrustIconProps) => (
  <img alt="" src={`https://res.cloudinary.com/uiLibrary/image/upload/${image}`} />
)
