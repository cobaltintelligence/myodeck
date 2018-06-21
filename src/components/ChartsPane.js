// components/ChartsPane.js
// Yuan Wang

import React, { Component } from 'react';
import { Black, White, PrimaryColor, Red, Green } from '../global/Colors.js'
import axios from 'axios'
import { __COMPONENT_STYLES__ } from '../global/Styles.js'
import Icon from 'react-icons-kit';
import { roundN } from '../helpers/calcs.js'
import { boldUp } from 'react-icons-kit/entypo/boldUp'
import { boldDown } from 'react-icons-kit/entypo/boldDown'
import { Area, AreaChart, Brush, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { Checkbox } from '@blueprintjs/core'

const __DEV__ = false

var __DUMMY_SERIES__ = [
  {
    x: 100,
    y: 400,
  },
  {
    x: 200,
    y: 500,
  },
  {
    x: 300,
    y: 200,
  },
  {
    x: 400,
    y: 300,
  }
]


export default class ChartsPane extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showSmall: true,
      showLarge: true,
      showElectrical: true,
      showTotal: true,
    }
  }

  componentDidMount() {

  }

  render() {

    var ts = __DUMMY_SERIES__

    return (
      <div style={styles.container}>

        <Checkbox 
          label="Show Small Components"
          checked={this.state.showSmall} 
          large
          onChange={() => this.setState({showSmall: !this.state.showSmall})}/>
        
        <Checkbox 
          label="Show Large Components"
          checked={this.state.showLarge} 
          large
          onChange={() => this.setState({showLarge: !this.state.showLarge})}/>
        
        <Checkbox 
          label="Show Electrical Components"
          checked={this.state.showElectrical} 
          large
          onChange={() => this.setState({showElectrical: !this.state.showElectrical})}/>

        <Checkbox 
          label="Show Total"
          checked={this.state.showTotal} 
          large
          onChange={() => this.setState({showTotal: !this.state.showTotal})}/>

        <br/>
          <AreaChart 
            width={650} 
            height={300} 
            data={this.props.data}
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="white" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={White(0.8)} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={White(0.8)} stopOpacity={0}/>
              </linearGradient>

              <linearGradient id="electrical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={Green(0.8)} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={Green(0.8)} stopOpacity={0}/>
              </linearGradient>

              <linearGradient id="small" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PrimaryColor(0.8)} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={PrimaryColor(0.8)} stopOpacity={0}/>
              </linearGradient>

              <linearGradient id="large" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={Red(0.8)} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={Red(0.8)} stopOpacity={0}/>
              </linearGradient>
            </defs>

            <YAxis 
              stroke={White(0.8)}
              type="number" 
              allowDecimals={false}
              domain={[0, 'dataMax']}
              />

            <XAxis 
              stroke={White(0.8)}
              type="number" 
              allowDecimals={false}
              unit={" units"}
              dataKey={'units'}
              domain={['dataMin', 'dataMax']}
              />

            {
              this.state.showTotal ? 
              <Area 
                key='total'
                type="monotone" 
                dataKey={'total'} 
                stroke={Black(0.5)}
                fillOpacity={1} 
                fill="url(#white)" /> : null 
            }

            {
              this.state.showSmall ? 
              <Area 
                key="small"
                type="monotone" 
                dataKey={'small'} 
                stroke={PrimaryColor(1)}
                fillOpacity={1} 
                fill="url(#small)" /> : null
            }


            {
              this.state.showLarge ? 
              <Area 
                key="large"
                type="monotone" 
                dataKey={'large'} 
                stroke={Red(1)}
                fillOpacity={1} 
                fill="url(#large)" /> : null
            }


            {
              this.state.showElectrical ? 
              <Area 
                key="electrical"
                type="monotone" 
                dataKey={'electrical'} 
                stroke={Green(1)}
                fillOpacity={1} 
                fill="url(#electrical)" /> : null
            }

            <Brush
              height={30}
              stroke={White(1)}
              dataKey={'x'}
              fill={White(0.2)}
              />

            <Tooltip 
              stroke={White(0.2)}
              fill={White(0.2)}/>
          </AreaChart>

      </div>
    )
  }
}


const styles = {
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    display: 'flex',
    marginBottom: 40,
  },
  column: {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',

  },
  spacer: {
    width: 20,
  },
  row: {
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'row'
  },
  smallRow: {
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 0,
  }
}
