import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Sidebar  from '../components/Sidebar'
import {twitterReview} from '../actions/productActions'
import { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import Data from '../export.json'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { Row, Col, Image, ListGroup, Button, Card, Form, Table, Container} from 'react-bootstrap'
function TweetsScreen({ location, history }) {
    const [year, setYear] = useState('2021')
    const [month, setMonth] = useState('8')
    const [day, setDay] = useState('1')
    const dispatch = useDispatch()
    const twitterReviews = useSelector(state => state.twitterReviews)
    const { loading,error } = twitterReviews

    const submitHandler = (e) => {
        e.preventDefault()
            dispatch(twitterReview(day,month,year))
        }
    return (
        <div  className="flex h-screen overflow-hidden mt-3 pt-5">
        
        <Row >
           
            
            <Col className='text-md-center' md={2.5} >
        <Sidebar />
        </Col>
        <FormContainer >
            <h4 className='mt-5'>Get tweets from Date:</h4>
        <Form onSubmit={submitHandler} inline className='mt-4'>
        <Col md={{  span:1 }}>
        <Form.Group controlId="day">
        <Form.Label>Day</Form.Label>
        <Form.Control
          as="select"
          value={day}
          onChange={(e) => setDay(e.target.value) } >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>

        </Form.Control>
      </Form.Group>
</Col>
<Col className='ml-5' md={{  span:1 }}>
        <Form.Group controlId="month">
        <Form.Label>Month</Form.Label>
        <Form.Control
          as="select"
          value={month}
          onChange={(e) =>  setMonth(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </Form.Control>
      </Form.Group>
      </Col>
      <Col className='ml-5' md={{  span:2}}>
        <Form.Group controlId="year">
        <Form.Label>Year</Form.Label>
        <Form.Control
          as='select'
          value={year}
          onChange={e => { setYear(e.target.value);
            
          }}
        >
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2019">2018</option>
          <option value="2019">2017</option>
        </Form.Control>
      </Form.Group>
</Col>
        
      <Col className='ml-5 mt-4' md={7} >
                    <Button variant='outline-info ' type='submit'>
                    <i className="fab fa-twitter fa-2x" style={{color:'blue'}}></i> Get Twitter reviews
                    </Button></Col>
                    </Form> 
                   </FormContainer>        
      
          {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
       <Col md={{offset:3}} >
       
        <Container className=' mt-4'>
        <Table striped bordered hover responsive className='table-sm table bg-white shadow rounded-sm border border-gray-200 mb-3'>
                                <thead>
                                    <tr  className='fit'>
                                        <th>User</th>
                                        <th>Tweet</th>
                                        <th>sentiment</th>
                                        <th>Created At</th>
                                       
                                    </tr>
                                </thead>

                                <tbody>
                                
                             {Data.map(tweet => {
                               return(
                                <tr key={tweet.Unnamed}>
                                <td className='fit'>{tweet.user }</td>
                               <td >{tweet.tweet}</td>
                              {tweet.class ==[1]?  <td className='fit font-weight-bold' style={{ color: 'green', }}>Positive</td>: <td className='fit font-weight-bold' style={{ color: 'red', }}>Negative</td>}
                               <td className='fit'>{tweet.createdAt.substring(0,10)}</td>
                                                           </tr>
                               )
                             })}
                               
                                            </tbody>
                                    
                                            
                                             
                                              </Table>
        </Container>
        </Col>}
        </Row>
        </div>
                            
    )
}

export default TweetsScreen
