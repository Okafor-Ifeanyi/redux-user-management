import { ReactNode, use } from "react";
import { useNavigate } from "react-router-dom";


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

export const IntroBackground = () => {
  const navigate = useNavigate();
  return (
    <div className="intro-background">
        <h1>Welcome to this User Management list using React Redux</h1>
        <button type="button" onClick={() => navigate(`/users`)}>users list</button>
    </div>
  );
}