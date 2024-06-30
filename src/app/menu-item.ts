export type MenuItem = {
  name: string | MenuItem;
  click(): void;
  [_: string]: any;
};
