import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({person}) => {
  return(
    <p>
      {person.name} {person.number}
    </p>
  )
}

const Persons = ({personsToShow}) => {
  return(
    <div>
        {personsToShow.map((person) => <Person key= {person.name} person={person}/>)}
    </div>
  )
}

const Filter = ({searchedName, handleSearchChange}) => {
  return(
    <div>
          filter shown with <input
                  value = {searchedName}
                  onChange={handleSearchChange}
                />
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
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
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')

  useEffect(() => {
    personService.getInitialList()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

      personService.addNewPerson(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
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
      <Filter searchedName={searchedName} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App