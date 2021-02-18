import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Container
} from 'semantic-ui-react'

function Home() {

  return (
    <section className="homepage">
      <Container text className="container home-container fade-in">
        <div className="header">
          <h1 className="title-header">
          cityspace
          </h1>
        </div>

        <h2 className="title-header">
          Discover and share your favourite spots in the city.
          
        </h2>
        <div className="button-wrapper">
          <Link to="/spaces" className="navbar-item">
            <Button primary size='huge' animated='fade' style={{ borderRadius: 5 }}>
              <Button.Content visible>Find your happy place</Button.Content>
              <Button.Content hidden>London is waiting</Button.Content>
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default Home