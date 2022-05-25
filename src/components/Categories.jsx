import React, { useState } from "react"

function Categories () {

  const [active, setActive] = useState(0)

  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

  const onClickCategorie = (index) => {
    setActive(index)
  }
    return (
        <div className="categories">
              <ul>
                  {categories.map((value, index) => (
                    <li onClick={() => onClickCategorie(index)} 
                        className={active === index ? "active" : ''}
                        key={value}>
                    {value}
                    </li>
                  ))}
              </ul>
            </div>
    )
}

export default Categories