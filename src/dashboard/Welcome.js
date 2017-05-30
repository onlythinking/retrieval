import React from 'react';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import { translate } from 'admin-on-rest';

export default translate(({ style, translate }) => (
    <Card style={style}>
        <CardHeader
            title={translate('pos.dashboard.welcome.title')}
            subtitle={translate('pos.dashboard.welcome.subtitle')}
            avatar={<Avatar backgroundColor="#FFEB3B" icon={<LightBulbIcon />} />}
        />
        <CardActions>
        </CardActions>
    </Card>
));
