import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '../components/CustomNode/CustomNode.js';
import '../components/CustomNode/custom-node.css'

const flowKey = 'example-flow';

const getNodeId = () => `randomnode_${+new Date()}`;

const nodeTypes = { customNode: CustomNode };

const initialNodes = [
  { id: '1', type: 'customNode', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', type: 'customNode', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function Dashboard() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const [nodeName, setNodeName] = useState('Node 1');
  const [nodeBg, setNodeBg] = useState('#eee');
  const [selectedNodeId, setSelectedNodeId] = useState('1');
  const [nodeHidden, setNodeHidden] = useState(false);

  const onNodeDragStart = useCallback((event, node) => {
    setSelectedNodeId(node.id);
    const selectedNode = nodes.find(n => n.id === node.id);
    if (selectedNode) {
      setNodeName(selectedNode.data.label);
      setNodeBg(selectedNode.style?.backgroundColor || '#eee');
      setNodeHidden(selectedNode.hidden || false);
    }
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

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
      data: { label: 'Added node' },
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);
 
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          // it's important that you create a new node object
          // in order to notify react flow about the change
          return {
            ...node,
            data: {
              ...node.data,
              label: nodeName,
            },
            style: {
              ...node.style,
              backgroundColor: nodeBg,
            },
            hidden: nodeHidden,
          };
        }
        return node;
      }),
    );
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.source === selectedNodeId || edge.target === selectedNodeId) {
          return {
            ...edge,
            hidden: nodeHidden,
          };
        }
        return edge;
      })
    );
  }, [nodeName, nodeBg, nodeHidden, selectedNodeId, setNodes, setEdges]);

  const handleNodeChange = (evt) => {
    const newSelectedNodeId = evt.target.value;
    setSelectedNodeId(newSelectedNodeId);
    const selectedNode = nodes.find(node => node.id === newSelectedNodeId);

    // Update nodeName with the label of the selected node
    if (selectedNode) {
      setNodeName(selectedNode.data.label);
    }
  };

  return (
    <div id="flowchart">
      <div className="updatenode__controls">
        <label>Select Node:</label>
        <select value={selectedNodeId} onChange={handleNodeChange}>
          {nodes.map(node => (
            <option key={node.id} value={node.id}>
              {node.data.label}
            </option>
          ))}
        </select>

        <label>Label:</label>
        <input
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />

        <label className="updatenode__bglabel">Background:</label>
        <input
          type="color"
          value={nodeBg}
          onChange={(evt) => setNodeBg(evt.target.value)}
        />

        <div className="updatenode__checkboxwrapper">
          <label>Hidden:</label>
          <input
            type="checkbox"
            checked={nodeHidden}
            onChange={(evt) => setNodeHidden(evt.target.checked)}
          />
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        snapToGrid
	      snapGrid={[50, 50]}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStart={onNodeDragStart}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        fitView
      >
        <Panel position="top-right">
          <button onClick={onSave}>save</button>
          <button onClick={onRestore}>restore</button>
          <button onClick={onAdd}>add node</button>
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