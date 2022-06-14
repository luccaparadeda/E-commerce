import { useEffect } from 'react'
import './shop.styles.scss'
import {Routes, Route} from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import { fetchCategoriesAsync, fetchCategoriesStart } from '../../store/categories/category.action'
import { useDispatch } from 'react-redux'

export const Shop = () => {
    const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCategoriesStart());
  }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}