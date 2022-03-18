import { Category } from "../../Interfaces"
import { CategoryItem } from "../category-item.component"
import './directory.styles.scss'

export const Directory = ({categories}:any) => {
    return(
        <div className='directory-container'>
        {categories.map((category:Category) => (
        <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    )
}