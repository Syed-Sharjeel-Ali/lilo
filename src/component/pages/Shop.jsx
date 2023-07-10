import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {addToCart} from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide" style={{ cursor: 'pointer', color:"white" }}>
        {isReadMore ? '...Read more' : ' Show less'}
      </span>
    </p>
  );
};
const Shop = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(products)
  const [loading, setLoading] = useState(false)
  let componentMounted=true;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const res = await fetch('https://fakestoreapi.com/products');
      
      if(componentMounted){
      setProducts(await res.clone().json());
      setFilter(await res.json())
      setLoading(false)
    }
    return()=>{
      componentMounted=false
    }
    };
    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

const Loading=()=>{
  return (
    <>
    <div className="col-md-3">
      <Skeleton height={350}/>
    </div>
    <div className="col-md-3">
      <Skeleton height={350}/>
    </div>
    <div className="col-md-3">
      <Skeleton height={350}/>
    </div>
    <div className="col-md-3">
      <Skeleton height={350}/>
    </div>
    </>
  )
 
}
const  filterProduct=(cat)=>{
  const updateList=products.filter((x)=>x.category === cat)
  setFilter(updateList);
}
const ShowProducts=()=>{
  return(
    <>

   
      <div className="buttons d-flex justify-content-center mb-5 pb-5">
        {/* Buttons for filtering */}
        <button className='btn btn-outline-dark me-2'onClick={()=>setFilter(products)}>All</button>
    <button className='btn btn-outline-dark me-2'onClick={()=>filterProduct("men's clothing")}>Mens Clothing</button>
    <button className='btn btn-outline-dark me-2'onClick={()=>filterProduct("women's clothing")}>Womens</button>
    <button className='btn btn-outline-dark me-2'onClick={()=>filterProduct("jewelery")}>Jewelery</button>
    <button className='btn btn-outline-dark me-2'onClick={()=>filterProduct("electronics")}>Electronics</button>
      </div>

      <div className="row">
        {/* Map over filtered products */}
        {filter.map((filterItems) => (
          
          <div className="col-md-3" key={filterItems.id} style={{marginBottom:"20px"}}>
            <div className="card" >
              <Link to={`/shop/${filterItems.id}`}>
              <div className="image-container" style={{height:"230px",alignItems:'center',justifyContent:'center'}}>
                <img src={filterItems.image} alt="" style={{maxHeight:"100%",maxWidth:"100%",}} />
                <p>{filterItems.title}</p>
                <h5>{filterItems.price}</h5>
                </div>
              </Link>
              <button onClick={() => handleAdd(filterItems)} className="btn">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

   

  return (
    <>

<div className="container bg-dark mt-5">
        <div className="row">
          <div className="col-md-12 text-white h4 mt-4 ml-3">Winter Sale</div>
          <div className="col-md-12 mt-3 mb-4 wintersaletext text-secondary" >
          <ReadMore>
            Slash winter Sales begins . Get up to 80% Discount on all products
            GeeksforGeeks: A Computer Science portal for geeks. 
          It contains well written, well thought and well explained
          computer science, programming articles and quizzes. 
          It provides a variety of services for you to learn, so thrive
          and also have fun! Free Tutorials, Millions of Articles, Live, 
          Online and Classroom Courses ,Frequent Coding Competitions,
          Webinars by Industry Experts, Internship opportunities, and Job
          Opportunities. Knowledge is power!
            </ReadMore>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-10">
            <b>Showing 1 - 20</b> out of 100 Products
          </div>
          <div className="col-md-2">
            Sort by: <b>New Arrival</b>
          </div>
        </div>
      </div>

    <div>
      <div className="container my-5 py-5" >
      
        <div className="row" >
        <div>
          {loading ? <Loading/> : <ShowProducts/> }
          </div>
        </div>
      </div>
    </div>


    
    </>
  );
};

export default Shop;
