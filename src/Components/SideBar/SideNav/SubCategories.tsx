import map from 'lodash/map'
import React, { FC, useContext, useRef } from 'react'
import Transition, { ENTERED, ENTERING } from 'react-transition-group/Transition'

import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { MetadataContext } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'
import { Category } from '@Protos/catalog/catalog_pb'

import css from './index.styl'

const ANIM_DURATION = 50
type SubCategoryProps = Omit<Category.AsObject, 'slug'> & { url: URL }

const SubCategory: FC<SubCategoryProps> = ({ name, title, url }: SubCategoryProps) => (
  <Link
    event={new NavigationEvent({
      attributes: {
        dest_page_type: 'category',
        dest_page_type_id: new Name(name).id,
        source_id: 'side_bar',
      },
      eventName: 'nav_link_click',
    })}
    href={url.toString()}
  >
    {title}
  </Link>
)

interface SubCategoriesProps {
  active: boolean
  mb?: number
  subCategoriesList: Category.AsObject[]
}

export const SubCategories: FC<SubCategoriesProps> = ({
  active,
  mb = 8,
  subCategoriesList,
}: SubCategoriesProps) => {
  const { store } = useContext(MetadataContext)
  const urlFull = store?.config?.urlFull || ''
  const innerExpandableRef = useRef(null)

  const transitionStyles = {
    [ENTERED]: {
      height: innerExpandableRef.current?.clientHeight || mb,
      marginBottom: '8px',
      marginTop: '8px',
    },
    [ENTERING]: {
      height: innerExpandableRef.current?.clientHeight || mb,
      marginBottom: '8px',
      marginTop: '8px',
    },
  }

  return (
    <Transition in={active} timeout={ANIM_DURATION}>
      {state => (
        <div className={css.SideNavLvl2} style={transitionStyles[state]}>
          <div ref={innerExpandableRef}>
            {map(
              subCategoriesList,
              l => <SubCategory key={l.name} url={new URL(l.slug, urlFull)} {...l} />,
            )}
          </div>
        </div>
      )}
    </Transition>
  )
}
