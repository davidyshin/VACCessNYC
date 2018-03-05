import React from "react";

class List extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { data, clickedPin } = this.props;
    return (
      <div className="location-list">
        <h3 className="pharm-header"> Locations </h3>
        <label className="myCheckbox">
          <input
            className="checkbox"
            name="forChild"
            type="checkbox"
            checked={this.state.forChild}
            onChange={this.props.handleCheckboxChange}
          />
          <span className="checkbox-text">Services for Children</span>
        </label>
        {data.length > 0 ? (
          data.map(pharm => {
            return (
              <ul
                onClick={this.props.listClicked}
                onMouseEnter={this.props.handleHover}
                onMouseLeave={this.props.handleUnhover}
                className={
                  this.props.clickedPin === pharm.a
                    ? "pharm-list-selected"
                    : "pharm-list"
                }
              >
                <li
                  onMouseEnter={this.props.handleHover}
                  onMouseLeave={this.props.handleUnhover}
                  className="pharm-list-item"
                  id={pharm.a}
                >
                  <h3 id={pharm.a}>{pharm.facility_name}</h3>
                  <ul id={pharm.a} className="pharm-list-info">
                    <p id={pharm.a}>
                      <span className="italics">Address:</span> <br />
                      {pharm.address +
                        ", " +
                        pharm.borough +
                        ", NY " +
                        pharm.zip_code}
                    </p>
                  </ul>
                </li>
              </ul>
            );
          })
        ) : (
          <p className="italics">
            Sorry, there are no locations that service children. :(
          </p>
        )}
      </div>
    );
  }
}

export default List;
