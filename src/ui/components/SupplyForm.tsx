import { useState } from "react";
import type { City, Environment, GeneratorInput } from "../../domain/types";

interface SupplyFormProps {
  onSubmit: (input: GeneratorInput) => void;
}

const CITIES: City[] = [
  "北京",
  "上海",
  "广州",
  "深圳",
  "杭州",
  "成都",
  "重庆",
  "武汉",
  "西安",
  "南京",
  "长沙",
  "青岛",
  "厦门",
  "沈阳",
  "昆明",
  "乌鲁木齐",
];

export function SupplyForm({ onSubmit }: SupplyFormProps) {
  const [city, setCity] = useState<City>("北京");
  const [people, setPeople] = useState(2);
  const [environment, setEnvironment] = useState<Environment>("高层");
  const [days, setDays] = useState(7);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ city, people, environment, days });
  };

  return (
    <form onSubmit={handleSubmit} className="supply-form">
      <div className="form-group">
        <label htmlFor="city">居住城市</label>
        <select
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value as City)}
          required
        >
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="people">家庭人数</label>
        <input
          id="people"
          type="number"
          min="1"
          max="20"
          value={people}
          onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="environment">居住环境</label>
        <select
          id="environment"
          value={environment}
          onChange={(e) => setEnvironment(e.target.value as Environment)}
          required
        >
          <option value="高层">高层</option>
          <option value="低层">低层</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="days">应急天数</label>
        <input
          id="days"
          type="number"
          min="3"
          max="30"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value) || 7)}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        生成应急物资清单
      </button>
    </form>
  );
}
