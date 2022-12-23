import React, { Component } from "react";
import { connect } from "react-redux";
import {Table} from "reactstrap";
import "../assets/scss/mai_characteristic/characteristic.css"

class TopMAI extends Component {

  
  
  render() {
    return (
      <React.Fragment>

                  <div className="characteristic-card">
                        <table>
                              <tr>
                                    <th>Name</th>
                                    <td>Topmai</td>
                              </tr>
                              <tr>
                                    <th>SubName</th>
                                    <td>Default Mchj</td>
                              </tr>
                              <tr>
                                    <th>DDR4 ECCRegistered Server Memory - 128 GB</th>
                                    <td>128 Gb</td>
                              </tr>
                              <tr>
                                    <th>HDD</th>
                                    <td>4 TB</td>
                              </tr>
                              <tr>
                                    <th>SSD</th>
                                    <td>512 GB</td>
                              </tr>
                        </table>
                  </div>
        
      </React.Fragment>
    );
  }
}

export default connect()(TopMAI);
