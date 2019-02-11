export interface Option extends Readonly<{
  optionId: string;
  description: string;
  optionCode: string;
  price: number;
}> {}
