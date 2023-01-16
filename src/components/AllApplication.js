import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Table} from "reactstrap";
import "../assets/scss/allapplication/allapplication.css"
import {Link, withRouter} from 'react-router-dom';
import {get} from "lodash";
import ApiActions from "../redux/pages/actions"
import PagesApi from "../pages/dashboards/PagesApi";


const AllApplication = ({
                            history,
                            getItemsList,
                            items,
                            isFetched,
                            total,
                        }) => {

    useEffect(() => {
        getItemsList({page: 0});
    }, []);

    const path = "api/application"

    const create = (params = {}) => {
        PagesApi.Create(path, params).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }

    const update = (params = {}, id) => {
        PagesApi.Update(path, id, params).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }

    const remove = (id) => {
        PagesApi.Delete(path, id).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }

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

const mapStateToProps = (state) => {
    return {
        items: get(state, 'PageReducer.data.item-list.result.data', []),
        item: get(state, 'PageReducer.data.get-one-item.result.data', {}),
        isFetched: get(state, 'PageReducer.data.item-list.isFetched', false),
        isFetchedItem: get(state, 'PageReducer.data.get-one-item.isFetched', false),
        total: get(state, 'PageReducer.data.item-list.result.total', 0),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getItemsList: ({page = 0, }) => {
            const storeName = 'item-list';
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/api/application',
                    config: {
                        params: {
                            page: page + 1,
                        },
                    },
                    storeName,
                },
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllApplication));
