import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FlowchartForm from '../components/FlowchartForm'
import FlowchartItem from '../components/FlowchartItem'
import Spinner from '../components/Spinner'
import { getFlowcharts, reset } from '../features/flowcharts/flowchartSlice'

function Flowcharts() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { flowcharts, isLoading, isError, message } = useSelector((state) => state.flowchart)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getFlowcharts())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate. isError, message, dispatch])

  if (isLoading) {
    return <Spinner /> 
  }

  return <>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>Flowcharts Dashboard</p>
    </section>

    <section className="content">
      {flowcharts.length > 0 ? (
        <div className="flowcharts">
          {flowcharts.map((flowchart) => (
            <FlowchartItem key={flowchart._id} flowchart={flowchart} />
          ))}
        </div>
      ) : (
        <h3>You have no flowcharts at the moment.</h3>
      )}
    </section>
  </>
}

export default Flowcharts