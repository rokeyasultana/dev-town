import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const productsData = [

  { id: 1, title: 'Ultra Cotton Tee', category: 'Clothing', description: 'Environmentally-friendly manufactured cotton that gives thicker vintage feel to the shirt. Long lasting garment suitable for everyday use', price: 18.28, image: 'https://images-api.printify.com/mockup/653e669f072e35d38108bf29/21889/97933/unisex-ultra-cotton-tee_1698588344907.jpg?camera_label=front&s=400' },
  { id: 2, title: 'Midweight Cotton Tee', category: 'Clothing', description: 'Solid colors are 100% cotton, heather colors are 50% cotton, 50% polyester ), antique colors are 90% cotton, 10% polyester', price: 19.30, image: 'https://images.printify.com/mockup/653e51121113b2d079071cfc/66517/88?s=608&t=1698582827000' },
  { id: 3, title: 'HINISO Mini Projector ', category: 'Electronics', description: 'No need to clean the lens anymore. The dust-proof 4K projector engineers a fully-sealed optical engine that dust would never go behind the lens,  other optical components. ', price: 519.30, image: 'https://m.media-amazon.com/images/I/81ChzbwaNIL._AC_UL320_.jpg' },
 
  { id: 4, title: 'HP M120 Wireless Mouse', category: 'Electronics', description: 'Work effortlessly by dragging and dropping across devices with multi-OS compatibility, supporting Windows 10/11 and macOS. ', price: 519.30, image: 'https://m.media-amazon.com/images/I/61Zv+ufF51L._AC_UL320_.jpg' },
 
  { id: 5, title: 'White Vase/Office Desk Flower Vase', category: 'Home Decor', description: 'THE CLASS A CERAMIC VASES - The flower vase is made of quality class A ceramic with glazed finish, with a smooth surface and a clean and solid white,  and modern style.', price: 20, image: 'https://m.media-amazon.com/images/I/61CHZ7P6WnL._SX679_.jpg' },
 
  { id: 6, title: 'UHUD CRAFTS Hanging Shelves',category: 'Home Decor', description: 'No need for DIY stress. The ready-to-use hanging shelves come complete with easy to use hooks & wall anchors.  ', price: 519.30, image: 'https://m.media-amazon.com/images/I/61I3xo6idhL._AC_UL320_.jpg' },
 
];

const ProductsList = () => {
  const [products, setProducts] = useState(productsData);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleChangeCategory = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleChangeSort = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const filteredProducts = products
      .filter((product) => categoryFilter === 'all' || product.category === categoryFilter)
      .sort((a, b) => {
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        return 0;
      });

    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);
    setProductsToDisplay(productsToDisplay);
  }, [categoryFilter, sortOption, currentPage, products]);

  const [productsToDisplay, setProductsToDisplay] = useState([]);

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container>
      <Filters>
        <Filter>
          <label>Filter by Category:</label>
          <select onChange={handleChangeCategory}>
            <option value="all">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
          </select>
        </Filter>
        <Filter>
          <label>Sort by:</label>
          <select onChange={handleChangeSort}>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </Filter>
      </Filters>
      <ProductList>
        {productsToDisplay.map((product) => (
          <Product key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className='price'>Price: ${product.price}</p>
          </Product>
        ))}
      </ProductList>
      <Pagination>
        <p>Page {currentPage} of {totalPages}</p>
        <PageButtons>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              active={index + 1 === currentPage}
            >
              {index + 1}
            </PageButton>
          ))}
        </PageButtons>
      </Pagination>
    </Container>
  );
};

export default ProductsList;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  label {
    margin-right: 10px;
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const Product = styled.div`
  border: 1px solid #ddd;
  padding: 10px; 
  border-radius: 5px;
  text-align:left;
  height: 450px;

  img {
    max-width: 100%;
    height: 200px;
    border-bottom:1px solid #ddd;
  }
  .price{
    font-weight:bold;
  }
`
const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PageButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const PageButton = styled.button`
  background: ${(props) => (props.active ? 'blue' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? 'blue' : '#ddd')};
    color: ${(props) => (props.active ? 'white' : 'black')};
  }
`;
