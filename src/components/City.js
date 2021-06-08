import React from 'react';
import { CityRemoveModal } from './Modals.js';

export default class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false
    };
  }

  cityRemoveModalEnable() {
    this.setState({ showDeleteModal: true });
  }

  cityRemoveModalDisable() {
    this.setState({ showDeleteModal: false });
  }

  render() {
    return (
      <React.Fragment>
        <CityRemoveModal
          show={this.state.showDeleteModal}
          name={this.props.city.name}
          handleConfirm={() => this.props.cityRemove(this.props.city)}
          handleCancel={() => this.setState({ showDeleteModal: false })} />
        <li className="my-2 box has-background-grey-lighter cursor-pointer"
            onClick={() => this.setState({ showDeleteModal: true })}>
          {this.props.city.name}
        </li>
      </React.Fragment>
    );
  }
}

