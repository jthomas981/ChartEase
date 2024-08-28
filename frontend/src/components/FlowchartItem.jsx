import { useDispatch } from 'react-redux';
import { deleteFlowchart } from '../features/flowcharts/flowchartSlice'
import { useNavigate } from 'react-router-dom'

const flowKey = 'current-flow';

function FlowchartItem({flowchart}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loadFlowchart = () => {
    localStorage.setItem(flowKey, JSON.stringify(flowchart.content));
    navigate('/') 
  }

  const onDelete = () => {
    dispatch(deleteFlowchart(flowchart._id))
  }

  return (
    <div className="flowchart-item">
      <div>
        {new Date(flowchart.createdAt).toLocaleString('en-US')}
      </div>
      <h2 className='btn btn-block' onClick={loadFlowchart}>{flowchart.title}</h2>
      <button onClick={() => dispatch(deleteFlowchart(flowchart._id))} className="close">X</button>
    </div>
  )
}

export default FlowchartItem