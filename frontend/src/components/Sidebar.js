
import 'react-pro-sidebar/dist/css/styles.css';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
function Sidebar() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
    return (
        <div className='fixed-left'>
        <Navbar  bg="dark" variant="dark" expand="lg">
            
        <Nav className="flex-column mx-5 ">
        <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
   
    <LinkContainer to='/admin/dashboard'>
  <Nav.Link  href="/home">Dashboard</Nav.Link></LinkContainer>
  {userInfo && userInfo.isAdmin && userInfo.name=='admin' && (
  <LinkContainer to='/admin/userlist'>
  <Nav.Link  >Users</Nav.Link></LinkContainer>)}
  <LinkContainer to='/admin/productlist'>
  <Nav.Link >Products</Nav.Link></LinkContainer>
  
  <LinkContainer to='/admin/tweets'>
  <Nav.Link eventKey="link-2">Twitter Reviews</Nav.Link></LinkContainer>
  <Nav.Link eventKey="disabled" disabled>
    Disabled
  </Nav.Link>
  <Nav.Link eventKey="disabled" disabled>
  </Nav.Link>
  <Nav.Link eventKey="disabled" disabled>
    
  </Nav.Link>
  <Nav.Link eventKey="disabled" disabled>
    
  </Nav.Link>
  <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
    
    </Nav.Link>
 

</Nav>
</Navbar>

</div>
    )
}

export default Sidebar

