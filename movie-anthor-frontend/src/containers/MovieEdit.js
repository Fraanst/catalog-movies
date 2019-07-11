import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

class MovieEdit extends Component {
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

        fetch("http://localhost:5000/api/movies/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(r => r.json().then(response => {
                this.setState({ movie: response });
                console.log(this.state.movie)
            }))
            .catch(e => alert(e))
    }
    // onChangeInput = (e) => {
    //     var value = e.target.value
    //     this.setState({ [e.target.name]: value })
    //     console.log(this.state.movie)
    // }
    onChangeInput = (e) => {
        console.log(e.target.name)
        const { name, value } = e.target
        this.setState(prevState => ({ movie: { ...prevState.movie, [name]: value } }));
        console.log(e.target)
    }

    Update = (id) => {
        fetch("http://localhost:5000/api/movies/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.movie)
        })
            .then(r => r.json().then(response => {
                alert("Filme Alterado com sucesso!")
            }))
            .catch(e => alert(e))
    }

    render() {
        const { match } = this.props;
        const { params } = match;
        const { id } = params;
        return (

            <React.Fragment>
               
               <Grid container xs={12} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6" justifyContent='center'>
                        Editar
                    </Typography>
                </Grid>
                <Grid container xs={12} sm={12} spacing={2} flexWrap='wrap' style={{ display: 'flex', justifyContent: 'center' }}>
      
                    <TextField 
                        onChange={this.onChangeInput}
                        fullWidth
                        
                        id="title"
                        name="title"
                        label="Titulo:"
                    />

                    <TextField
                        onChange={this.onChangeInput}
                        fullWidth
                       
                        name="title"
                        id='summarizedPlot'
                        label='Sinopse:'
                    />
                    <TextField
                        onChange={this.onChangeInput}
                        fullWidth
                        
                        name="title"
                        id='genre'
                        label='Genêros:'
                    />
                    <TextField
                        onChange={this.onChangeInput}
                        fullWidth
                        
                        name="title"
                        id='actors'
                        label='Elenco:'
                    />
                    <TextField
                        onChange={this.onChangeInput}
                        fullWidth
                      
                        name="title"
                        id='date'
                        label='Data de Lançamento:'
                    />
                    <TextField
                        onChange={this.onChangeInput}
                        fullWidth
                       
                        name="title"
                        id='trailer'
                        label='Endereço do trailer:'
                    />
                    <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <Button variant="contained" color="primary" onClick={() => this.Update(id)}>
                            Salvar
                        </Button>
                    </Grid>
                </Grid>

            </React.Fragment>
        );
    }
}

export default MovieEdit;