import clsx from 'clsx'
import sortBy from 'lodash/sortBy'
import React, {
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import AngleRightIcon from '@Assets/SVG/AngleRight'
import { SVGIcon } from '@Components/Icons'
import { Link } from '@Components/Link'
import { handleEvent } from '@Events/Manager'
import { NavigationEvent } from '@Events/Navigation'
import { OtherEvent } from '@Events/Other'
import { CategoryNested, MetadataContext } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'

import css from './index.styl'
import { SubCategories } from './SubCategories'

export const MainCategory: FC<CategoryNested> = ({
  children,
  name,
  slug,
  title,
}: CategoryNested) => {
  const [active, setActive] = useState(false)
  const { store } = useContext(MetadataContext)
  const urlFull = store?.config?.urlFull
  const url = new URL(slug, urlFull)
  const sortedChildren = useMemo(() => children && sortBy(children, 'title'), [children])

  const toggleActive = useCallback(() => {
    if (!children) {
      setActive(false)
      return
    }

    setActive((prev) => {
      const curr = !prev

      handleEvent(new OtherEvent({
        attributes: {
          category_id: new Name(name).id,
          is_opened: curr,
        },
        eventName: 'nav_side_bar_category_toggle',
      }))

      return curr
    })
  }, [children])

  return (
    <section
      key={name}
      className={clsx(css.MainSideNav, active && css.Active, !children && css.NoLvl2)}
    >
      <div className={css.SideNavLvl1} onClick={() => toggleActive()}>
        <div className={css.IconWrap}>
          <div className={clsx(css.IconWrapInner, active && css.Active)}>
            <SVGIcon icon={AngleRightIcon} size="22px" />
          </div>
        </div>
        <Link
          key={name}
          className={css.CategoryLink}
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
      </div>
      {children && <SubCategories active={active} subCategoriesList={sortedChildren} />}
    </section>
  )
}
