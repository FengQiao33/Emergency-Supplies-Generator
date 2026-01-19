import { useState } from "react";
import { ParticleBackground } from "./components/ParticleBackground";
import { Scene3D } from "./components/Scene3D";
import { SupplyForm } from "./components/SupplyForm";
import { SupplyList } from "./components/SupplyList";
import type { GeneratorInput, GeneratorOutput } from "../domain/types";
import { generateSupplies } from "../domain/generator";

export function App() {
  const [output, setOutput] = useState<GeneratorOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (input: GeneratorInput) => {
    setLoading(true);
    try {
      // 尝试使用边缘函数，如果失败则使用本地生成
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        if (response.ok) {
          const data = await response.json();
          setOutput(data);
          return;
        }
      } catch (e) {
        console.log("边缘函数不可用，使用本地生成");
      }
      // 本地生成
      const result = generateSupplies(input);
      setOutput(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <ParticleBackground />
      <Scene3D />
      <div className="content">
        <header className="header">
          <h1>家庭应急物资清单生成器</h1>
          <p className="subtitle">
            根据您的居住城市、家庭人数和居住环境，智能生成个性化的应急物资清单
          </p>
        </header>

        {!output ? (
          <div className="form-container">
            <SupplyForm onSubmit={handleGenerate} />
            {loading && <div className="loading">正在生成清单...</div>}
          </div>
        ) : (
          <div className="result-container">
            <button
              className="back-btn"
              onClick={() => setOutput(null)}
            >
              ← 重新生成
            </button>
            <SupplyList output={output} />
          </div>
        )}

        <footer className="footer">
          <p>建议定期检查物资有效期，及时补充和更新</p>
        </footer>
      </div>
    </div>
  );
}
