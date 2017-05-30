import React from 'react';
import {
    translate,
    Datagrid,
    Create,
    Edit,
    Delete,
    EditButton,
    DeleteButton,
    List,
    NumberField,
    ReferenceManyField,
    SimpleForm,
    TextField,
    TextInput,
} from 'admin-on-rest';
import Icon from 'material-ui/svg-icons/action/bookmark';

export const CategoryIcon = Icon;

export const CategoryList = (props) => (
    <List {...props} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid >
            <TextField source="id" style={{ padding: '0 12px 0 25px' }}/>
            <TextField source="name" style={{ padding: '0 12px 0 25px' }}/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

const CategoryTitle = translate(({record, translate}) =>
    <span>{translate('resources.categories.name', {smart_count: 1})} "{record.name}"</span>);

export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm label="resources.categories.tabs.details">
            <TextInput source="name" validation={{ required: true }}/>
        </SimpleForm>
    </Create>
);

export const CategoryEdit = (props) => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id"/>
            <TextInput source="name"/>
        </SimpleForm>
    </Edit>
);

const CategoryDeleteTitle = translate(({record, translate}) => <span>
    {translate('resources.categories.page.delete')}&nbsp;
    {record && `${record.name}`}
</span>);

export const CategoryDelete = (props) => <Delete {...props} title={<CategoryDeleteTitle />}/>;
