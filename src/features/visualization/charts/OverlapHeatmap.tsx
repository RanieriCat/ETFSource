import { Application, Container, Graphics, Text } from 'pixi.js';
import { useEffect, useRef } from 'react';
import type { OverlapPair } from '../../portfolio/types/domain';

interface OverlapHeatmapProps {
  rows: OverlapPair[];
  width?: number;
  height?: number;
}

export const OverlapHeatmap = ({ rows, width = 500, height = 220 }: OverlapHeatmapProps) => {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hostRef.current) return;

    const app = new Application();
    const top = rows.slice(0, 6);
    const max = Math.max(...top.map((row) => row.overlapWeight), 1);
    const cellWidth = width / (top.length || 1);

    void app.init({ width, height, backgroundColor: 0x111827, antialias: true }).then(() => {
      hostRef.current?.appendChild(app.canvas);
      const layer = new Container();
      app.stage.addChild(layer);

      top.forEach((row, index) => {
        const normalized = row.overlapWeight / max;
        const color = Math.floor(0x223355 + normalized * 0x99aa44);
        const cell = new Graphics().rect(index * cellWidth + 8, 40, cellWidth - 16, height - 70).fill(color);
        const label = new Text({
          text: `${row.etfA}-${row.etfB}\n${row.overlapWeight.toFixed(1)}%`,
          style: { fill: '#e5e7eb', fontSize: 12 }
        });
        label.x = index * cellWidth + 12;
        label.y = 12;
        layer.addChild(cell, label);
      });
    });

    return () => {
      app.destroy(true, { children: true });
    };
  }, [height, rows, width]);

  return <div ref={hostRef} />;
};
