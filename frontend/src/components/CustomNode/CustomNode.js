import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import ImageUpload from '../ImageUpload';

const handleStyle = { left: 10 };

function CustomNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="custom-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className='node-content'>
        <input id="title" name="title" onChange={onChange} className="nodrag"
        placeholder='Title' maxLength={20}/>
        <input id="description" name="description" onChange={onChange} className="nodrag" 
        placeholder='Description'/>
        <ImageUpload id={data.label} />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomNode;