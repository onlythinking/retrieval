/**
 * Created by sky on 2017/6/2.
 */
import 'date-utils';
import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/zh');
    require('intl/locale-data/jsonp/zh-Hans-CN');
    require('intl/locale-data/jsonp/zh-Hans-HK');
}

export const LandscapeDatePicker = () => (
    <DatePicker
        hintText="选择日期"
        container="inline" mode="landscape"
        DateTimeFormat={DateTimeFormat}
        okLabel="确定"
        cancelLabel="取消"
        locale="zh-Hans-CN"
    />
);

export const PortraitDatePicker = () => (
    <DatePicker
        hintText="选择日期"
        container="inline" mode="portrait"
        DateTimeFormat={DateTimeFormat}
        okLabel="确定"
        autoOk={true}
        cancelLabel="取消"
        locale="zh-Hans-CN"
        formatDate={(date) => date.toFormat('YYYYMMDD')}
    />);


export const dateFormatter = v => {
    // v is a string of "YYYYMMDD" format
    const match = /(\d{4})(\d{2})(\d{2})/.exec(v);
    if (match === null) return;
    const d = new Date(match[1], parseInt(match[2]) - 1, match[3]);
    if (isNaN(d)) return;
    return d;
};

export const dateParser = v => {
    if (!(v instanceof Date) || isNaN(v)) return;
    const pad = '00';
    const yy = v.getFullYear().toString();
    const mm = ((v.getMonth() + 1).toString());
    const dd = v.getDate().toString();
    return `${yy}${(pad + mm).slice(-2)}${(pad + dd).slice(-2)}`;
};

export default PortraitDatePicker;