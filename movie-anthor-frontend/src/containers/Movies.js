import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Route, Link } from "react-router-dom";

class Movies extends Component {
    state = {
        movies: [],
    }

    componentDidMount() {
        fetch("http://localhost:5000/api/movies", {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(r => r.json().then(response => {
                this.setState({ movies: response })
                console.log(this.state.movies)
            }))
            .catch(e => alert(e));
    }

    render() {
        return (
            <React.Fragment>
                <Grid container xs={12} sm={12} spacing={5}>
                    <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                            Filmes
                        </Typography>
                    </Grid>


                    {this.state.movies.map((m) =>
                        <Grid key={m.id} item xs={12} sm={12}  style={{ display: 'flex', justifyContent: 'center' }}>
                       
                            <Button variant="outlined" color="default" onClick={() => this.props.history.push(`/details/${m.id}`)}>
                                {m.title}
                            </Button>
                         
                        </Grid>
                    )}

                    <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" onClick={() => this.props.history.push('/create/')}>
                            Cadastrar um Filme
                        </Button>
                    </Grid>
                </Grid>
                <Route path={"/details/:id"} component={Details} />
            </React.Fragment>
        )
    }
}

class Details extends Component {
    state = {
        movie: {
            title: '',
            genre: '',
            actors: '',
            date: '',
            summarizedPlot: '',
            trailer: ''
        },

    }
    componentDidMount() {
        const { match } = this.props;
        const { params } = match;
        const { id } = params;
        this.GetById(id);
    }

    componentDidUpdate(prevProps) {
        const currentId = this.props.match.params.id;
        const prevId = prevProps.match.params.id;
        if (currentId !== prevId)
            this.GetById(currentId);
    }

    GetById = (id) => {
        fetch("http://localhost:5000/api/movies/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(r => r.json().then(response => {
                this.setState({ movie: response });
            }))
            .catch(e => alert(e))
    }

    render() {
        const { match } = this.props;
        const { params } = match;
        const { id } = params;

        return (
            <React.Fragment>
                <Grid item  xs={12} sm={6}  justifyContent='center'>
                    <Typography variant="h6" justifyContent='center'>
                        {this.state.movie.title}
                    </Typography>
                </Grid>

                <Grid container spacing={4} tyle={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            margin="normal"
                            variant='outlined'
                            id='Sinopse'
                            label='Sinopse'
                            value={this.state.movie.summarizedPlot}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            id='Elenco'
                            label='Elenco'
                            value={this.state.movie.actors} />
                    </Grid>
                    <Grid item xs={12} sm={12}>

                        <TextField
                            fullWidth
                            variant='outlined'
                            id='Genero'
                            label='Genêro'
                            value={this.state.movie.genre} />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            id='date'
                            label='Data de Lancamento'
                            value={this.state.movie.date} />
                    </Grid>
                    <Grid item xs={12} sm={12} >
                    <Button variant="contained" color="primary" onClick={() => this.props.history.push(`/edit/${id}`)}>
                        Editar
                    </Button>
                </Grid>
                </Grid>


            </React.Fragment>
        )
    }
}




export default Movies;