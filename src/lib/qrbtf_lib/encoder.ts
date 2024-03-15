import encodeQR from "@paulmillr/qr";

const PATTERN_POSITION_TABLE = [
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170],
];

export enum QRPointType {
  DATA = 0,
  POS_CENTER,
  POS_OTHER,
  ALIGN_CENTER,
  ALIGN_OTHER,
  TIMING,
  FORMAT,
  VERSION,
  EMPTY,
}

export function encode(
  text: string,
  options?: Parameters<typeof encodeQR>[2],
): [boolean[][], QRPointType[][]] {
  const table = encodeQR(text, "raw", {
    border: 0,
    scale: 1,
    ...options,
  });
  const nCount = table.length;
  const typeNumber = (nCount - 17) / 4;
  const position = PATTERN_POSITION_TABLE[typeNumber];

  const PD = [
    [3, 3],
    [3, nCount - 4],
    [nCount - 4, 3],
  ];

  const set = (x: number, y: number, type: QRPointType) => {
    if (table[x][y]) {
      typeTable[x][y] = type;
    }
  };

  let typeTable: QRPointType[][] = new Array(nCount);
  for (let i = 0; i < nCount; i++)
    typeTable[i] = new Array(nCount).fill(QRPointType.EMPTY);

  for (let i = 8; i < nCount - 7; i++) {
    set(i, 6, QRPointType.TIMING);
    set(6, i, QRPointType.TIMING);
  }

  for (let i = 0; i < position.length; i++) {
    for (let j = 0; j < position.length; j++) {
      set(position[i], position[j], QRPointType.ALIGN_CENTER);
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          if (!(r === 0 && c === 0)) {
            set(position[i] + r, position[j] + c, QRPointType.ALIGN_OTHER);
          }
        }
      }
    }
  }

  for (let i = 0; i < PD.length; i++) {
    typeTable[PD[i][0]][PD[i][1]] = QRPointType.POS_CENTER;
    for (let r = -4; r <= 4; r++) {
      for (let c = -4; c <= 4; c++) {
        if (
          PD[i][0] + r >= 0 &&
          PD[i][0] + r < nCount &&
          PD[i][1] + c >= 0 &&
          PD[i][1] + c < nCount
        )
          if (!(r === 0 && c === 0))
            set(PD[i][0] + r, PD[i][1] + c, QRPointType.POS_OTHER);
      }
    }
  }

  for (let i = 0; i <= 8; i++) {
    if (i !== 6) set(i, 8, QRPointType.FORMAT), set(8, i, QRPointType.FORMAT);
    if (i < 7) set(nCount - i - 1, 8, QRPointType.FORMAT);
    if (i < 8) set(8, nCount - i - 1, QRPointType.FORMAT);
  }

  for (let i = nCount - 11; i <= nCount - 9; i++) {
    for (let j = 0; j <= 5; j++) {
      set(i, j, QRPointType.VERSION);
      set(j, i, QRPointType.VERSION);
    }
  }

  for (let i = 0; i < nCount; i++) {
    for (let j = 0; j < nCount; j++) {
      if (typeTable[i][j] === QRPointType.EMPTY) set(i, j, QRPointType.DATA);
    }
  }

  return [table, typeTable];
}