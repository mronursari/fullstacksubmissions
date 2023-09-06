import { useState } from 'react'

const Person = ({person}) => {
  return(
    <p>
      {person.name} {person.number}
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '12345' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')

  const addPerson = (event) =>
  {
    event.preventDefault()

    let sameName = false
    persons.forEach((element) => {
      sameName = sameName || (element.name === newName)
    })

    if(!sameName)
    {
      const newPerson = { name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
    }
    else
    {
      window.alert(`${newName} is already added to phonebook`)
    }

  }

  const handleNameChange = (event) =>
  {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>
  {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) =>
  {
    setSearchedName(event.target.value)
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(searchedName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input
                  value = {searchedName}
                  onChange={handleSearchChange}
                />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
                  value = {newName}
                  onChange={handleNameChange}
                />
        </div>
        <div>
          number: <input
                    value = {newNumber}
                    onChange={handleNumberChange}
                  />
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => <Person key= {person.name} person={person}/>)}
      </div>
    </div>
  )
}

export default App