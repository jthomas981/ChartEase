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

import DecisionNode from '../components/Decision/DecisionNode.js'
import '../components/Decision/decision-node.css'
import ProcessNode from '../components/Process/ProcessNode.js'
import '../components/Process/process-node.css'
import TerminalNode from '../components/Terminal/TerminalNode.js';
import '../components/Terminal/terminal-node.css'

const flowKey = 'example-flow';

const getNodeId = () => `randomnode_${+new Date()}`;

const nodeTypes = { 
  decisionNode: DecisionNode,
  processNode: ProcessNode,
  terminalNode: TerminalNode,
};

const initialNodes = [
  { id: '1', type: 'decisionNode', position: { x: 0, y: 0 }, data: { label: '' }},
  { id: '2', type: 'processNode', position: { x: 0, y: 400 }, data: { label: '' }},
  { id: '3', type: 'terminalNode', position: { x: 0, y: 400 }, data: { label: '' }},
];

function Dashboard() {
  const { user } = useSelector((state) => state.auth) 
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [rfInstance, setRfInstance] = useState(null);
  const inputRef = useRef(null);
  const { setViewport } = useReactFlow();

  const [nodeLabel, setNodeLabel] = useState(initialNodes[0]?.data?.label);
  const [selectedNodeId, setSelectedNodeId] = useState(initialNodes[0]?.id || '');
  const [borderClass, setBorderClass] = useState('');

  const onNodeDragStart = useCallback((event, node) => {
    setBorderClass('')
  }, []);

  const onNodeDrag = useCallback((event, node) => {
    setSelectedNodeId(node.id);
    
    // Select the green border based upon the node type.
    if (node.type === 'processNode') {
      setBorderClass('process-green-border')
    } else if (node.type === 'decisionNode') {
      setBorderClass('decision-green-border')
    } else if (node.type === 'terminalNode') {
      setBorderClass('terminal-green-border')
    }

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

  const addNode = useCallback((type) => {
    const newNode = {
      id: getNodeId(),
      type,
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
      data: { label: '' },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Select the blue border based upon the node type.
    const node = nodes.find(node => node.id === selectedNodeId)
    if (node.type === 'processNode') {
      setBorderClass('process-blue-border')
    } else if (node.type === 'decisionNode') {
      setBorderClass('decision-blue-border')
    } else if (node.type === 'terminalNode') {
      setBorderClass('terminal-blue-border')
    }
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            className: borderClass,
            data: {
              ...node.data,
              label: nodeLabel,
            }
          };
        }
        return node;
      }),
    );
  }, [borderClass, nodeLabel, selectedNodeId, setNodes, setEdges]);

  return (
    <div id="flowchart">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        snapToGrid
	      snapGrid={[25, 25]}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        fitView
      >
        <Panel>
          <div className="node-control-panel">
            <div className="edit-node-text">
              <label className='btn' onClick={handleLabelClick}>Click here to edit the node's text:</label>
              <input
                className='hidden-input'
                type='text'
                onChange={(e) => setNodeLabel(e.target.value)}
                ref={inputRef}
              />
            </div>

            <div className="add-node">
              <label>Click to add nodes:</label>
              <div className="add-node-buttons">
                <button onClick={() => addNode('processNode')}>
                  <img 
                    height={50}
                    width={100}
                    src='processNode.png'
                  />
                </button>
                <button onClick={() => addNode('decisionNode')}>
                  <img 
                    height={50}
                    width={50}
                    src='decisionNode.png'
                  />
                </button>
                <button onClick={() => addNode('terminalNode')}>
                  <img 
                    height={50}
                    width={100}
                    src='terminalNode.png'
                  />
                </button>
              </div>
            </div>

            

            {user ? (
              <div className='save-controls'>
                <button className='btn' onClick={onSave}>save</button>
                <button className='btn' onClick={onRestore}>restore</button>
              </div>
            ) : (
              <p className='login-to-save'>Please login in to save your flowchart.</p>
            )}
          </div>
        </Panel>
        <Controls />
        <Background variant="dots" gap={25} size={2} />
      </ReactFlow>
    </div> 
  );
}

export default () => (
  <ReactFlowProvider>
    <Dashboard />
  </ReactFlowProvider>
);