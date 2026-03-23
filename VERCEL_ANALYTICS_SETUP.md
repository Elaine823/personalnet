# Vercel Analytics 接入说明

你当前仓库是**原生 HTML/CSS/JS**（没有 React Layout），所以文档里那句

> Import and use the `<Analytics />` React component into your app's layout.

只适用于 Next.js / React 项目。

## 如果你是 Next.js（App Router）
在 `app/layout.tsx`（或 `app/layout.jsx`）里这样写：

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 如果你是 Next.js（Pages Router）
在 `pages/_app.tsx`（或 `pages/_app.jsx`）里这样写：

```tsx
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

## 如果你是当前这个仓库（静态站点）
不能使用 React 组件方式，直接在 `index.html` 的 `</head>` 前加：

```html
<script defer src="/_vercel/insights/script.js"></script>
```

这样部署到 Vercel 后也能采集 Analytics。
