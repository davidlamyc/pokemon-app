import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'qs';

import { fetchPokemon } from '../actions';


class PokemonPage extends React.Component {
    componentDidMount = () => {
        this.props.fetchPokemon(this.props.currentPage);
    }

    renderPokemon = () => {
        return this.props.pokemon.map(pokemon => {
            return (
                <Link to={`/pokemon/${pokemon.id}`} class="ui card">
                    <img src={pokemon.img} style={{width: '100%'}}/>
                    <div class="content">
                    <a class="header" style={{textAlign: 'center'}}>#{pokemon.id} {pokemon.name.toUpperCase()}</a>
                    </div>
                </Link>
            )
        })
    }

    renderPaginationButton = () => {
        return (
            <div class="fluid ui buttons" style={{
                display: 'block',
                padding: '1rem 0',
                width: '100%',
                textAlign: 'center'
            }}>
                {this.props.currentPage === 1 ? '' : <Link 
                    class="ui button" 
                    onClick={() => {this.props.fetchPokemon(this.props.currentPage - 1 )}}
                    to={`/pokemon?page=${this.props.currentPage - 1}`}> 
                        {`<`}
                </Link> }
                {this.props.currentPage === 1 ? '' : <Link 
                    class="ui button" 
                    onClick={() => {this.props.fetchPokemon(this.props.currentPage - 1 )}}
                    to={`/pokemon?page=${this.props.currentPage - 1}`}> 
                        {this.props.currentPage - 1}
                </Link> }
                <Link 
                    class="ui blue button"
                    onClick={() => {this.props.fetchPokemon(this.props.currentPage)}} to={`/pokemon?page=${this.props.currentPage}`}
                > 
                    {this.props.currentPage}
                </Link>
                <Link 
                    class="ui button" 
                    onClick={() => {this.props.fetchPokemon(this.props.currentPage + 1 )}} to={`/pokemon?page=${this.props.currentPage + 1}`}
                > 
                    {this.props.currentPage + 1}
                </Link>
                <Link 
                    class="ui button" 
                    onClick={() => {this.props.fetchPokemon(this.props.currentPage + 1 )}} to={`/pokemon?page=${this.props.currentPage + 1}`}
                > 
                    {`>`}
                </Link>
            </div>
        )
    }


    render() {
        if (this.props.pokemon.length <= 0) {
            return (
                <div style={{ padding: '10em'}}>
                    <div class="ui active centered inline loader"></div>
                    <h3 style={{textAlign: 'center'}}>Loading...</h3>
                </div>
            )
        } else {
            return (
                <div className="ui container" >
                    <div class="ui message" style={{width:'95%', margin: '2em auto'}}>
                        <div class="header">Use the navigation bar button to see more pokemon!</div>
                        <p>Click on a pokemon to get more details.</p>
                    </div>
                    {this.renderPaginationButton()}
                    <div style={{width:'96%', margin: '0 auto'}}>
                        {this.renderPokemon()}
                    </div>
                    {this.renderPaginationButton()}
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { page } = qs.parse(ownProps.location.search.substring(1));
    return {
        pokemon: state.pokemon,
        currentPage: parseInt(page)
    }
}

export default connect(mapStateToProps, { fetchPokemon })(PokemonPage);