import React from "react"

function Categories ({ value, onClickСategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']
    
  return (
        <div className="categories">
              <ul>
                  {categories.map((categoryName, index) => (
                    <li onClick={() => onClickСategory(index)} 
                        className={value === index ? "active" : ''}
                        key={categoryName + index}>
                    {categoryName}
                    </li>
                  ))}
              </ul>
            </div>
    )
}

export default Categories