import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { Switch, Route, Link } from "react-router-dom";
import Movies from './containers/Movies';
import MovieForm from './containers/MovieForm';
import Edit from './containers/MovieEdit'

const App = (props) => {
  return (
    <Container fixed>
      <Grid container>
        <Switch>
          <Route path="/create/" exact component={MovieForm} />
          <Route path="/edit/:id" exact component={Edit} />
          <Route path="/" component={Movies} />
        </Switch>
      </Grid>
    </Container>
  );
}
export default App;
