import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {map} from 'lodash'
import styled from 'styled-components'

const Container = styled.div`
  width: 637px;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.25);
`

const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px #050D26 solid;
  border-top: none;
  width: 100%;
  box-sizing: border-box;
`

const LargeStatBlock = styled.div`
  flex-grow: 1;
  background: #273855;
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 15px;
`
const SmallStatBlock = styled.div`
  background: #1F273A;
  flex-grow: 1;
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 15px;
`
const MainBlock = styled.div `
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const TitleNum = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 5px;
`

const LargeStatTitle = styled.h2`
font-weight: normal;
  margin: 0;
  font-size: 14px;
  color: #A9BDD2;
`
const LargeStatNum = styled.h1`
font-weight: normal;
  margin: 3px 0 0 0; padding: 0; 
  font-size: 26px;
  color: #E4E6EE;
`
const SmallStatTitle = styled.h2`
  font-weight: normal;
  margin: 0;
  font-size: 12px;
  color: #A9BDD2;
  text-shadow: 0 1px 3px #22293A;
`
const SmallStatNum = styled.h1`
font-weight: normal;
  margin: 3px 0 2px 0; padding: 0; 
  font-size: 18px;
  color: #E4E6EE;
`


const StatContext = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #738EA7;
  margin-top: 2px;
`
const Percentile = styled.div`
  font-size: 9px;
  padding: 4px;
  background: #485F88;
  border-radius: 4px;
  color: white;
  font-weight: 700;
`
const Rank = styled.span`
  margin: 0 3px 0 5px;
  color: #F9FCFF;
  text-shadow: 0 1px 3px #22293A;

  font-weight: 700;
`

const Graph = styled.div`
  width: 50px;
  height: 50px;
  padding: 0 8px;
  box-sizing: border-box;
  border: 1px solid #364357;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-radius: 5px;
  background: #162032;
`

const Bar = styled.div`
  position: relative;
  width: 4px;
  height: 70%;
  transform-origin: 50% 100%;
  transform: scaleY(${props => props.yScalar});

  :nth-of-type(1){ background: #608C73; }
  :nth-of-type(2){ background: #A3252C; }
  :nth-of-type(3){ background: #5175A2; }
  :nth-of-type(4){ background: #BE9FF9; }
  :nth-of-type(5){ background: #C4614C; }

  &::before{
    display: ${props => props.selected? 'block' : 'none'};
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    border: 4px solid transparent;
    border-top: 4px solid white; 
    top: -8px;
    left: -2px; 
    transform-origin: 4px 4px;
    transform: scale(0.6, 1.5);
  }
`

const WidgetTitle = styled.div`
  display: flex;
  color: white;
  font-size: 18px;
  padding: 10px 15px;
  width: 100%;
  font-weight: 700;
  background: #273855;
  border: 1px solid #050D26;
  border-bottom: none;
  align-items: center;
  box-sizing: border-box;
`
const SkullIcon = styled.div`
  border: 1px solid white;
  margin-right: 10px;
  width: 15px; height: 15px;
`

const StatClassGraph = (props) => {
  const classes = Object.keys(props.values)
  return (
    <Graph>
      {map(props.values).map((val,i)=>{
        const highestVal = Math.max(...map(props.values))
        console.log('highestVal', highestVal)
        return <Bar selected = {classes[i]===props.selected} yScalar = {val / highestVal}/>
      })}
    </Graph>
  )
}

const KillsBlock = (props) => {
  return(
    <Container>
      <WidgetTitle>
        <SkullIcon /> Kills
      </WidgetTitle>
      <StatRow>

        {[props.kdr, props.avgKills, props.maxSpree].map((stat)=>{
          return (
            <LargeStatBlock>
              <MainBlock>
                <TitleNum>
                  <LargeStatTitle> {stat.label} </LargeStatTitle>
                  <LargeStatNum> {stat.values[props.selected]} </LargeStatNum>
                </TitleNum>
                <StatClassGraph 
                  values = {stat.values}
                  selected = {props.selected}
                /> 
              </MainBlock>
              <StatContext>
                <Percentile> {stat.percentile} </Percentile>
                <Rank> #{stat.rank} </Rank> of {props.playerPopulation} Players 
              </StatContext>
            </LargeStatBlock>
          )
        })}
      </StatRow>
      <StatRow>
        {[props.totalPlayerKills, props.totalBotKills, props.totalAssists].map((stat)=>{
          return (
            <SmallStatBlock>
              <SmallStatTitle> {stat.label} </SmallStatTitle>
              <SmallStatNum> {stat.value} </SmallStatNum>
              <StatContext>
                <Percentile> {stat.percentile} </Percentile>
                <Rank> #{stat.rank} </Rank>
              </StatContext>
            </SmallStatBlock>
          )
        })}
      </StatRow>
    </Container>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
          {/* <img src="https://i.gyazo.com/93cebf0b71b7a262d46f5b968c099e94.png" /> */}
          <div>
            <KillsBlock
              selected = "hunter"
              playerPopulation = '1.5m'
              kdr = {{label: 'Kill / Death Ratio', values: {hunter: 7.2, warrior: 5, engineer: 4.2, assassin: 1, mage: 3.7}, rank: 5232, percentile: 'Top 10%'}}
              avgKills = {{label: 'Avg. Kills per Match', values: {hunter: 6.5, warrior: 11, engineer: 5, assassin: 2, mage: 4.2}, rank: 5001, percentile: 'Top 10%'}}
              maxSpree = {{label: 'Killing Spree Max', values: {hunter: 8, warrior: 4, engineer: 7, assassin: 1, mage: 2}, rank: 968, percentile: 'Top 10%'}}
              totalPlayerKills = {{label: 'Player Kills', value: 221, rank: 6547, percentile: 'Top 10%'}}
              totalBotKills = {{label: 'Bot Kills', value: 221, rank: 4861, percentile: 'Top 10%'}}
              totalAssists = {{label: 'Assists', value: 221, rank: 5334, percentile: 'Top 10%'}}
            />
          </div>
      </div>
    );
  }
}

export default App;
