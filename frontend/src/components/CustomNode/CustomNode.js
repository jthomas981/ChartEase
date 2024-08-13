import React, { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import ImageUpload from '../ImageUpload';
import { FaGripLines } from 'react-icons/fa';

function CustomNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="custom-node">
      {/* Target Handles */}
      <Handle
        className="target-handle"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        className="target-handle"
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      {/* Node Content */}
      <div className="node-content">
        {/* Multi-line Input */}
        <textarea
          id="title"
          name="title"
          onChange={onChange}
          className="nodrag"
          placeholder="Title"
          maxLength={150} // Adjusted maxLength for textarea
        />
        
        <div className="grip-lines">
          <FaGripLines />
        </div>
        <ImageUpload id={`${data.label}-1`} />
        <ImageUpload id={`${data.label}-2`} />
        <ImageUpload id={`${data.label}-3`} />
        <ImageUpload id={`${data.label}-4`} />
        <div className="grip-lines">
          <FaGripLines />
        </div>
      </div>

      {/* Source Handles */}
      <Handle
        className="source-handle"
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        className="source-handle"
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomNode;
