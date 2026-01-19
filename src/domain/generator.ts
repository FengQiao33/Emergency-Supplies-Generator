import type {
  City,
  Environment,
  Category,
  GeneratorInput,
  GeneratorOutput,
  SupplyItem,
  Priority,
} from "./types";

const CITY_TAGS: Record<City, string[]> = {
  北京: ["北方", "干燥", "冬季寒冷"],
  上海: ["南方", "湿润", "台风"],
  广州: ["南方", "湿润", "台风", "高温"],
  深圳: ["南方", "湿润", "台风", "高温"],
  杭州: ["南方", "湿润", "梅雨"],
  成都: ["西南", "湿润", "地震带"],
  重庆: ["西南", "湿润", "山地", "高温"],
  武汉: ["中部", "湿润", "夏季高温"],
  西安: ["西北", "干燥", "地震带"],
  南京: ["南方", "湿润", "梅雨"],
  长沙: ["中部", "湿润", "夏季高温"],
  青岛: ["北方", "湿润", "沿海"],
  厦门: ["南方", "湿润", "台风", "沿海"],
  沈阳: ["北方", "干燥", "冬季严寒"],
  昆明: ["西南", "干燥", "高原"],
  乌鲁木齐: ["西北", "干燥", "冬季严寒", "地震带"],
};

const BASE_SUPPLIES: Record<Category, Omit<SupplyItem, "quantityText" | "reason">[]> = {
  防灾: [
    {
      id: "water",
      name: "饮用水",
      category: "防灾",
      unitHint: "升/人/天",
      shelfLifeMonths: undefined,
      storageTip: "避光、阴凉处存放",
      priority: 1,
    },
    {
      id: "food",
      name: "压缩饼干",
      category: "防灾",
      shelfLifeMonths: 24,
      storageTip: "干燥、密封保存",
      priority: 1,
    },
    {
      id: "flashlight",
      name: "手电筒",
      category: "防灾",
      storageTip: "定期检查电池",
      priority: 1,
    },
    {
      id: "radio",
      name: "收音机",
      category: "防灾",
      storageTip: "备用电池",
      priority: 1,
    },
    {
      id: "firstaid",
      name: "急救包",
      category: "防灾",
      shelfLifeMonths: 36,
      storageTip: "定期检查有效期",
      priority: 1,
    },
    {
      id: "whistle",
      name: "口哨",
      category: "防灾",
      priority: 1,
    },
    {
      id: "rope",
      name: "救援绳",
      category: "防灾",
      storageTip: "检查强度",
      priority: 2,
    },
    {
      id: "multitool",
      name: "多功能工具",
      category: "防灾",
      priority: 2,
    },
    {
      id: "blanket",
      name: "应急毯",
      category: "防灾",
      priority: 2,
    },
    {
      id: "matches",
      name: "防水火柴",
      category: "防灾",
      storageTip: "密封保存",
      priority: 2,
    },
    {
      id: "candles",
      name: "蜡烛",
      category: "防灾",
      priority: 3,
    },
    {
      id: "ducttape",
      name: "胶带",
      category: "防灾",
      priority: 3,
    },
  ],
  防疫: [
    {
      id: "mask",
      name: "医用口罩",
      category: "防疫",
      unitHint: "个/人",
      shelfLifeMonths: 36,
      storageTip: "密封保存",
      priority: 1,
    },
    {
      id: "handsanitizer",
      name: "免洗洗手液",
      category: "防疫",
      shelfLifeMonths: 24,
      openAfterDays: 90,
      storageTip: "避光保存",
      priority: 1,
    },
    {
      id: "disinfectant",
      name: "84消毒液",
      category: "防疫",
      shelfLifeMonths: 12,
      storageTip: "避光、通风保存",
      priority: 1,
    },
    {
      id: "thermometer",
      name: "体温计",
      category: "防疫",
      priority: 1,
    },
    {
      id: "gloves",
      name: "一次性手套",
      category: "防疫",
      unitHint: "双/人",
      shelfLifeMonths: 36,
      storageTip: "密封保存",
      priority: 2,
    },
    {
      id: "alcohol",
      name: "75%酒精",
      category: "防疫",
      shelfLifeMonths: 24,
      storageTip: "远离火源",
      priority: 2,
    },
    {
      id: "goggles",
      name: "护目镜",
      category: "防疫",
      priority: 2,
    },
    {
      id: "vitamin",
      name: "维生素C",
      category: "防疫",
      shelfLifeMonths: 24,
      storageTip: "避光保存",
      priority: 3,
    },
  ],
  日常应急: [
    {
      id: "bandage",
      name: "创可贴",
      category: "日常应急",
      shelfLifeMonths: 36,
      storageTip: "干燥保存",
      priority: 1,
    },
    {
      id: "iodine",
      name: "碘伏",
      category: "日常应急",
      shelfLifeMonths: 24,
      openAfterDays: 30,
      storageTip: "避光保存",
      priority: 1,
    },
    {
      id: "burncream",
      name: "烫伤膏",
      category: "日常应急",
      shelfLifeMonths: 36,
      storageTip: "阴凉处保存",
      priority: 1,
    },
    {
      id: "antipyretic",
      name: "退烧药",
      category: "日常应急",
      shelfLifeMonths: 24,
      storageTip: "避光、干燥保存",
      priority: 1,
    },
    {
      id: "antidiarrheal",
      name: "止泻药",
      category: "日常应急",
      shelfLifeMonths: 24,
      storageTip: "避光保存",
      priority: 2,
    },
    {
      id: "antihistamine",
      name: "抗过敏药",
      category: "日常应急",
      shelfLifeMonths: 24,
      storageTip: "避光保存",
      priority: 2,
    },
    {
      id: "scissors",
      name: "医用剪刀",
      category: "日常应急",
      priority: 2,
    },
    {
      id: "tweezers",
      name: "镊子",
      category: "日常应急",
      priority: 3,
    },
  ],
};

function calculateQuantity(
  item: Omit<SupplyItem, "quantityText" | "reason">,
  input: GeneratorInput
): string {
  const { people, days } = input;

  switch (item.id) {
    case "water":
      return `${Math.ceil(people * days * 3)}升`;
    case "food":
      return `${Math.ceil(people * days * 0.5)}包`;
    case "mask":
      return `${people * days * 2}个`;
    case "gloves":
      return `${people * 10}双`;
    default:
      if (item.unitHint) {
        const base = people;
        return `${base}${item.unitHint.split("/")[0]}`;
      }
      return people === 1 ? "1份" : `${people}份`;
  }
}

function generateReason(
  item: Omit<SupplyItem, "quantityText" | "reason">,
  input: GeneratorInput
): string {
  const { city, environment } = input;
  const tags = CITY_TAGS[city];

  if (item.category === "防灾") {
    if (item.id === "water" || item.id === "food") {
      return "基本生存必需品";
    }
    if (item.id === "flashlight" || item.id === "radio") {
      return "断电时保持信息畅通";
    }
    if (item.id === "rope" && environment === "高层") {
      return "高层建筑逃生必备";
    }
    if (tags.includes("地震带") && item.id === "firstaid") {
      return "地震多发地区必备";
    }
    if (tags.includes("台风") && item.id === "multitool") {
      return "台风天气应急工具";
    }
  }

  if (item.category === "防疫") {
    if (item.id === "mask" || item.id === "handsanitizer") {
      return "日常防护必需品";
    }
    if (item.id === "disinfectant") {
      return "环境消毒必备";
    }
  }

  if (item.category === "日常应急") {
    if (item.id === "bandage" || item.id === "iodine") {
      return "处理小伤口必备";
    }
    if (item.id === "antipyretic") {
      return "应对突发发热";
    }
  }

  return "应急储备物品";
}

export function generateSupplies(input: GeneratorInput): GeneratorOutput {
  const lists: Record<Category, SupplyItem[]> = {
    防灾: [],
    防疫: [],
    日常应急: [],
  };

  for (const category of Object.keys(BASE_SUPPLIES) as Category[]) {
    for (const baseItem of BASE_SUPPLIES[category]) {
      const item: SupplyItem = {
        ...baseItem,
        quantityText: calculateQuantity(baseItem, input),
        reason: generateReason(baseItem, input),
      };
      lists[category].push(item);
    }
  }

  const allItems = Object.values(lists).flat();
  const totals = {
    count: allItems.length,
    p1: allItems.filter((i) => i.priority === 1).length,
    p2: allItems.filter((i) => i.priority === 2).length,
    p3: allItems.filter((i) => i.priority === 3).length,
  };

  return {
    input,
    createdAtISO: new Date().toISOString(),
    cityTags: CITY_TAGS[input.city],
    totals,
    lists,
  };
}
