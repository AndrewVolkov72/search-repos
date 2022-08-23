export enum ImagePosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface IBtnText {
  text:string;
  position: ImagePosition;
  handleClick?:()=>void;
}