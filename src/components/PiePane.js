// components/PiePane.js
// Yuan Wang

import React, { Component } from 'react';
import { Black, White, PrimaryColor, Red, Green } from '../global/Colors.js'
import axios from 'axios'
import { __COMPONENT_STYLES__ } from '../global/Styles.js'
import Icon from 'react-icons-kit';
import { roundN } from '../helpers/calcs.js'
import { boldUp } from 'react-icons-kit/entypo/boldUp'
import { boldDown } from 'react-icons-kit/entypo/boldDown'
import { Pie, PieChart, Cell } from 'recharts'
import { Checkbox } from '@blueprintjs/core'
import { RangeSlider, Slider } from '@blueprintjs/core'

const __DEV__ = false

const __COLORS__ = [
  PrimaryColor(0.4),
  Red(0.4),
  Green(0.4)
]

export default class PiePane extends Component {

  constructor(props) {
    super(props)
    this.state = {
      units: 2000
    }
  }

  componentDidMount() {

  }

  render() {
    var index = Math.min(Math.round(this.state.units / 100), 99)

    var data = [
      {
        val: this.props.data[index].small,
        name: 'Small',
        color: PrimaryColor(0.7)
      },
      {
        val: this.props.data[index].large,
        name: "Large",
        color: Red(0.7)
      },
      {
        val: this.props.data[index].electrical,
        name: "Electrical",
        color: Green(0.7)
      }
    ]
    return (
      <div style={styles.container}>
        <PieChart width={300} height={250}>
          <Pie 
            data={data} 
            dataKey="val" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            outerRadius={120} 
            fill="#8884d8">
            {
              data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={__COLORS__[index]}/>
              ))
            }
          </Pie>
        </PieChart>
        <div style={styles.column}>
          <p 
            style={{
              ...__COMPONENT_STYLES__.bold,
              ...{
                color: White(0.8)
              }
            }}>
            {"Units"}
          </p>
          <br/>
          <Slider 
            min={100}
            max={10000}
            labelStepSize={ 5000 }
            vertical
            stepSize={ 100}
            onChange={(units) => this.setState({ units }) }
            value={this.state.units} 
            />
        </div>
      </div>
    )
  }
}


const styles = {
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
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
