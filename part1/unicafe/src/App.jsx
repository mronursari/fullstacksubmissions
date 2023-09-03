import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({text, value}) => {
  return(
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad
  if(total == 0)
  {
    return(
      <>
        <h1>statistics</h1>
        <p>
          No feedback given
        </p>
      </>
    )
  }
  else
  {
    const averageScore = (good - bad) / total
    const goodPerc = (100 * good / total) + ' %'

    return(
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text={'good'} value={good}/>
            <StatisticsLine text={'neutral'} value={neutral}/>
            <StatisticsLine text={'bad'} value={bad}/>
            <StatisticsLine text={'all'} value={total}/>
            <StatisticsLine text={'average'} value={averageScore}/>
            <StatisticsLine text={'positive'} value={goodPerc}/>
          </tbody>
        </table>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGood = () => {
    setGood(good+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
  }

  const handleBad = () => {
    setBad(bad+1)
  }

  const total = good + neutral + bad
  const averageScore = (good - bad) / total
  const goodPerc = 100 * good / total

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={'good'}/>
      <Button handleClick={handleNeutral} text={'neutral'}/>
      <Button handleClick={handleBad} text={'bad'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App