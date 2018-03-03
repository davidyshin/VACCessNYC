import React from "react"

class List extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selectedId !== nextProps.selectedId) {
      document.getElementById(nextProps.id).scrollIntoView();
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div className="location-list">
 
        <ul className="pharm-list">
          {data.map(pharm => {
            return (
              <li className="pharm-list-item" id={pharm.id}>
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