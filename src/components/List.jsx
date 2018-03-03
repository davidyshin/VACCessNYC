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
        <h3 className="pharm-header"> Pharmacies </h3>
        <div className="pharm-list-div">

          {data.map(pharm => {
            return (
              <ul className="pharm-list">
                <li className="pharm-list-item" id={pharm.a}>
                  <h3>{pharm.facility_name}</h3>
                  <ul className="pharm-list-info">
                    <li><span className="italics">Address:</span> {pharm.address + " " + pharm.borough + " " + pharm.zip_code}</li>
                    <li><span className="italics">Contact:</span> {pharm.phone}</li>
                    <li><span className="italics">Vaccines for kids:</span> {pharm.children}</li>
                  </ul>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    );
  }
}

export default List