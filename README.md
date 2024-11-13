This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

跨站脚本攻击xss

跨域请求伪造csrf

数据泄露 未加密传输

敏感信息泄露 敏感信息硬编码

http-only 防止js读取cookie 减少xss攻击的风险

Content Security Policy CSP 防止xss攻击，限制网页可以加载的资源类型和来源

anti-csrf 每个用户请求中包含一个随机生成的token

ACL access control list 访问控制列表 限制用户对资源的访问

RBAC role-based access control 基于角色的访问控制 根据用户的角色来限制其对资源的访问

ABAC attribute-based access control 基于属性的访问控制 根据用户的属性（如部门、角色、权限等）来限制其对资源的访问

memorization 记忆化 缓存计算结果，避免重复计算
immutable 不可变 一旦创建，对象的状态不能被修改

reacitivity的原理 使用defineproperty或proxy劫持对象的get和set方法，当对象的属性发生变化时，通知订阅者