export interface productFace {
  id?: string;
  barchar: string;
  name: string;
  stock?: number;
  breakdownStock?: number;
  hasReplacement: boolean;
  enterprise: number;
  price: number;
}
