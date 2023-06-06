import {
  BaseAttributes,
  NavigationAttributes,
  NavigationConstructor,
} from '@uiLibrary/data-plans/lib/uiLibrary_ecom'

import {
  Event,
  EventType,
} from '@Events/Base'

export class NavigationEvent<T extends NavigationConstructor> extends Event {
  attributes: T['attributes']

  eventName: T['eventName']

  constructor({ attributes, eventName }: T) {
    super()
    this.attributes = attributes
    this.eventName = eventName
  }

  getAttributes(): BaseAttributes & NavigationAttributes & T['attributes'] {
    return {
      ...super.getAttributes(),
      ...this.attributes,
    }
  }

  getAttributesSafe(): BaseAttributes & NavigationAttributes & T['attributes'] {
    return super.getAttributesSafe() as BaseAttributes & NavigationAttributes & T['attributes']
  }

  getName(): T['eventName'] {
    return this.eventName
  }

  getType(): EventType {
    return 'Navigation'
  }
}
