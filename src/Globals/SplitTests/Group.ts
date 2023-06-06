export enum Group {
  Unknown = 'Unknown',
  A = 'A',
  B = 'B',
}

export const convertToGroup = (raw: any): Group => {
  switch (raw) {
    case false:
    case 'false':
    case 0:
    case '0':
    case 'a':
    case 'A':
      return Group.A
    case true:
    case 'true':
    case 1:
    case '1':
    case 'b':
    case 'B':
      return Group.B
    default:
      return Group.Unknown
  }
}
