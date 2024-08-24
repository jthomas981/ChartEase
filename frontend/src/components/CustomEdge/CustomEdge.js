import React from 'react';
import { getBezierPath, getEdgeCenter } from '@xyflow/react';
import './edgeStyle.css'

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, label }) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const [centerX, centerY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        d={edgePath}
        style={{ stroke: '#000', strokeWidth: 2, fill: 'none' }} // Default styling
      />
      <text x={centerX} y={centerY} fill="#000" textAnchor="middle" dy="-10">
        {label}
      </text>
    </>
  );
};

export default CustomEdge;
