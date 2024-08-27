import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createFlowchart } from '../features/flowcharts/flowchartSlice'

const flowKey = 'current-flow';

function FlowchartForm() {
  const [title, setTitle] = useState('')

  const dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault()

    const content = JSON.parse(localStorage.getItem(flowKey));

    dispatch(createFlowchart({ content, title }))
    setTitle('')
  }

  return <section className='form'>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input 
          type="title" 
          name="title" 
          id="title" 
          value={title}
          placeholder='Title' 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <button className="btn btn-block" tyep='submit'>Save</button>
      </div>
    </form>
  </section>
}

export default FlowchartForm