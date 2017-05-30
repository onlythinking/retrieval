import React from 'react';
import AvatarField from './AvatarField';
import pure from 'recompose/pure';

const UserNameField = ({record = {}, size = 25}) => <span>
    <AvatarField record={record} size={size}/>
    <span style={{ display: 'inline-block', width: size/3 }}>&nbsp;</span>
    {record.username}
</span>;

const PureUserNameField = pure(UserNameField);

PureUserNameField.defaultProps = {
    source: 'username',
    label: 'resources.users.fields.username',
};

export default PureUserNameField;
