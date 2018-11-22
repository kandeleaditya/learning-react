import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    };

    static propType = {
        match: PropTypes.Object
    }

    componentDidMount(){
        const { params } = this.props.match;
        const localStorageref = localStorage.getItem(params.storeId);
        if(localStorageref){
            this.setState({order: JSON.parse(localStorageref)});
        }
        //console.log(localStorageref);
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentDidUpdate(){
        localStorage.setItem(this.props.match.params.storeId,JSON.stringify(this.state.order));
    }

    componentWillUnmount() {	
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes:fishes
        });

    };

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of the current state
        const fishes = { ...this.state.fishes };
        // 2. Update that state
        fishes[key] = updatedFish;
        // 3. Set that to state
        this.setState({ fishes });
    };
    
    deleteFish = key => {
        // 1. take a copy of state
        const fishes = { ...this.state.fishes };
        // 2. update the state
        fishes[key] = null;
        // 3.  update state
        this.setState({ fishes });
    };

    removeFromOrder = key => {
        const order = {...this.state.order};
        //delete this.state.order.key;
        delete order[key]
        this.setState({order});
    }

    loadSampleFishes = () =>{
        this.setState({
            fishes: sampleFishes
        });
    };

    addToOrder = key => {
        // 1. take a copy of state
        const order = { ...this.state.order };
        // 2. Either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;
        // 3. Call setState to update our state object
        this.setState({ order });
      };
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                        <Fish
                            key={key}
                            index={key}
                            details={this.state.fishes[key]}
                            addToOrder={this.addToOrder}
                        />
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order}
                removeFromOrder={this.removeFromOrder}/>
                <Inventory 
                    addFish={this.addFish} 
                    loadSampleFishes={this.loadSampleFishes} 
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;