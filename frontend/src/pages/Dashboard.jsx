import { useCallback, useState } from 'react';
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
import ImageUpload from '../components/ImageUpload.jsx';
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