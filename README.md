# VidClaw

一个安全、自托管的 OpenClaw AI 代理控制中心。

![深色主题仪表板，包含看板、使用情况追踪等](https://img.shields.io/badge/status-beta-orange)

## 功能特性

- **🗂️ 看板任务系统** — 待办 (Backlog) → 准备 (Todo) → 进行中 (In Progress) → 已完成 (Done)。支持拖拽操作、优先级设定、技能分配。您的代理将通过心跳 (Heartbeat) 或定时任务 (Cron) 自动接收任务。
- **📊 使用情况追踪** — 从会话记录中解析出的实时代币 (Token) 使用情况和成本估算。进度条与 Anthropic 的速率限制窗口对齐。
- **🔄 模型切换** — 直接从仪表板切换 Claude 模型。通过 OpenClaw 的配置监听器实现热重载。
- **📅 活动日历** — 按月查看代理活动，从内存文件和任务历史中解析。
- **📁 内容浏览器** — 浏览工作区文件，支持 Markdown 预览、语法高亮和下载。
- **🧩 技能管理器** — 查看所有内置/工作区技能，启用/禁用它们，或创建自定义技能。
- **💜 灵魂编辑器 (Soul Editor)** — 编辑 SOUL.md, IDENTITY.md, USER.md, AGENTS.md，支持版本历史和角色模板。
- **⚡ 任务执行** — 任务通过定时任务 (每 2 分钟) 或心跳 (每 30 分钟) 自动执行。点击“立即运行”可立即执行。

## 安全性

仪表板仅绑定到 **本地回环地址** (127.0.0.1:3333)。请通过 SSH 隧道访问：

```bash
ssh -L 3333:localhost:3333 root@your-server
```

然后在浏览器中打开 `http://localhost:3333`。无需暴露端口，无需额外认证 —— SSH 即是安全层。

## 快速安装

### 前置条件

- 已安装并运行 [OpenClaw](https://github.com/openclaw/openclaw)
- Node.js 18+ (见下文)
- 服务器的 SSH 访问权限

#### 安装 Node.js

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# macOS
brew install node

# 或使用 nvm (适用于各平台)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 22
```

### 设置

```bash
# 克隆到您的 OpenClaw 工作区
cd ~/.openclaw/workspace
git clone https://github.com/gosinkx/vidclaw_zhCN.git dashboard

# 运行设置脚本 (安装依赖、构建、设置 systemd)
cd dashboard
./setup.sh
```

就这么简单。设置脚本会处理一切 —— npm install、前端构建、systemd 服务创建，并自动启动仪表板。

通过 SSH 隧道访问：
```bash
ssh -L 3333:localhost:3333 root@your-server
# 然后打开 http://localhost:3333
```

设置脚本还会配置您的 `HEARTBEAT.md`，以便您的代理解自动从看板中获取任务。

## 配置

模型和使用数据会自动从您的 OpenClaw 配置 (`openclaw.json`) 中提取。

## API

完整的端点参考请参阅 [API.md](API.md)。

## 技术栈

- **前端:** React + Vite + Tailwind CSS
- **后端:** Express.js
- **数据:** JSON 文件 (无需数据库)
- **认证:** SSH 隧道 (零配置安全性)

## 许可证

MIT

---

由 [RedStudio](https://redstudio.ie) 为 [OpenClaw](https://github.com/openclaw/openclaw) 构建
