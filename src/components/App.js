import React, { Component } from 'react';
import Grid from './Grid';

const ogs = require('open-graph-scraper');
const options = {'url': 'http://ogp.me/'};
ogs(options, function (error, results) {
    console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
    console.log('results:', results);
});

export default class App extends Component {
  render() {
    return (
      <section className='container'>
          <header>
              <h1>Astronomy Picture of the Day</h1>
          </header>
          <Grid />
      </section>
    );
  }
}