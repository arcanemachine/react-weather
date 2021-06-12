import React from 'react';

export default class CityAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' }
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.cityAdd(this.state.name);
    this.setState({ name: '' });
  }

  render() {
    return (
      <form className="mt-4 mx-auto is-flex is-justify-content-center"
            onSubmit={(e) => this.handleSubmit(e)}>
        <input type="text"
               className="input is-inline is-medium btn-group-left-side"
               value={this.state.name}
               onChange={(e) => this.handleChange(e)}
               placeholder="Add new location..." />
        <input type="submit"
               className="button is-success is-medium btn-group-right-side"
               value="Create" />
      </form>
    );
  }
}
