import React, {Component} from 'react';
import withWidth from 'material-ui/utils/withWidth';
import {AppBarMobile, GET_LIST, GET_MANY, CREATE} from 'admin-on-rest';

import Welcome from './Welcome';
import NewCustomers from './NewCustomers';
import LoanManger from './LoanManger';
import jsonRestClient from '../jsonRestClient';

const styles = {
    welcome: {marginBottom: '2em'},
    flex: {display: 'flex'},
    leftCol: {flex: 1, marginRight: '1em'},
    rightCol: {flex: 1, marginLeft: '1em'},
    singleCol: {marginTop: '2em'},
};

class Dashboard extends Component {
    state = {};

    componentDidMount() {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        jsonRestClient(GET_LIST, 'users', {
            filter: {},
            sort: {field: 'createDate', order: 'DESC'},
            pagination: {page: 1, perPage: 50},
        })
            .then(response => response.data)
            .then(newCustomers => {
                this.setState({newCustomers});
                this.setState({nbNewCustomers: newCustomers.reduce(nb => ++nb, 0)})
            });
    }

    render() {
        const {
            nbNewCustomers,
            newCustomers,
        } = this.state;
        const {width} = this.props;
        return (
            <div>
                {width === 1 && <AppBarMobile title="Posters Galore Admin"/>}
                <Welcome style={styles.welcome}/>
                <div style={styles.flex}>
                    <div style={styles.leftCol}>
                        <div style={styles.singleCol}>
                            <div style={styles.flex}>
                                <LoanManger />
                            </div>
                        </div>
                    </div>
                    <div style={styles.rightCol}>
                        <div style={styles.singleCol}>
                            <div style={styles.flex}>
                                <NewCustomers nb={nbNewCustomers} users={newCustomers}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withWidth()(Dashboard);
