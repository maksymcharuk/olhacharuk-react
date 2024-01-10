interface IRichText {
  children: {
    text: string;
    type: "text";
  }[];
  type: "paragraph";
}

export type IRichBlock = IRichText[];
