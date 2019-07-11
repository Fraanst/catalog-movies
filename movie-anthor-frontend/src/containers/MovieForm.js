import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Switch, Route, Link } from "react-router-dom";
import { Button } from '@material-ui/core';

class movieForm extends Component {
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

    onChangeInput = (e) => {
        const { name, value } = e.target
        this.setState(prevState => ({ movie: { ...prevState.movie, [name]: value } }));
    }


    Create = () => {
        fetch("http://localhost:5000/api/movies", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.movie)
        })
            .then(r => r.json().then(response => {
                console.log(response)
                alert("Filme Cadastrado com sucesso!")

            }))
            .catch(e => alert(e))
    }

    render() {
        const { title,
            genre,
            actors,
            date,
            summarizedPlot,
            trailer } = this.state.movie;
        return (
            <React.Fragment>
                <Grid container item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6">
                        Cadastrar filme
                    </Typography>
                </Grid>

                <Grid container item xs={12} sm={12} spacing={2} flexWrap='wrap' style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        required
                        onChange={this.onChangeInput}
                        value={title}
                        fullWidth

                        id='title'
                        name="title"
                        label='Titulo:'
                        autoComplete="Titulo" />

                    <TextField
                        required
                        onChange={this.onChangeInput}
                        value={summarizedPlot}
                        fullWidth

                        id='summarizedPlot'
                        name="summarizedPlot"
                        label='Sinopse:' />
                    <TextField
                        required
                        onChange={this.onChangeInput}
                        value={genre}
                        fullWidth

                        name="genre"
                        id='genre'
                        label='Genêros:' />
                    <TextField
                        required
                        onChange={this.onChangeInput}
                        value={actors}
                        fullWidth

                        name="actors"
                        id='actors'
                        label='Elenco:' />
                    <TextField
                        required
                        onChange={this.onChangeInput}
                        fullWidth
                        value={date}

                        name="date"
                        id='date'
                        label='Data de Lançamento:' />
                    <TextField
                        required
                        onChange={this.onChangeInput}
                        fullWidth
                        value={trailer}
                        name="trailer"

                        id='trailer'
                        label='Endereço do trailer:' />

                    <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <Button variant="contained" color="primary" value={this.state.movie} onClick={() => this.Create()}>
                            Cadastrar
                        </Button>
                    </Grid>
                </Grid>

            </React.Fragment>
        )
    }
}

export default movieForm;