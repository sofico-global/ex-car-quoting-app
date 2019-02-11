export interface Step extends Readonly<{
  label: string;
  path: string;
  accessible: boolean;
}> {}
