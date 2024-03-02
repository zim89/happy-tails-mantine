import mock from "./category.json";

import type { BackendResponse } from "@/shared/api/admin_categoryApi";

export type Category = {
  id: number;
  name: string;
  title: string;
  path: string;
  description: string;
  productCount: number;
};

const mockData = mock as BackendResponse;

export { mockData };