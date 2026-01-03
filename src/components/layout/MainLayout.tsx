import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { ExpiredNotification } from "../ExpiredNotification";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 min-h-screen p-8">
        {children}
      </main>
      <ExpiredNotification />
    </div>
  );
};
