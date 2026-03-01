import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  location: string;
}

export default function PageTransition({ children, location: _location }: PageTransitionProps) {
  return <div className="w-full">{children}</div>;
}
