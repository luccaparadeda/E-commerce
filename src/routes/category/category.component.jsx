import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {ProductCard} from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectCategoriesMap, selectIsLoading } from '../../store/categories/category.selector';
import './category.styles.jsx';
import { CategoryContainer, Title } from './category.styles.jsx';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectIsLoading)
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  console.log(isLoading)
  return (
    <>
      <Title className='category-title'>{category.toUpperCase()}</Title>
      {
        isLoading ? (
        <Spinner/>
        ) : (
          <CategoryContainer>
              {products &&
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
          </CategoryContainer>
      )}
    </>   
  );
};

export default Category;