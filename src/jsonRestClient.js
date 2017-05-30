import {jsonServerRestClient} from 'admin-on-rest';
import addUploadFeature from './addUploadFeature';

const restClient = jsonServerRestClient('http://localhost:8080/api');
const uploadCapableClient = addUploadFeature(restClient);

export default (type, resource, params) => new Promise(resolve => resolve(uploadCapableClient(type, resource, params)));
