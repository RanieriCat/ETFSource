import { Application, Container, Graphics, Text } from 'pixi.js';
import { useEffect, useRef } from 'react';
import type { CompanyExposure } from '../../portfolio/types/domain';
import { palette } from '../utils/colors';

interface TreemapChartProps {
  width?: number;
  height?: number;
  rows: CompanyExposure[];
}

export const TreemapChart = ({ width = 800, height = 320, rows }: TreemapChartProps) => {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hostRef.current) return;

    const app = new Application();
    const top = rows.slice(0, 8);
    const total = top.reduce((sum, row) => sum + row.weight, 0) || 1;

    void app.init({ width, height, backgroundColor: 0x0f172a, antialias: true }).then(() => {
      hostRef.current?.appendChild(app.canvas);
      const layer = new Container();
      app.stage.addChild(layer);

      let cursor = 0;
      top.forEach((row, index) => {
        const rectWidth = (row.weight / total) * width;
        const rect = new Graphics().rect(cursor, 0, rectWidth, height).fill(palette[index % palette.length]);
        const label = new Text({
          text: `${row.company}\n${row.weight.toFixed(1)}%`,
          style: { fill: '#ffffff', fontSize: 13 }
        });
        label.x = cursor + 8;
        label.y = 12;
        layer.addChild(rect, label);
        cursor += rectWidth;
      });
    });

    return () => {
      app.destroy(true, { children: true });
    };
  }, [height, rows, width]);

  return <div ref={hostRef} />;
};
