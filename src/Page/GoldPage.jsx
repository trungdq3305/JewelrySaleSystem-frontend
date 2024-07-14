import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import styles from '../Page/Scss/Goldpage.module.scss'
import Gold from '../Components/Gold/Gold'
import axios from 'axios'

function GoldPage() {
  const [gold, setGold] = useState()

  const fetchGold = async () => {
    try {
      //   const res = await fetch(
      //     '/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v'

      //   )
      const res = await axios.get(
        '/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v'
      )
      setGold(res)
      const goldList = res.data.DataList.Data
      const goldListJson = []
      goldList.forEach((element) => {
        const rowNumber = element['@row']
        let goldJson = {
          goldName: element[`@n_${rowNumber}`],
          purchasePrice: element[`@pb_${rowNumber}`],
          salePrice: element[`@ps_${rowNumber}`],
          modifiedDate: element[`@d_${rowNumber}`],
          kara: element[`@k_${rowNumber}`],
          goldPercent: element[`@h_${rowNumber}`],
          worldPrice: element[`@pt_${rowNumber}`],
        }
        console.log(goldJson)
      })
      console.log(res.data.DataList.Data)
    } catch (error) {
      console.error('Error fetching the gold price:', error)
    }
  }

  useEffect(() => {
    fetchGold()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.bodyContainer}>
          <Gold />
        </div>
      </div>
    </>
  )
}

export default GoldPage
