// App.js
// Yuan Wang

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BackgroundImage from './components/BackgroundImage.js'
import { __COMPONENT_STYLES__ } from './global/Styles.js'
import { Black, White, PrimaryColor } from './global/Colors.js'
import ChartsPane from './components/ChartsPane.js'
import PiePane from './components/PiePane.js'
import axios from 'axios'
import ScrollArea from 'react-scrollbar'
// import FlowsPane from './components/FlowsPane.js'
import './index.css'
import { dataGen } from './helpers/calcs.js'
import { RangeSlider, Slider } from '@blueprintjs/core'

const __MIN_SMALL_COMPONENT_UNIT_COST__ = 1000
const __MIN_ELECTRONICS_UNIT_COST__ = 1000
const __MIN_LARGE_COMPONENT_UNIT_COST__ = 2000
const __MIN_LABOR_UNIT_COST__ = 1000

const __MAX_SMALL_COMPONENT_UNIT_COST__ = 10000
const __MAX_ELECTRONICS_UNIT_COST__ = 10000
const __MAX_LARGE_COMPONENT_UNIT_COST__ = 10000
const __MAX_LABOR_UNIT_COST__ = 10000
const __SLIDE_STEP_LABEL_COUNT__ = 5

const __BACKGROUND_IMAGE_URL__ = "http://snowbirdsgulfcoast.com/wp-content/uploads/2015/09/Dauphin-Island-sunset.jpg"

const __BACKGROUND_IMAGES__ = [
  "/action-athlete-barbell-841130.jpg"
]

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      smallComponentsUnitCost: [__MIN_SMALL_COMPONENT_UNIT_COST__ + 2000, 9000],
      electronicsUnitCost: [__MIN_ELECTRONICS_UNIT_COST__ + 2000, 10000],
      largeComponentsUnitCost: [__MIN_LARGE_COMPONENT_UNIT_COST__ + 2000, 5000],
      laborUnitCost: [__MIN_LABOR_UNIT_COST__ + 2000, 8000]
    }
  }
  componentDidMount() {

  }

  render() {
    // determine the background
    var now = new Date()
    var hour = now.getHours()

    var backgroundIndex = 0
    var backgroundImage = __BACKGROUND_IMAGES__[backgroundIndex]

    var data = dataGen(
      this.state.smallComponentsUnitCost, 
      this.state.largeComponentsUnitCost, 
      this.state.electronicsUnitCost
      )

    return (
      <div 
        style={styles.container}
        className="App">
        <BackgroundImage 
          backgroundColor={Black(0.8)}
          contentStyle={{
            ...__COMPONENT_STYLES__.jumboContent,
            ...styles.content
          }}
          background={"url(" + backgroundImage + ")"}>
          <div 
            style={{
              ...styles.headerPane,

              }}>
            <h1 
              style={{
                ...__COMPONENT_STYLES__.titleText,
                ...{
                  color: White(0.8)
                }
              }}>
              {"Myodeck Cost Modeling"}
            </h1>
            <br/>
            <div 
              style={{
                ...__COMPONENT_STYLES__.hline,
                ...{
                  width: 700
                }
              }}/>
          </div>

          <div style={styles.body}>

            <ScrollArea 
              speed={0.9}
              contentStyle={{
                padding: 10,
              }}
              style={{
              ...styles.paneLeft, 
              ...styles.pane
              }}>
              <h1 
                style={{
                  ...__COMPONENT_STYLES__.subtitle,
                  ...{
                    color: White(0.8)
                  }
                }}>
                {"Parameters"}
              </h1>
              
              <div 
                style={{
                  ...__COMPONENT_STYLES__.hline,
                  ...{
                    marginTop: 5,
                    marginBottom: 20,
                    width: 300
                  }
                }}/>

              

              <p 
                style={{
                  ...__COMPONENT_STYLES__.bold,
                  ...{
                    color: White(0.8)
                  }
                }}>
                {"Small Components"}
              </p>
              <p 
                style={{
                  ...__COMPONENT_STYLES__.paragraph,
                  ...{
                    color: White(0.8)
                  }
                }}>
                {"Small components include a wide range of small parts that can be sourced domestically. Small parts benefit the most dramatically from economies of scale as retooling is the largest driver in costs. As retooling costs are amortized at scale, unit costs of small components fall dramatically."}
              </p>

              <div style={styles.controlsContainer}>
                <RangeSlider 
                  min={__MIN_SMALL_COMPONENT_UNIT_COST__}
                  max={__MAX_SMALL_COMPONENT_UNIT_COST__}
                  labelStepSize={ __MAX_SMALL_COMPONENT_UNIT_COST__ / __SLIDE_STEP_LABEL_COUNT__ }
                  stepSize={__MAX_SMALL_COMPONENT_UNIT_COST__ / 50}
                  onChange={(value) => this.setState({ smallComponentsUnitCost: value }) }
                  value={this.state.smallComponentsUnitCost} 
                  />
              </div>

              <p 
                style={{
                  ...__COMPONENT_STYLES__.bold,
                  ...{
                    color: White(0.8)
                  }
                }}>
                {"Large Components"}
              </p>
              <p 
                style={{
                  ...__COMPONENT_STYLES__.paragraph,
                  ...{
                    color: White(0.8)
                  }
                }}>
                {"Large component unit costs are driven largely by material cost. While bulk purchasing of large components can offer some cost savings, these savings are modest and reach an asymptote quickly. Furthermore, large components are highly exposed to commodities prices."}
                </p>

              <div style={styles.controlsContainer}>
                <RangeSlider 
                  min={__MIN_LARGE_COMPONENT_UNIT_COST__}
                  max={__MAX_LARGE_COMPONENT_UNIT_COST__}
                  labelStepSize={ __MAX_LARGE_COMPONENT_UNIT_COST__ / __SLIDE_STEP_LABEL_COUNT__ }
                  stepSize={__MAX_LARGE_COMPONENT_UNIT_COST__ / 50}
                  onChange={(value) => this.setState({ largeComponentsUnitCost: value }) }
                  value={this.state.largeComponentsUnitCost} 
                  />
              </div>


              <p 
                style={{
                  ...__COMPONENT_STYLES__.bold,
                  ...{
                    color: White(0.8)
                  }
                }}>
                {"Electrical"}
              </p>
              <p 
                style={{
                  ...__COMPONENT_STYLES__.paragraph,
                  ...{
                    color: White(0.8)
                  }
                }}>
                {"The electrical system includes electronics infrastructure, robotics, and computational machinery. Electrical unit costs benefit moderately but latently from economics of scale as the overhead costs (in both time and resources) for producing custom components are substantial."}
              </p>

              <div style={styles.controlsContainer}>
                <RangeSlider 
                  min={__MIN_ELECTRONICS_UNIT_COST__}
                  max={__MAX_ELECTRONICS_UNIT_COST__}
                  labelStepSize={  __MAX_ELECTRONICS_UNIT_COST__ / __SLIDE_STEP_LABEL_COUNT__ }
                  stepSize={__MAX_ELECTRONICS_UNIT_COST__ / 50}
                  onChange={(value) => this.setState({ electronicsUnitCost: value }) }
                  value={this.state.electronicsUnitCost} 
                  />
              </div>

              <p 
                style={{
                  ...__COMPONENT_STYLES__.bold,
                  ...{
                    color: White(0.8)
                  }
                }}>
                {"Labor"}
              </p>
              <p 
                style={{
                  ...__COMPONENT_STYLES__.paragraph,
                  ...{
                    color: White(0.8)
                  }
                }}>
                {"Coming soon: labor costs are not currently modeled."}
              </p>
              <br/>


            </ScrollArea>

            <ScrollArea 
              speed={0.9}
              contentStyle={{
                padding: 10,
              }}
              style={{
                ...styles.paneRight, 
                ...styles.pane
                }}>

              <h1 
                style={{
                  ...__COMPONENT_STYLES__.subtitle,
                  ...{
                    color: White(0.8)
                  }
                }}>
                {"Cost Breakdown"}
              </h1>
              <div 
                style={{
                  ...__COMPONENT_STYLES__.hline,
                  ...{
                    marginTop: 5,
                    marginBottom: 20,
                    width: 300
                  }
                }}/>
              <PiePane data={data} />

            
              <h1 
                style={{
                  ...__COMPONENT_STYLES__.subtitle,
                  ...{
                    color: White(0.8)
                  }
                }}>
                {"Production Costs Over Time"}
              </h1>
              
              <div 
                style={{
                  ...__COMPONENT_STYLES__.hline,
                  ...{
                    marginTop: 5,
                    marginBottom: 20,
                    width: 300
                  }
                }}/>

              <ChartsPane
                data={data} />
              
              


            </ScrollArea>
            
          </div>

        </BackgroundImage>
      </div>
    );
  }
}



const styles = {

  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  pane: {
    padding: 10
  },
  headerPane: {
    margin: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: White(0),

  },
  paneLeft: {
    margin: 10,
    width: 400,
    flexDirection: 'column',
    backgroundColor: White(0.1),

  },
  paneRight: {
    margin: 10,

    flex: 1,
    backgroundColor: White(0.1),

  },
  body: {
    backgroundColor: White(0.0),
    flex: 5,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
  },
  top: {

    flex: 3,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    display: 'flex',
  },
  sidebar: {  
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    minWidth: 300,
    display: 'flex',
  },
  mainbody: {
    flexDirection: 'column',
    flex: 4,
    display: 'flex', 

  },
  controlsContainer: {
    padding: 15,
  },  
  clockText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 80
  },
  scroll: {
    maxHeight: '70vh',
    flex: 1,
  },
  scrollContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  cleanLink: {
    textDecoration: 'none'
  },
  whiteText: {
    color: 'white',
    textAlign: 'start'
  },
  content: {
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
  },
  hline: {
    backgroundColor: White(1),
    maxHeight: 1,
    flex: 2,
    width: 400
  }


}

export default App;
