
import  Sidebar  from '../components/Sidebar'
import { Doughnut } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, Table, Container} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMyProducts,positiveReview } from '../actions/productActions'
import { TodayOrders } from '../actions/orderActions'

function Dashboard({history}) {
    const dispatch = useDispatch()
    const positiveReviews = useSelector(state => state.positiveReviews)
    const { posreviews,positiveCount,negreviews,negativeCount } = positiveReviews
    const orderListToday = useSelector(state => state.orderListToday)
    const { todayOrderitems, todayOrderCount  } = orderListToday
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    var options = {        
      cutout: 100,
    }
    const data = {
     
        labels: ['Negative', 'Positive'],
        datasets: [
          {
            label: '# of Votes',
            data: [negativeCount,positiveCount],
            backgroundColor: [
              'rgba(232, 40, 49, 1)',
              'rgba(99, 212, 122, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(99, 212, 122, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
    useEffect(() => {
        
        if (userInfo && userInfo.isAdmin) {
            
            dispatch(positiveReview())

        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])
    useEffect(() => {
        
      if (userInfo && userInfo.isAdmin) {
          
          dispatch(TodayOrders())

      } else {
          history.push('/login')
      }

  }, [dispatch, history, userInfo])


    return (
        <div style={{backgroundColor: "#edf2fb"}} className="flex h-screen overflow-hidden">
        <Row >
           
            
            <Col className='text-md-center' md={2.5} >
        <Sidebar />
        </Col>
        <Container >
        <Col md={{  offset: 2 }}>
        <h3 className='mt-5 pt-5 text-capitalize'>Hello There,{userInfo && userInfo.name}</h3>
        <p>Here is some information we gathered about your store</p>
         {/* Cards */}
         <div className="grid grid-cols-12 gap-6">


</div>
        <Row ><Col md={3}><Card className=' bg-white shadow rounded-sm border border-gray-200 mb-3'><ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h4 className='text-capitalize'>Orders</h4>
                        <p>Today</p>
                        <h4 className='text-center'>{todayOrderCount}</h4>
                        
                        
                        </ListGroup.Item></ListGroup>
            
                        </Card></Col>
                        <Col md={3}><Card className='bg-white shadow rounded-sm border border-gray-200 mb-3'><ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h4 className='text-capitalize'>Sales</h4>
                        <p>Today</p>
                        <h4 className='text-center'>2123</h4>
                        
                        
                        </ListGroup.Item></ListGroup>
            
                        </Card></Col></Row>
                        <Row>
<div className="grid grid-cols-12 gap-6">
<div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow rounded-sm border border-gray-200">
< Doughnut data={data} options={options} />
</div>
</div>
</Row>
    <div className='w-50 '>
<h4 className='text-capitalize mt-4'>Reviews</h4>
<div >
<Table striped bordered hover responsive className='table-sm table bg-white shadow rounded-sm border border-gray-200 mb-3'>
                                <thead>
                                    <tr  className='fit'>
                                        <th>Customer</th>
                                        <th>Product</th>
                                        <th>Review</th>
                                        <th>Created at</th>
                                        <th>sentiment</th>
                                       
                                    </tr>
                                </thead>

                                <tbody>
                                { negreviews && negreviews.map((review) => (
                                        <tr key={review._id}>
                                             <td className='fit'>{review.user.name}</td>
                                            <td className='fit'>{review.product}</td>
                                            <td className='fit'>{review.comment}</td>
                                            <td className='fit'>{review.createdAt.substring(0,10)}</td>
                                            <td className='fit text-danger col-md-1'>{review.sentiment}</td>
                                            </tr> ))}
                                { posreviews && posreviews.map((review) => (
                                        <tr className='fit' key={review._id}>
                                             <td>{review.user.name}</td>
                                            <td className='fit'>{review.product}</td>
                                            <td className='fit'>{review.comment}</td>
                                            <td>{review.createdAt.substring(0,10)}</td>
                                            <td className='text-success'>{review.sentiment}</td>
                                            </tr> ))}
                               
                                            </tbody>
                                    
                                            
                                             
                                              </Table>
                                              </div>
                                              </div>
                                              
                                     
        </Col>
        
        </Container>
        </Row>
        </div>
    )
}

export default Dashboard
