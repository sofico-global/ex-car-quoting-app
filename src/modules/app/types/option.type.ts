export interface Option extends Readonly<{
  optionId: string;
  description: string;
  optionCode: string;
  optionType: string;
  price: number;
  isSelected: boolean;
}> {}
