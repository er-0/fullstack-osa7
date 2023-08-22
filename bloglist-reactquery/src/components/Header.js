import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ShowHeader = ({ user, handleLogOut }) => {
  const padding = {
    padding: 5
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <em>{user.name} logged in
                <button className="btn" onClick={handleLogOut}>log out</button>
              </em>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default ShowHeader