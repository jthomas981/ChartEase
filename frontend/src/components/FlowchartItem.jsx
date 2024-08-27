import { useNavigate } from 'react-router-dom'

const flowKey = 'current-flow';

function FlowchartItem({flowchart}) {
  const navigate = useNavigate()

  const loadFlowchart = () => {
    localStorage.setItem(flowKey, JSON.stringify(flowchart.content));
    navigate('/') 
  }

  return (
    <div className="flowchart-item btn btn-block" onClick={loadFlowchart}>
      <div>
        {new Date(flowchart.createdAt).toLocaleString('en-US')}
      </div>
      <h2>{flowchart.title}</h2>
    </div>
  )
}

export default FlowchartItem