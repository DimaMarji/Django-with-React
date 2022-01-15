import React from 'react'
import { Carousel, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function BecomeVendor() {
    return (
        <div  >
            <Carousel fade>
  <Carousel.Item>

      <h3>First slide label</h3>
      <h3 className='text-capitalize'>Online reputation management </h3>

  </Carousel.Item>
  <Carousel.Item>
   
      <h3>Second slide label</h3>
      <h3 className='text-capitalize'>Media monitoring</h3>
     
  </Carousel.Item>
  <Carousel.Item>
    
      <h3>Third slide label</h3>
      <h3 className='text-capitalize'>Tracking your competition made easy</h3>
  </Carousel.Item>
</Carousel>
<LinkContainer to={'/vendoregister/'}>
        <Button variant="info" className='btn-text my-2 text-capitalize rounded'>Become a Vendor</Button>
            </LinkContainer>
        </div>
    )
}

export default BecomeVendor
