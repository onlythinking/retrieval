import React from 'react';
import {
    translate,
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    SelectInput,
    FunctionField,
    Delete,
    Create,
    Edit,
    Filter,
    FormTab,
    List,
    LongTextInput,
    NullableBooleanInput,
    NumberField,
    ReferenceManyField,
    TabbedForm,
    TextField,
    TextInput,
} from 'admin-on-rest';
import Icon from 'material-ui/svg-icons/social/poll';
import {dateParser, dateFormatter} from '../components/CustomDatePicker';
import intlFormat from '../i18n/intlFormat';

import DeleteButton from '../buttons/DeleteButton';

export const LoanOptsIcon = Icon;

const LoanOptsFilter = (props) => (
    <Filter {...props}>
        <TextInput label="pos.search" source="q" alwaysOn/>
        <SelectInput source="channelType" choices={[
            { id: 'dingdang', name: '叮当' },
            { id: 'online', name: '线上' }
        ]}/>
        <SelectInput source="dataType" choices={[
            { id: 'overdue', name: '客户逾期' },
            { id: 'repay', name: '客户还款' }
        ]}/>
    </Filter>
);

const colored = WrappedComponent => props => props.record[props.source] > 500 ?
    <span style={{ color: 'red' }}><WrappedComponent {...props} /></span> :
    <WrappedComponent {...props} />;

const ColoredNumberField = colored(NumberField);
ColoredNumberField.defaultProps = NumberField.defaultProps;

export const LoanOptsList = (props) => (
    <List {...props} filters={<LoanOptsFilter />} perPage={25}>
        <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
            <TextField source="id"/>
            <TextField source="batchNo"/>
            <FunctionField source="channelType"
                           render={record => `${record.channelType? record.channelType === 'dingdang' ? '叮当': '线上':''}`}/>
            <FunctionField source="dataType"
                           render={record => `${record.dataType? record.dataType === 'overdue' ? '逾期': '回款':''}`}/>
            <TextField source="fileDate"/>
            <TextField source="operator"/>
            <DateField source="createDate" showTime type="date"/>
            <DeleteButton />
        </Datagrid>
    </List>
);

export const LoanOptsCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.loanOpts.tabs.optBasic">
                <SelectInput source="channelType" choices={[
            { id: 'dingdang', name: '叮当' },
            { id: 'online', name: '线上' }
        ]} validation={{ required: true }}/>
                <SelectInput source="dataType" choices={[
            { id: 'overdue', name: '客户逾期' },
            { id: 'repay', name: '客户还款' }
        ]} validation={{ required: true }}/>
                <DateInput format={dateFormatter} parse={dateParser} source="fileDate"
                           options={{maxDate: new Date(), hintText: '数据时间', okLabel: '确定', cancelLabel: '取消',
                           DateTimeFormat: intlFormat.dateTime}}
                />
            </FormTab>
        </TabbedForm>
    </Create>
);

const LoanOptsDeleteTitle = translate(({record, translate}) => <span>
    {translate('resources.loanOpts.page.delete')}&nbsp;
    {record && `${record.fileDate}${record.dataType === 'overdue' ? '逾期' : '回款'}`}
</span>);

export const LoanOptsDelete = (props) => <Delete {...props} title={<LoanOptsDeleteTitle />}/>;
