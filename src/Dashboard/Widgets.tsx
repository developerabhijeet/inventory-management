import React from 'react'

interface WidgetProps {
  title: string;
  value: number | string;
}

const Widgets = ({ widgetData }: { widgetData: WidgetProps[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {widgetData.map((widget) => <div className="bg-green-900 text-white p-6 rounded-lg shadow">
        <p className="text-lg font-bold">{widget.title}</p>
        <p className="text-2xl mt-2">{widget.value}</p>
      </div>)}
    </div>
  )
}

export default Widgets
