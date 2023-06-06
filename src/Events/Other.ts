import {
  BaseAttributes,
  OtherAttributes,
  OtherConstructor,
} from '@uiLibrary/data-plans/lib/uiLibrary_ecom'

import {
  Event,
  EventType,
} from '@Events/Base'

export class OtherEvent<T extends OtherConstructor> extends Event {
  attributes: T['attributes']

  eventName: T['eventName']

  constructor({ attributes, eventName }: T) {
    super()
    this.attributes = attributes
    this.eventName = eventName
  }

  getAttributes(): BaseAttributes & OtherAttributes & T['attributes'] {
    return {
      ...super.getAttributes(),
      ...this.attributes,
    }
  }

  getAttributesSafe(): BaseAttributes & OtherAttributes & T['attributes'] {
    return super.getAttributesSafe() as BaseAttributes & OtherAttributes & T['attributes']
  }

  getName(): T['eventName'] {
    return this.eventName
  }

  getType(): EventType {
    return 'Other'
  }
}
