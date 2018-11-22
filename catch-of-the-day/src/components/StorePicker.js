import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    myInput = React.createRef();
    // constructor() {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }
    goToStore = (event) => {
        event.preventDefault();
        const storeName = this.myInput.value.value;
        this.props.history.push(`/store/${storeName}`);
        console.log(storeName);
    }
    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please enter a store</h2>
                <input 
                    type="text" 
                    ref={this.myInput}
                    required 
                    placeholder="store name" 
                    defaultValue={getFunName()}/>
                <button type="submit">Visit Store</button>
            </form>
        );
    }
}

export default StorePicker;