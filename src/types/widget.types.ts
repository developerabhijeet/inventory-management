import { ReactNode } from "react";

export interface WidgetProps {
  title: string;
  value: number | string;
  icons: ReactNode;
}
