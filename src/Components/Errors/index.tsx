import join from 'lodash/join'
import Head from 'next/head'
import React, { ComponentType, FC } from 'react'

import { Error404 } from '@Components/Errors/404'
import { PageView } from '@Events/PageView'
import { PageViewGA } from '@Globals/Google/Analytics'
import { DataLayer } from '@Globals/Google/DataLayer'
import { useTranslation } from '@Globals/Translations'
import { TwoColumn } from '@Layouts/TwoColumn'

interface ErrorProps {
  Component?: ComponentType
  statusCode?: number
}

export const Error: FC<ErrorProps> = (
  {
    Component = Error404,
    statusCode = 404,
  }: ErrorProps,
) => {
  const { t } = useTranslation()

  const title = join(
    [
      t('common:404_PAGE_OOPS'),
      '-',
      t('common:404_PAGE_PAGE_NOT_FOUND'),
      '|',
      statusCode,
    ],
    ' ',
  )

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          key="og:title"
          content={title}
          property="og:title"
        />
        <meta
          key="robots"
          content="INDEX,FOLLOW"
          name="robots"
        />
      </Head>
      <DataLayer input={{ contentIds: '', pageType: 'error' }} />
      <PageViewGA />
      <PageView
        eventProps={{
          attributes: {},
          pageName: 'error',
        }}
      />
      <TwoColumn>
        <Component />
      </TwoColumn>
    </>
  )
}
