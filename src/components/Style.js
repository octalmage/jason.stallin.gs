import React from 'react';
import { injectGlobal } from 'styled-components';
// // import poole from '../css/poole.css';
// // import main from '../css/main.css';
//
const main = require('!raw-loader!../css/main.css');
const poole = require('!raw-loader!../css/poole.css');

injectGlobal`
	${poole}
	${main}
`;


export default ({ children }) => (<div className="theme-base-0d">{children}</div>);
