
export type FranchiseGame = {
  id: number;
  name: string;
};

export type Franchise = {
  id: number;
  name: string;
  games?: FranchiseGame[];
};
