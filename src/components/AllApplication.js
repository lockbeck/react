import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import "../assets/scss/allapplication/allapplication.css"
import { Link } from 'react-router-dom';


class AllApplication extends Component {


    

  render() {
    
    return (
      <React.Fragment>
        <div className="application-content">
            <p className="title-name">Ko'rilayotgan arizalar</p>
              <span className="title-badge-count">4</span>
            <Table>
                <thead className="table-head">
                    <tr>
                      <th>№</th>
                      <th>Name</th>
                      <th>SubName</th>
                      <th>Manager</th>
                      <th>Date</th>
                      <th>Contact</th>
                      <th>View</th>
                    </tr>
                </thead>
              <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>ToPMIa</td>
                      <td>"Default" MchJ</td>
                      <td>Name Surname</td>
                      <td>date</td>
                      <td><i className="fa fa-phone"></i></td>
                      <td><i className="fa fa-eye text-success"></i></td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>ToPMIa</td>
                      <td>"Default" MchJ</td>
                      <td>Name Surname</td>
                      <td>date</td>
                      <td><i className="fa fa-phone"></i></td>
                      <td><i className="fa fa-eye text-success"></i></td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>ToPMIa</td>
                      <td>"Default" MchJ</td>
                      <td>Name Surname</td>
                      <td>date</td>
                      <td><a href=""><i className="fa fa-phone"></i></a></td>
                      <td><i className="fa fa-eye text-success"></i></td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>ToPMIa</td>
                      <td>"Default" MchJ</td>
                      <td>Name Surname</td>
                      <td>date</td>
                      <td><i className="fa fa-phone"></i></td>
                      <td>
                        <Link to="/view">
                           <i className="fa fa-eye text-success"></i>
                        </Link>
                      </td>
                    </tr>
              </tbody>
      </Table>
              
         </div>
      </React.Fragment>
    );
  }
}

export default connect()(AllApplication);
