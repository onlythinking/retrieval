import React from 'react';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ActionExplore from 'material-ui/svg-icons/action/explore';
import {translate} from 'admin-on-rest';

const styles = {
    card: {borderLeft: 'solid 4px #4caf50', flex: 1, marginLeft: '1em'},
    icon: {float: 'right', width: 64, height: 64, padding: 16, color: '#4caf50'},
};

const defaultSubmitLoan = (event) => {
    console.log("提交");
};

export default translate(({
    submitLoan = defaultSubmitLoan, translate
}) => (
    <Card style={styles.card}>
        <ActionExplore style={styles.icon}/>
        <CardTitle title='叮当数据'/>
        <div style={{ textAlign:'center' }}>
            <DatePicker hintText="选择日期"
                        okLabel="确定"
                        cancelLabel="取消"
                        container="inline"/>
            <SelectField
                style={{ marginRight:100}}
                value={'repay'}
                autoWidth={true}
            >
                <MenuItem value={'overdue'} primaryText="客户逾期"/>
                <MenuItem value={'repay'} primaryText="客户还款"/>
            </SelectField>
            <Divider/>
            <CardActions>
                <RaisedButton label="导入"
                              onTouchTap={submitLoan()}
                              primary={true}/>
            </CardActions>
        </div>
    </Card>
));
