import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './terminal-node.css'

const TerminalNode = ({ data, isConnectable }) => {
  return (
    <div className="terminal-node">
      {/* Node Content */}
      <div className="node-content">
        <textarea
          value={data.label}
          placeholder='Edit this node using the control panel above.'
        />
      </div>

      {/* Target Handles */}
      <Handle
        className="target-handle"
        type="target"
        id="a"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        className="target-handle"
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

export default TerminalNode;
