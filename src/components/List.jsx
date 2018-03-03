import React from "react"

class List extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      document.getElementById(nextProps.id).scrollIntoView();
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div className="list-container">
        <h3> Pharmacies </h3>
        <ul className="pharm-list">
          {data.map(pharm => {
            return (
              <li className="pharm-list-item" id={pharm.a}>
                {pharm.facility_name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default List