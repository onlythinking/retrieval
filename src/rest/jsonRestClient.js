import {jsonServerRestClient} from 'admin-on-rest';
import addUploadFeature from './addUploadFeature';
import config from '../config/project';

const restClient = jsonServerRestClient(config.api_url);
const uploadCapableClient = addUploadFeature(restClient);

export default (type, resource, params) => new Promise(
    resolve => resolve(uploadCapableClient(type, resource, params))
);
