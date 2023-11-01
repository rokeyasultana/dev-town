import React, { useState, useEffect } from "react";
import styled from "styled-components";

const productsData = [
  {
    id: 1,
    title: "Ultra Cotton Tee",
    category: "Clothing",
    description:
      "Environmentally-friendly manufactured cotton that gives thicker vintage feel to the shirt. Long lasting garment suitable for everyday use",
    price: 18.28,
    image:
      "https://images-api.printify.com/mockup/653e669f072e35d38108bf29/21889/97933/unisex-ultra-cotton-tee_1698588344907.jpg?camera_label=front&s=400",
  },
  {
    id: 2,
    title: "Midweight Cotton Tee",
    category: "Clothing",
    description:
      "Solid colors are 100% cotton, heather colors are 50% cotton, 50% polyester ), antique colors are 90% cotton, 10% polyester",
    price: 19.3,
    image:
      "https://images.printify.com/mockup/653e51121113b2d079071cfc/66517/88?s=608&t=1698582827000",
  },
  {
    id: 3,
    title: "HINISO Mini Projector ",
    category: "Electronics",
    description:
      "No need to clean the lens anymore. The dust-proof 4K projector engineers a fully-sealed optical engine that dust would never go behind the lens,  other optical components. ",
    price: 519.3,
    image: "https://m.media-amazon.com/images/I/81ChzbwaNIL._AC_UL320_.jpg",
  },

  {
    id: 4,
    title: "HP M120 Wireless Mouse",
    category: "Electronics",
    description:
      "Work effortlessly by dragging and dropping across devices with multi-OS compatibility, supporting Windows 10/11 and macOS. ",
    price: 519.3,
    image: "https://m.media-amazon.com/images/I/61Zv+ufF51L._AC_UL320_.jpg",
  },

  {
    id: 5,
    title: "White Vase Flower Vase",
    category: "Home Decor",
    description:
      "THE CLASS A CERAMIC VASES - The flower vase is made of quality class A ceramic with glazed finish, with a smooth surface and a clean and solid white,  and modern style.",
    price: 20,
    image: "https://m.media-amazon.com/images/I/61CHZ7P6WnL._SX679_.jpg",
  },

  {
    id: 6,
    title: "UHUD CRAFTS Hanging Shelves",
    category: "Home Decor",
    description:
      "No need for DIY stress. The ready-to-use hanging shelves come complete with easy to use hooks & wall anchors.  ",
    price: 519.3,
    image: "https://m.media-amazon.com/images/I/61I3xo6idhL._AC_UL320_.jpg",
  },
  ,
  {
    id: 7,
    title: "California Almonds ",
    category: "Food",
    description:
      "High protein, dietary fiber, no gluten, no GMO, zero trans fat, zero cholesterol Rich source of omega-3, anti oxidants and vitamins, calcium, iron and magnesium ",
    price: 10.0,
    image: "https://m.media-amazon.com/images/I/71M6kMdnqTL._SL1500_.jpg",
  },

  {
    id: 8,
    title: "Schezwan Fried Rice",
    category: "Food",
    description:
      "YUM MEAL WITH GOODNESS: Tata Sampann Yumside has a range of Ready to Eat meals that you can serve in 60 seconds – Just heat and eat! ",
    price: 9.0,
    image: "https://m.media-amazon.com/images/I/61SwhHGVryL._SX679_.jpg",
  },
];

const ProductsList = () => {
  const [products, setProducts] = useState(productsData);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("price-asc");
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
      .filter(
        (product) =>
          categoryFilter === "all" || product.category === categoryFilter
      )
      .sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
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
    <div>
      <Banner>
        <BannerImage
          src="https://img.freepik.com/free-photo/front-view-smiley-woman-with-clothes_23-2149731146.jpg"
          alt="Product Image"
        />
        <BannerText>
          <h2>Special Offer</h2>
          <p className="offer">Buy 1 Get 1 Free on Food Products!</p>
          <p>
            Don't miss out on our exclusive promotion – Buy any Food item and
            get another one absolutely free! Shop today and save.
          </p>
        </BannerText>
      </Banner>

      <Container>
        <h1>All Products</h1>
        <Filters>
          <Filter>
            <label>Filter by Category:</label>
            <select onChange={handleChangeCategory}>
              <option value="all">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Food">Food</option>
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
              <div className="product-details">
                <p className="price">Price: ${product.price}</p>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
            </Product>
          ))}
        </ProductList>
        <Pagination>
          <p>
            Page {currentPage} of {totalPages}
          </p>
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
      <FooterContainer>
        <FooterContent>
          <div>
            <h4>Contact Us</h4>
            <p>Email: contact@example.com</p>
            <p>Phone: +123-456-7890</p>
          </div>
          <div>
            <h4>Address</h4>
            <p>123 Main Street</p>
            <p>City, State 12345</p>
          </div>
          <div>
            <h4>Follow Us</h4>
            <SocialLinks>
              <a href="#" className="link">Facebook</a>
              <a href="#" className="link">Twitter</a>
              <a href="#" className="link">Instagram</a>
            </SocialLinks>
          </div>
        </FooterContent>
        <Copyright>&copy; 2023 Your Website Name</Copyright>
      </FooterContainer>
    </div>
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
  text-align: left;
  height: 450px;

  img {
    max-width: 100%;
    height: 200px;
    border-bottom: 1px solid #ddd;
  }
  .price {
    font-weight: bold;
    text-align: right;
    color: coral;
  }
`;
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
  background: ${(props) => (props.active ? "coral" : "transparent")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? "coral" : "#ddd")};
    color: ${(props) => (props.active ? "white" : "black")};
  }
`;
const Banner = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: space-between;
  background-color: #f0f0f0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px coral;
  margin-top: 50px;
  margin-left: 150px;
  margin-right: 150px;
  margin-bottom: 50px;
`;

const BannerImage = styled.img`
  max-width: 100%;
  height: 300px;
  border-radius: 5px;
`;

const BannerText = styled.div`
  flex: 1;
  text-align: left;
  .offer {
    color: coral;
    font-size: 20px;
  }
`;
const FooterContainer = styled.footer`
  background-color:black;
  color: #fff;
  padding: 20px 0;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 800px;
  margin: 0 auto;
  flex-wrap: wrap;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  .link{
    color: Tomato;
 
  }
`;

const Copyright = styled.p`
  text-align: center;
  margin-top: 20px;
  color:Coral;
`;
