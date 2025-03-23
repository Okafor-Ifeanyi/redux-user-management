import { ReactNode } from "react";


interface LayoutProps {
    children: ReactNode;
}
export const CardBackground = ({ children }: LayoutProps) => {
  return (
    <div className="card-background">
        {children}
    </div>
  );
}

export const FormBackground = ({ children }: LayoutProps) => {
  return (
    <div className="form-background">
        {children}
    </div>
  );
}