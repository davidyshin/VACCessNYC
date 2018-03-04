import React from "react";

class List extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      console.log("Condition Satisfied");
    //   document.getElementById(nextProps.id).scrollIntoView();
      var myElement = document.getElementById(nextProps.id);
      var topPos = myElement.offsetTop;
      document.getElementById('location-list').scrollTop = topPos;
      
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div id="location-list" className="location-list">
        <h3 className="pharm-header"> Pharmacies </h3>
        {data.map(pharm => {
          return (
            <ul className="pharm-list">
              <li className="pharm-list-item" id={pharm.a}>
                <h3>{pharm.facility_name}</h3>
                <ul className="pharm-list-info">
                  <p>
                    <span className="italics">Address:</span>{" "}
                    {pharm.address + " " + pharm.borough + " " + pharm.zip_code}
                  </p>
                  <p>
                    <span className="italics">Contact:</span> {pharm.phone}
                  </p>
                  <p>
                    <span className="italics">Vaccines for kids:</span>{" "}
                    {pharm.children}
                  </p>
                </ul>
              </li>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default List;
