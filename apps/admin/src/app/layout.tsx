import '@udance/styles/globals-admin.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html data-theme="udance" lang="en">
      <body>{children}</body>
    </html>
  );
}
