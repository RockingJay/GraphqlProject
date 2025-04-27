export interface ZellerCustomer {
  id: string;
  name: string;
  email: string;
  role: string;
  imageUrl?: string;
}

export interface ListZellerCustomersData {
  listZellerCustomers: {
    items: ZellerCustomer[];
  };
}

export interface ListZellerCustomersVars {
  filter: {
    role: {
      eq: string;
    };
  };
  limit: number;
  nextToken?: any;
}
