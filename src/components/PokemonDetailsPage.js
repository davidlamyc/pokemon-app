import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PokemonDetailsPage extends React.Component {
    state = {
        pokemon: null,
        loading: false
    }

    getPokemonDetails = async (id) => {
        this.setState({loading: true});

        const { data: pokemonRawData } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id? id : undefined}`
        )

        const pokemon = {
            id: pokemonRawData.id,
            name: pokemonRawData.name,
            front_img: pokemonRawData.sprites.front_default,
            back_img: pokemonRawData.sprites.back_default,
            types: [],
            stats: []
        }
        pokemonRawData.types.forEach(typeObj => {
            pokemon.types.push(typeObj.type.name)
        })
        pokemonRawData.stats.forEach(statObj => {
            pokemon.stats.push({
                name: statObj.stat.name,
                value: statObj.base_stat
            })
        })

        // Get encounters
        // encounters API provide the location area of the encounter, and encounter method
        const { data: encounters } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id ? id : undefined}/encounters`
        )
        // for each location area, get the encounter method
        // NOTE: each encounter has a 'version_details' array containing 'encounter details',
        // but every 'encounter detail' contains the same method name
        encounters.forEach(e => e.method = e.version_details[0].encounter_details[0].method.name)

        let locationAreas = await Promise.all(
            encounters.map(async ({ location_area }, i) => {
                const { data: retrievedLocationArea } = await axios.get(location_area.url)
                // get the location for each encounter, and add to 'encounter' object
                encounters[i].location = retrievedLocationArea.location.name
                return retrievedLocationArea
            })
        )
        
        let locations = await Promise.all(
            locationAreas.map(async ({ location }, i) => {
                const { data: retrievedLocation } = await axios.get(location.url)
                // get the location for each encounter, and add to 'encounter' object
                encounters[i].region = retrievedLocation.region.name
                return retrievedLocation
            })
        )
    
        const kantoEncounters = encounters
            .filter(e => e.region === 'kanto')
            .map(({ method, location }) => { return { method, location } })

        const dedupedKantoEncounters = kantoEncounters.filter((encounter, index, self) =>
            index === self.findIndex((e) => (
              e.location === encounter.location && e.method === encounter.method
            ))
        )
        
        pokemon.kantoEncounters = dedupedKantoEncounters;

        this.setState({ pokemon: pokemon, loading: false })
    }

    componentDidMount = async () => {
        if (this.props.pokemon) {
            await this.getPokemonDetails(this.props.pokemon.id);
        } else {
            var pageURL = window.location.href;
            var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);

            await this.getPokemonDetails(parseInt(lastURLSegment));
        }
    }

    render() {   
         if (this.state.pokemon) {
            return (
                <>
                    {
                        this.state.pokemon.id <= 1 ? '' :
                        <Link 
                            class="ui button" 
                            to={`/pokemon/${this.state.pokemon.id - 1}`}
                            onClick={() => this.getPokemonDetails(this.state.pokemon.id - 1)}
                        >
                            Previous
                        </Link>
                    }
                    <Link 
                        class="ui button" 
                        to={`/pokemon/${this.state.pokemon.id + 1}`}
                        onClick={() => this.getPokemonDetails(this.state.pokemon.id + 1)}
                    > 
                        Next
                    </Link>
                    <Link class="ui blue button" to='/'> Home  &rarr;</Link>
                    <div class="ui top attached tabular menu">
                        <a class="item active">
                            Pokemon Details
                        </a>
                    </div>
                    <div class="ui bottom attached segment" style={{padding:'3em'}} style={{textAlign: 'center'}}>
                        {this.state.loading ? 
                            <>
                                <div class="ui segment" style={{height: '60vh'}}>
                                    <div class="ui active dimmer">
                                        <div class="ui large text loader">Loading...</div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <h1>#{this.state.pokemon.id} {this.state.pokemon.name}</h1>        
                                <div>
                                    <img src={this.state.pokemon.front_img} style={{ width: '30%'}}/>
                                    <img src={this.state.pokemon.back_img} style={{ width: '30%'}}/>
                                    <h5>Type(s):</h5>
                                    <div class="ui list"> 
                                        {this.state.pokemon.types.map(t => {
                                        return <div class="item">{t.toUpperCase()}</div>
                                    })}
                                    </div>
                                    <h5>Kanto Encounter(s) | Method:</h5>
                                    <div class="ui list"> 
                                        {this.state.pokemon.kantoEncounters.length <= 0 ? '-' : this.state.pokemon.kantoEncounters.map(e => {
                                            return <div class="item">{e.location} | {e.method}</div>
                                        })}
                                    </div>
                                    <h5>Stats:</h5>
                                    <div class="ui list"> 
                                        {this.state.pokemon.stats.map(s => {
                                            return <div class="content">{s.name} | {s.value}</div>
                                        })}
                                    </div>
                                </div>
                            </>
                        }
                    </div> 
                </>
            )
        } else {
            return (
                <div>
                    <Link class="ui blue button" to='/'> Home  &rarr;</Link>
                    <div class="ui top attached tabular menu">
                        <a class="item active">
                            Pokemon Details
                        </a>
                    </div>
                    <div class="ui bottom attached segment" style={{padding:'3em'}} style={{textAlign: 'center'}}>
                        <div class="ui segment" style={{height: '60vh'}}>
                            <div class="ui active dimmer">
                                <div class="ui large text loader">Loading...</div>
                            </div>
                        </div>
                    </div> 
                </div>
            )
        }

    }
}

const mapStateToProps = (state, ownProps) => {
    const pokemon = state.pokemon.find(pokemon => { 
        return pokemon.id === parseInt(ownProps.match.params.id)
    });
    return { pokemon };
}

export default connect(mapStateToProps, null)(PokemonDetailsPage);