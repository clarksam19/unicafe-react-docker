import React, { useState } from 'react'

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const Statistic = ({ type, value }) => {
  return (
    <tr>
      <td>{type}</td>
      <td>{value}</td>
    </tr>
  )
};

const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props.stats;
  const allZero = (...args) => {
    return args.every(arg => arg === 0);
  };
  if (allZero(good, neutral, bad)) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <table>
        <tbody>
          <Statistic type='good' value={good}/>
          <Statistic type='neutral' value={neutral}/>
          <Statistic type='bad' value={bad}/>
          <Statistic type='all' value={all}/>
          <Statistic type='average' value={average}/>
          <Statistic type='positive' value={positive}/>
        </tbody>
      </table>
    )
  }
}
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const arrayAverage = (array) => {
    const sum = array.reduce((acc, num) => acc + num);
    return sum / array.length;
  };

  const all = good + neutral + bad;
  const average = arrayAverage([good, neutral, bad]).toFixed(2);
  const positive = (((good / all) || 0) * 100).toFixed(2);
  const stats = { good, neutral, bad, all, average, positive };
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button onClick={() => setBad(bad + 1)} text='bad'/>
      <h1>Statistics</h1>
      <Statistics stats={stats}/>
    </div>
  )
}

export default App