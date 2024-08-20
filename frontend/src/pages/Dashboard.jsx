import { useCallback, useEffect, useState, useRef } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Controls,
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  Panel,
} from '@xyflow/react';
import { useSelector } from 'react-redux'

import '@xyflow/react/dist/style.css';
import CustomNode from '../components/CustomNode/CustomNode.js';
import '../components/CustomNode/custom-node.css'

const flowKey = 'example-flow';

const getNodeId = () => `randomnode_${+new Date()}`;

const nodeTypes = { customNode: CustomNode };

const initialNodes = [
  { id: '1', type: 'customNode', position: { x: 0, y: 0 }, data: { label: '' }, style: { background: '#ffff00' } },
  { id: '2', type: 'customNode', position: { x: 0, y: 400 }, data: { label: '' }},
];

function Dashboard() {
  const { user } = useSelector((state) => state.auth) 
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [rfInstance, setRfInstance] = useState(null);
  const inputRef = useRef(null);
  const { setViewport } = useReactFlow();

  const [nodeLabel, setNodeLabel] = useState(initialNodes[0]?.data?.label);
  const [nodeBg, setNodeBg] = useState('#ffff00');
  const [selectedNodeId, setSelectedNodeId] = useState(initialNodes[0]?.id || '');
  const [nodeBorder, setNodeBorder] = useState('');

  const onNodeDragStart = useCallback((event, node) => {
    setNodeBorder('2px solid transparent')
  }, []);

  const onNodeDrag = useCallback((event, node) => {
    setSelectedNodeId(node.id);
    setNodeBorder('2px solid green')
    setNodeBg(node.style?.background || '#eee');
    setNodeLabel(node.data?.label || '')
    console.log(node)
  })

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      type: 'customNode',
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
      data: { label: '' },
      style: { background: '#ffff00' },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    setNodeBorder('2px dashed blue')
  };

  const squareBackground = () => {
    setNodeBg('blue')
  }
 
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          // it's important that you create a new node object
          // in order to notify react flow about the change
          return {
            ...node,
            style: {
              ...node.style,
              background: nodeBg,
              border: nodeBorder,
            },
            data: {
              ...node.data,
              label: nodeLabel,
            }
          };
        }
        return node;
      }),
    );
  }, [nodeBorder, nodeBg, nodeLabel, selectedNodeId, setNodes, setEdges]);

  return (
    <div id="flowchart">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        snapToGrid
	      snapGrid={[50, 50]}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        fitView
      >
        {user ? (
          <Panel position="top-right">
            <button onClick={onSave}>save</button>
            <button onClick={onRestore}>restore</button>
          </Panel>
        ) : (
          <Panel position='top-right'>
            <p>Please login in to save your flowchart.</p>
          </Panel>
        )}
        <Panel>
          <div className="updatenode__controls">
            <label className='edit-node-text' onClick={handleLabelClick}>Click here to edit the node's text:</label>
            <input
              className='hidden-input'
              type='text'
              onChange={(e) => setNodeLabel(e.target.value)}
              ref={inputRef}
            />

            <label className="updatenode__bglabel">Backgrounds:</label>
            
            <button onClick={squareBackground}>Square</button>
            <button onClick={squareBackground}>Square</button>
            <button onClick={squareBackground}>Square</button>

            <button onClick={onAdd}>add node</button>
          </div>
        </Panel>
        <Controls />
        <Background variant="dots" gap={50} size={2} />
      </ReactFlow>
    </div> 
  );
}

export default () => (
  <ReactFlowProvider>
    <Dashboard />
  </ReactFlowProvider>
);