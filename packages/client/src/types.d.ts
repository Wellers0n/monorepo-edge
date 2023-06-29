export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Assignor = {
  id: number;
  name: string;
  document: string;
  phone: string;
  email: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Payables = {
  id: number;
  value: number;
  valueInCents: number;
  userId: number;
  emissionDate: Date;
  assignorId: number;
  createdAt: Date;
  updatedAt: Date;
};
