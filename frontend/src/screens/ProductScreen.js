import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const Navigate = useNavigate(); // used to go to next page directly when we clicked on the particular button
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data }); //data is property in axios that givin us return value
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]); // [slug] that founded at the end of useEffect means dependency that allow rerender useEffect for each slug changed

  const { state, dispatch: ctxDispatch } = useContext(Store); //instead of Store.Consumer
  const { cart } = state; /*start Improve Add To Cart */
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((X) => X._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    // const { data } = await axios.get(`/api/products/${product._id}`);
    // if (data.countInStock < quantity) {
    //   window.alert('Sorry , product is not available right now');
    //   return; /*end Improve Add To Cart */
    // }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    Navigate('/cart'); // use to go to cart page direct when we clicked on the (Add to cart) button
  };
  /*ctxDispatch is a reference to the dispatch of useContext */

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Row>
      <Col md={6}>
        <img
          className="image-large"
          src={product.image}
          alt={product.name}
        ></img>
      </Col>
      <Col md={3}>
        <ListGroup>
          <ListGroup.Item>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h1>{product.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>Price : $ {product.price}</ListGroup.Item>
          <ListGroup.Item>
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
          </ListGroup.Item>
          <ListGroup.Item>Description : {product.description}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            {/* Add the flush variant to remove outer borders and rounded corners */}
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>$ {product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock > 0 ? (
                      <Badge bg="success"> InStock </Badge>
                    ) : (
                      <Badge bg="danger"> Unavailable </Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              {/* if countInStock is empty , the button hidden */}
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button onClick={addToCartHandler} variant="primary">
                      Add to cart
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ProductScreen;
