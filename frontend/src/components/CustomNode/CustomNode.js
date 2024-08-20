import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data, isConnectable }) => {
  return (
    <div className="custom-node">
      {/* Node Content */}
      <div className="node-content">
        <textarea
          className='nodrag'
          value={data.label}
          placeholder='Edit this node using the control panel above.'
        />
      </div>

      {/* Target Handles */}
      <Handle
        className="target-handle1"
        type="target"
        id="a"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        className="target-handle2"
        type="target"
        id="b"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      {/* Source Handles */}
      <Handle
        className="source-handle"
        type="source"
        position={Position.Right}
        id="1"
        isConnectable={isConnectable}
      />
      <Handle
        className="source-handle"
        type="source"
        position={Position.Bottom}
        id="2"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CustomNode;
