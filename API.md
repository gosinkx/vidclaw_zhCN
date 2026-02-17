# API 参考

所有端点均在 `localhost:3333` 提供服务。

## 任务 (Tasks)

| 方法 | 端点 | 描述 |
|--------|----------|-------------|
| GET | `/api/tasks` | 列出所有任务 |
| POST | `/api/tasks` | 创建任务 |
| PUT | `/api/tasks/:id` | 更新任务 |
| DELETE | `/api/tasks/:id` | 删除任务 |
| POST | `/api/tasks/:id/run` | 标记任务立即执行 |
| POST | `/api/tasks/:id/pickup` | 标记任务已被代理接收 |
| POST | `/api/tasks/:id/complete` | 标记任务为已完成并附带结果 |
| GET | `/api/tasks/queue` | 获取可执行任务队列 (按优先级排序) |

## 使用情况与模型 (Usage & Models)

| 方法 | 端点 | 描述 |
|--------|----------|-------------|
| GET | `/api/usage` | 获取包含速率限制百分比的使用情况统计 |
| GET | `/api/models` | 列出可用模型 (来自 openclaw.json) |
| POST | `/api/model` | 切换当前活动模型 |

## 技能 (Skills)

| 方法 | 端点 | 描述 |
|--------|----------|-------------|
| GET | `/api/skills` | 列出所有及其状态 |
| POST | `/api/skills/:id/toggle` | 启用/禁用某项技能 |
| POST | `/api/skills/create` | 创建自定义工作区技能 |
| GET | `/api/skills/:id/content` | 读取完整的 SKILL.md 内容 |
| DELETE | `/api/skills/:id` | 删除工作区技能 |

## 文件 (Files)

| 方法 | 端点 | 描述 |
|--------|----------|-------------|
| GET | `/api/files?path=` | 列出目录内容 |
| GET | `/api/files/content?path=` | 读取文件内容 |
| GET | `/api/files/download?path=` | 下载文件 |

## 灵魂与工作区文件 (Soul & Workspace Files)

| 方法 | 端点 | 描述 |
|--------|----------|-------------|
| GET | `/api/soul` | 读取 SOUL.md |
| PUT | `/api/soul` | 保存 SOUL.md (包含版本历史) |
| GET | `/api/soul/history` | 获取 SOUL.md 版本历史 |
| POST | `/api/soul/revert` | 回滚到之前的版本 |
| GET | `/api/soul/templates` | 列出人格 (Persona) 模板 |
| GET | `/api/workspace-file?name=` | 读取工作区文件 |
| PUT | `/api/workspace-file?name=` | 保存工作区文件 (包含历史记录) |

## 心跳 (Heartbeat)

| 方法 | 端点 | 描述 |
|--------|----------|-------------|
| GET | `/api/heartbeat` | 获取最后一次心跳时间戳 |
| POST | `/api/heartbeat` | 记录一次心跳 |

## 日历 (Calendar)

| 方法 | 端点 | 描述 |
|--------|----------|-------------|
| GET | `/api/calendar` | 从内存文件中获取活动数据 |
