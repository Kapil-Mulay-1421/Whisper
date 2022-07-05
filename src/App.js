import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import NewPost from './Components/NewPost';
import CommunityPage from './Components/CommunityPage';
import CreateCommunity from './Components/CreateCommunity';

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Whisper</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/NewPost">Make a Post</Nav.Link>
            <Nav.Link href="/CreateCommunity">Create a Community</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={window.accountId === '' ? login : logout}>{window.accountId === '' ? "Login" : window.accountId}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/CommunityPage' element={<CommunityPage />}></Route>
        <Route exact path='/NewPost' element={<NewPost />}></Route>
        <Route exact path='/CreateCommunity' element={<CreateCommunity />}></Route>
      </Routes>
    </Router>
  )
}
