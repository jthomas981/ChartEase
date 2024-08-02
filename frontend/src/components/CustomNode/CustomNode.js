import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import ImageUpload from '../ImageUpload';

function CustomNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="custom-node">
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
      <div className='node-content'>
        <input id="title" name="title" onChange={onChange} className="nodrag"
        placeholder='Title' maxLength={20}/>
        <ImageUpload id={data.label} />
      </div>
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