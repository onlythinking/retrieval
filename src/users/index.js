import React from 'react';
import {
    translate,
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    Delete,
    Create,
    Edit,
    Filter,
    FormTab,
    List,
    LongTextInput,
    NullableBooleanInput,
    ImageField,
    ImageInput,
    NumberField,
    ReferenceManyField,
    TabbedForm,
    TextField,
    TextInput,
} from 'admin-on-rest';
import Icon from 'material-ui/svg-icons/social/person';

import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import UserNameField from './UserNameField';

export const UserIcon = Icon;

const UsersFilter = (props) => (
    <Filter {...props}>
        <TextInput label="pos.search" source="q" alwaysOn/>
        <TextInput source="username"/>
    </Filter>
);

const colored = WrappedComponent => props => props.record[props.source] > 500 ?
    <span style={{ color: 'red' }}><WrappedComponent {...props} /></span> :
    <WrappedComponent {...props} />;

const ColoredNumberField = colored(NumberField);
ColoredNumberField.defaultProps = NumberField.defaultProps;

export const UserList = (props) => (
    <List {...props} filters={<UsersFilter />} perPage={25}>
        <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
            <TextField source="id"/>
            <UserNameField />
            <TextField source="email"/>
            <DateField source="createDate" showTime type="date"/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.users.tabs.details">
                <TextInput source="username" validation={{ required: true }}/>
                <TextInput type="password" source="password" validation={{ required: true }}/>
                <TextInput type="email" source="email" validation={{ email: true }} options={{ fullWidth: true }}
                           style={{ width: 544 }}/>
                <ImageInput source="pictures" label="头像" accept="image/*">
                    <ImageField source="avatar" title="title" />
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Create>
);

const UserTitle = ({record}) => record ? <UserNameField record={record} size={32}/> : null;

export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props} >
        <TabbedForm>
            <FormTab label="resources.users.tabs.identity">
                <TextInput source="username" style={{ display: 'inline-block' }}/>
                <TextInput type="email" source="email" validation={{ email: true }} options={{ fullWidth: true }}
                           style={{ width: 544 }}/>
            </FormTab>
        </TabbedForm>
    </Edit>
);

const UserDeleteTitle = translate(({record, translate}) => <span>
    {translate('resources.users.page.delete')}&nbsp;
    {record && `${record.username}`}
</span>);

export const UserDelete = (props) => <Delete {...props} title={<UserDeleteTitle />}/>;
