import React from 'react';

import { White } from '../global/Colors.js'
import { Sankey } from 'react-vis';

const BLURRED_LINK_OPACITY = 0.3;
const FOCUSED_LINK_OPACITY = 0.6;

const nodes = [
  {name: 'Department 1'}, 
  {name: 'Department 2'}, 
  {name: 'Department 3'},
  {name: 'Department 4'},
  {name: 'Department 5'},
  {name: 'Department 6'},
  {name: 'Department 7'},
  {name: 'Department 8'},
  ];
const links = [
  {source: 0, target: 1, value: 10},
  {source: 0, target: 2, value: 20},
  {source: 1, target: 2, value: 20},
  {source: 1, target: 4, value: 20},
  {source: 1, target: 5, value: 20},
  {source: 1, target: 6, value: 20},
  {source: 1, target: 7, value: 20},
  {source: 3, target: 7, value: 20},
];

export default class FlowsPane extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeLink: null
    }
  }

  render() {
    const {activeLink} = this.state;

    // Note: d3.sankey currently mutates the `nodes` and `links` arrays, which doesn't play nice
    // with React's single-direction data flow. We create a copy of each before we pass to the sankey
    // component, just to be sure.
    return (
      <div>
        <h3 
          style={styles.text}>
          {`${activeLink ? (
            `${nodes[activeLink.source.index].name} -> ${nodes[activeLink.target.index].name}`
          ) : (
            'None'
          )} selected`}
          </h3>
        <Sankey
          style={{
            labels: {
              color: White(1)
            },
            links: {
              color: White(1)
            },
            rects: {}
          }}
          nodes={nodes.map(d => ({...d}))}
          links={links.map((d, i) => ({
            ...d,
            opacity: activeLink && i === activeLink.index ? FOCUSED_LINK_OPACITY : BLURRED_LINK_OPACITY
          }))}
          width={700}
          height={200}
          onLinkMouseOver={node => this.setState({activeLink: node})}
          onLinkMouseOut={() => this.setState({activeLink: null})}
        />
      </div>
    );
  }
}

var styles = {
  text : {
    fontColor: White(0.8),
    fontSize: 20,
  }
}