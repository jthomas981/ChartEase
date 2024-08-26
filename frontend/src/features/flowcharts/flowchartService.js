import axios from 'axios'

const API_URL = '/api/flowchart/'

const getFlowchart = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const createFlowchart = async (flowchartData) => {
  const response = await axios.post(API_URL, flowchartData)

  return response.data
}

// const getFlowchart = async (id) => {
//   const response = await axios.post(API_URL, flowchartData)
//   const flowcharts = response.data

//   // Find flowchart with the id.
//   const flowchart = flowcharts.find(fc => fc._id === id)
  
//   if (flowchart) {
//     // Save the flowchart to localStorage. The dashboard will render it later.
//     localStorage.setItem(flowKey, JSON.stringify(response.data))
//   }
  
//   return response.data
// }

const updateFlowchart = async (id, flowchartData) => {
  const response = await axios.put(API_URL + id, flowchartData)

  return response.data
}

const deleteFlowchart = async (id) => {
  const response = await axios.delete(API_URL + id)

  return response.data
}

const flowchartService = {
  getFlowchart,
  createFlowchart,
  updateFlowchart,
  deleteFlowchart
}

export default flowchartService