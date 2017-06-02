import React from 'react';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import ActionExplore from 'material-ui/svg-icons/action/explore';
import {translate} from 'admin-on-rest';

const styles = {
    card: {borderLeft: 'solid 4px #4caf50', flex: 1, marginLeft: '1em'},
    icon: {float: 'right', width: 64, height: 64, padding: 16, color: '#4caf50'},
};

export default translate(({
    translate
}) => (
    <Card style={styles.card}>
        <ActionExplore style={styles.icon}/>
        <CardTitle title='最新动态'/>
        <div style={{ textAlign:'center' }}>
            <Divider/>
        </div>
    </Card>
));
