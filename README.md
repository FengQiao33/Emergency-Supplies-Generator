# 家庭应急物资清单生成器

本项目由阿里云ESA提供加速、计算和保护

![ESA Logo](src/ui/O1CN01H1UU3i1Cti9lYtFrs_!!6000000000139-2-tps-7534-844.png)

## 项目介绍

### 实用性
家庭应急物资清单生成器是一款实用的应急准备工具，帮助家庭根据实际居住情况智能生成个性化的应急物资清单。用户只需选择居住城市、家庭人数、居住环境（高层/低层）和应急天数，系统即可自动生成包含"防灾"、"防疫"、"日常应急"三大类别的详细物资清单。

**核心功能：**
- 🏙️ 支持16个主要城市的个性化推荐
- 👨‍👩‍👧‍👦 根据家庭人数智能计算物资数量
- 🏢 区分高层/低层建筑，提供针对性建议
- 📅 保质期提醒和采购优先级标注
- 💡 存储建议和使用说明

### 创意性
项目采用现代化的Web技术栈，结合3D交互效果和粒子动画，打造了视觉冲击力强、交互体验流畅的用户界面。右侧的3D场景通过Three.js渲染，包含旋转的立方体和浮动的球体，配合星空背景，营造出科技感和未来感。页面背景的粒子系统会根据鼠标交互产生动态效果，增强了用户参与感。

**视觉亮点：**
- ✨ 实时3D场景渲染（Three.js + React Three Fiber）
- 🌟 动态粒子背景效果（TSParticles）
- 🎨 现代化的渐变色彩和玻璃态设计
- 📱 响应式布局，完美适配各种设备

### 技术深度
项目充分利用了阿里云ESA边缘生态的完整能力：

1. **ESA Pages** - 部署前端应用，享受全球边缘节点加速
2. **边缘函数** - 将清单生成逻辑部署到边缘，实现低延迟响应
3. **边缘存储** - 存储静态资源和配置数据
4. **边缘缓存** - 缓存常用数据，提升访问速度

**技术栈：**
- 前端框架：React 18 + TypeScript
- 构建工具：Vite 5
- 3D渲染：Three.js + @react-three/fiber + @react-three/drei
- 粒子效果：@tsparticles/react
- 边缘函数：TypeScript + Edge Runtime

**技术亮点：**
- 完整的TypeScript类型系统
- 组件化架构，易于维护和扩展
- 边缘计算优化，减少服务器压力
- 响应式设计，适配移动端和桌面端

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 部署说明

### 部署到阿里云ESA Pages

1. 将项目推送到GitHub公开仓库
2. 在阿里云ESA控制台创建Pages项目
3. 连接GitHub仓库
4. 配置构建命令：`npm run build`
5. 配置输出目录：`dist`
6. 部署边缘函数到 `functions/api/generate.ts`

### 边缘函数配置

边缘函数位于 `functions/api/generate.ts`，提供清单生成API接口。部署后可通过 `/api/generate` 访问。

## 项目结构

```
.
├── src/
│   ├── domain/          # 领域逻辑
│   │   ├── types.ts     # 类型定义
│   │   └── generator.ts # 清单生成逻辑
│   ├── ui/              # UI组件
│   │   ├── App.tsx      # 主应用组件
│   │   ├── styles.css   # 样式文件
│   │   └── components/  # 子组件
│   │       ├── ParticleBackground.tsx
│   │       ├── Scene3D.tsx
│   │       ├── SupplyForm.tsx
│   │       └── SupplyList.tsx
│   └── main.tsx         # 入口文件
├── functions/           # 边缘函数
│   └── api/
│       └── generate.ts  # 清单生成API
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 功能特性

- ✅ 智能物资推荐算法
- ✅ 保质期自动计算和提醒
- ✅ 采购优先级标注
- ✅ 城市特征识别
- ✅ 3D交互场景
- ✅ 粒子动画效果
- ✅ 响应式设计
- ✅ 边缘函数支持

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎提交Issue或Pull Request。
