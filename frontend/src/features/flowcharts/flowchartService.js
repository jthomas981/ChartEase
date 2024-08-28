import axios from 'axios'

const API_URL = '/api/flowchart/'

const getFlowcharts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const createFlowchart = async (flowchartData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, flowchartData, config)

  return response.data
}

const deleteFlowchart = async (flowchartId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + flowchartId, config)

  return response.data
}

const flowchartService = {
  getFlowcharts,
  createFlowchart,
  deleteFlowchart
}

export default flowchartService