import { IRichBlock } from "../../interfaces/rich-block.interface";

export const getProjectDescription = (
  description: IRichBlock
): [string[], string[]] => {
  const descriptionMiddle = Math.ceil(description.length / 2);
  const firstDescriptionsPart = description.slice(0, descriptionMiddle);
  const secondDescriptionsPart = description.slice(descriptionMiddle);

  const firstPart = firstDescriptionsPart.map(
    (description) => description.children[0].text
  );

  const secondPart = secondDescriptionsPart.map(
    (description) => description.children[0].text
  );

  return [firstPart, secondPart];
};
