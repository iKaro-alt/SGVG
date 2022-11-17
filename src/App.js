import React from 'react';
import Routes from './routes';
const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/SGVG');
}

function App() {
	return <Routes />
}

export default App;
