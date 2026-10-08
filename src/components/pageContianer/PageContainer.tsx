import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="flex min-h-screen w-screen justify-center m-0">
      {children}
    </div>
  );
}
