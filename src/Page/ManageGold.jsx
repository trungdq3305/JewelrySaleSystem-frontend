import React, { useEffect, useState } from 'react'
import GoldTable from '../Components/Gold/GoldTable'
import { getAllGold } from '../Configs/axios'

const ManageGold = () => {
  const [gold, setGold] = useState([])
  const loadGolds = async () => {
    const result = await getAllGold()
    if (result !== null) {
      setGold(result.data)
    }

    console.log(result.data)
  }
  useEffect(() => {
    loadGolds()
  }, [])
  return <GoldTable goldList={gold} />
}

export default ManageGold
