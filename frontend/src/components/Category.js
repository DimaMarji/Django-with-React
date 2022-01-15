import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Category({ category }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/category/${category.title}`}>
                <Card.Img src={category.image} />
            </Link>

            <Card.Body>
                <Link to={`/category/${category.title}`}>
                    <Card.Title as="div">
                        <strong>{category.title}</strong>
                    </Card.Title>
                </Link>

            </Card.Body>
        </Card>
    )
}


export default Category
