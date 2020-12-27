import React, { Component } from 'react';

class DevBar extends Component {

  clearStorage() {
    localStorage.removeItem('socialReduxState');
  }

  showProps() {
    console.log(this.props.props);
  }

  render() {
    return (
      <div>
        <hr />
        <button className='btn btn-primary mr-2' onClick={this.showProps.bind(this)}>
          Show Props
        </button>
        <button className='btn btn-danger mr-2' onClick={this.clearStorage.bind(this)}>
          Clear Local Storage to restart app data
        </button>
        <hr />
      </div>
    )
  }
}

export default DevBar;
