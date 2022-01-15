import React, { useState, useEffect } from 'react'
import Category from '../components/Category'
import { listCategory } from '../actions/categoryActions'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
function CategoryScreen() {
    const dispatch = useDispatch()
    const categoryList = useSelector(state => state.categoryList)
    const { error, loading,categories } = categoryList
    useEffect(() => {
        dispatch(listCategory())

    }, [dispatch])
    return (
        <div>
            <h1>Categories</h1>
                    <div>
                        <Row>
                            {categories.map(category => (
                                <Col key={category.id} sm={12} md={6} lg={4} xl={3}>
                                    <Category category={category} />
                                </Col>
                            ))}
                        </Row>
                        
                    </div>
            
        </div>
    )
}

export default CategoryScreen
