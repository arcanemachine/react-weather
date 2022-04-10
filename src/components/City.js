import React from "react";
import { CityRemoveModal } from "./Modals.js";

export default class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      iconUrl: undefined,
    };
  }

  componentDidMount() {
    const iconCode = this.props.city.data.weather[0].icon;
    this.setState({
      iconUrl: `https://openweathermap.org/img/wn/${iconCode}.png`,
    });
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
          onConfirm={() => this.props.cityRemove(this.props.city)}
          onCancel={() => this.setState({ showDeleteModal: false })}
        />

        <li
          className="my-2 pt-5 box has-background-grey-lighter
                         is-flex is-justify-content-space-between
                         is-align-content-center"
        >
          <div className="h-4rem w-2rem">
            <img
              className="w-2rem"
              src={this.state.iconUrl}
              alt={`${this.props.city.name} weather icon`}
            />
            <br />
            {Math.round(this.props.city.data.main.temp)}&#176;C
          </div>
          <div></div>

          <div className="mx-auto">
            <div>
              {this.props.city.name}, {this.props.city.data.sys.country}
            </div>
            <div className="mt-2 is-italic">
              {this.props.city.data.weather[0].description}
            </div>
          </div>

          <div className="is-flex is-align-items-center">
            <span className="p-2 pb-3 is-size-5 cursor-pointer"
                  onClick={() => this.cityRemoveModalEnable()}>
              &times;
            </span>
          </div>
        </li>
      </React.Fragment>
    );
  }
}
