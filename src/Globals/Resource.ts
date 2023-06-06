import split from 'lodash/split'

export class Name {
  public id: string

  public type: string

  constructor(resourceName: string) {
    const [type, id] = split(resourceName, '/')

    this.type = type || ''
    this.id = id || ''
  }

  public isValid(): boolean {
    if (this.type.length === 0) {
      return false
    }

    if (this.id.length === 0) {
      return false
    }

    return true
  }

  public toString(): string {
    return `${this.type}/${this.id}`
  }
}
