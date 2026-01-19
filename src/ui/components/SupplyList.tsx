import type { GeneratorOutput, Category, Priority } from "../../domain/types";

interface SupplyListProps {
  output: GeneratorOutput;
}

const PRIORITY_LABELS: Record<Priority, string> = {
  1: "高优先级",
  2: "中优先级",
  3: "低优先级",
};

const PRIORITY_COLORS: Record<Priority, string> = {
  1: "#FF6B6B",
  2: "#FFB84D",
  3: "#50C878",
};

const CATEGORY_ICONS: Record<Category, string> = {
  防灾: "🛡️",
  防疫: "🦠",
  日常应急: "⚕️",
};

function formatExpiryDate(months?: number): string {
  if (!months) return "长期保存";
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return `有效期至 ${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function SupplyList({ output }: SupplyListProps) {
  const { lists, totals, cityTags } = output;

  return (
    <div className="supply-list-container">
      <div className="summary-card">
        <h2>清单概览</h2>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">总物品数</span>
            <span className="stat-value">{totals.count}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">高优先级</span>
            <span className="stat-value" style={{ color: PRIORITY_COLORS[1] }}>
              {totals.p1}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">中优先级</span>
            <span className="stat-value" style={{ color: PRIORITY_COLORS[2] }}>
              {totals.p2}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">低优先级</span>
            <span className="stat-value" style={{ color: PRIORITY_COLORS[3] }}>
              {totals.p3}
            </span>
          </div>
        </div>
        <div className="city-tags">
          <span>城市特征：</span>
          {cityTags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {(Object.keys(lists) as Category[]).map((category) => (
        <div key={category} className="category-section">
          <h3 className="category-title">
            {CATEGORY_ICONS[category]} {category}物资
          </h3>
          <div className="items-grid">
            {lists[category].map((item) => (
              <div key={item.id} className="supply-item">
                <div className="item-header">
                  <span className="item-name">{item.name}</span>
                  <span
                    className="priority-badge"
                    style={{
                      backgroundColor: PRIORITY_COLORS[item.priority],
                    }}
                  >
                    {PRIORITY_LABELS[item.priority]}
                  </span>
                </div>
                <div className="item-quantity">
                  数量：<strong>{item.quantityText}</strong>
                </div>
                {item.shelfLifeMonths && (
                  <div className="item-expiry">
                    {formatExpiryDate(item.shelfLifeMonths)}
                  </div>
                )}
                {item.openAfterDays && (
                  <div className="item-reminder">
                    开封后{item.openAfterDays}天内使用
                  </div>
                )}
                {item.storageTip && (
                  <div className="item-tip">💡 {item.storageTip}</div>
                )}
                <div className="item-reason">{item.reason}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
