import React from "react";
import { WidgetProps } from "../types/widget.types";

const Widgets = ({ widgetData }: { widgetData: WidgetProps[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {widgetData.map((widget: WidgetProps, index: number) => (
        <div
          className="bg-green-900 text-white p-6 rounded-lg shadow"
          key={index}
        >
          <p className="text-lg font-bold">{widget.title}</p>
          <p className="text-2xl mt-2">{widget.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Widgets;
