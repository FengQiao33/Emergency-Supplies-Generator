export type Environment = "高层" | "低层";

export type City =
  | "北京"
  | "上海"
  | "广州"
  | "深圳"
  | "杭州"
  | "成都"
  | "重庆"
  | "武汉"
  | "西安"
  | "南京"
  | "长沙"
  | "青岛"
  | "厦门"
  | "沈阳"
  | "昆明"
  | "乌鲁木齐";

export type Category = "防灾" | "防疫" | "日常应急";

export type Priority = 1 | 2 | 3;

export interface GeneratorInput {
  city: City;
  people: number;
  environment: Environment;
  days: number;
}

export interface SupplyItem {
  id: string;
  name: string;
  category: Category;
  quantityText: string;
  unitHint?: string;
  shelfLifeMonths?: number; // undefined means not applicable (e.g. tools)
  openAfterDays?: number; // reminder: after opening, use within X days
  storageTip?: string;
  priority: Priority;
  reason: string;
}

export interface GeneratorOutput {
  input: GeneratorInput;
  createdAtISO: string;
  cityTags: string[];
  totals: {
    count: number;
    p1: number;
    p2: number;
    p3: number;
  };
  lists: Record<Category, SupplyItem[]>;
}

