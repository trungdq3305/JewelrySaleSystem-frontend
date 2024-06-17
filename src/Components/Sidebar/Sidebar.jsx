import React from 'react'
import styles from '../Sidebar/Sidebar.module.scss'

const Sidebar = ({ materials, gems }) => {
  return (
    <div className={styles.SidebarContainer}>
      <div className={styles.Sidebar}>
        <ul>
          <li>
            TYPES
            <ul>
              <li>
                <a>Ring</a>
              </li>
              <li>
                <a>Necklace</a>
              </li>
              <li>
                <a>Charm</a>
              </li>
              <li>
                <a>Earring</a>
              </li>
              <li>
                <a>Bracelet</a>
              </li>
            </ul>
          </li>
          <li>
            MATERIAL
            <ul>
              {materials !== null ? (
                materials.map((material, index) => {
                  return (
                    <li key={index}>
                      <a>{material.GoldName}</a>
                    </li>
                  )
                })
              ) : (
                <li></li>
              )}
            </ul>
          </li>
          <li>
            GEM
            <ul>
              {gems !== null ? (
                gems.map((gem, index) => {
                  return (
                    <li key={index}>
                      <a>{gem.name}</a>
                    </li>
                  )
                })
              ) : (
                <li></li>
              )}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
