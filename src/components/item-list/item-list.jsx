import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-list.css';
import { CLIENT_RENEG_LIMIT } from 'tls';

export default class ItemList extends Component {
    constructor(props) {
        super(props);
        this.swapiService = new SwapiService();

        this.state = {
            peopleList: null,
        };
    }

    componentDidMount() {
        this.swapiService.getAllPeople().then(peopleList => {
            this.setState({ peopleList });
        });
    }

    renderItems(arr) {
        const { OnItemSelected } = this.props;
        // console.log(this.props)
        return arr.map(({ id, name }) => (
            <button
                type="button"
                className="list-group-item"
                key={id}
                onClick={() => OnItemSelected(id)}
                onKeyDown={() => OnItemSelected(id)}
            >
                {name}
            </button>
        ));
    }

    render() {
        const { peopleList } = this.state;

        if (!peopleList) {
            return <Spinner />;
        }

        const items = this.renderItems(peopleList);

        return <ul className="item-list list-group">{items}</ul>;
    }
}
