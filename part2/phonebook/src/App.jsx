import { useState, useEffect } from 'react'
import personService from './services/persons'

const DeleteButton = ({person, deletePerson}) => {

  const handleDeletion = () => {
    if(window.confirm("Do you want to delete " + person.name + "?"))
    {
      deletePerson(person.id)
    }

  }

  return(
    <button onClick={handleDeletion}>Delete</button>
  )
}

const Person = ({person, deletePerson}) => {
  return(
    <p>
      {person.name} {person.number} <DeleteButton person={person} deletePerson={deletePerson}/>
    </p>
  )
}

const Persons = ({personsToShow, deletePerson}) => {
  return(
    <div>
        {personsToShow.map((person) => <Person key= {person.name} person={person} deletePerson={deletePerson}/>)}
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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='note'>
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')
  const [addedNote, setAddedNote] = useState(null)
  const [addedError, setAddedError] = useState(null)

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
          handleNoteDisplay(newPerson.name)
        })
    }
    else
    {
      if(window.confirm(newName + " already exists, do you want to replace the number?"))
      {
        const replacedPerson = persons.find(person => person.name === newName)
        const replacedPersonWithNewNo = {...replacedPerson, number: newNumber}
        personService.replacePerson(replacedPersonWithNewNo).then(response =>{
          setPersons(persons.map(person => person.name !== newName ? person : response))
        }
        )
        .catch(error => {
          setAddedError(`Information of ${replacedPerson.name} already removed from server`)
          setTimeout(() => {
            setAddedError(null)
          }, 5000)
        })
      }
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

  const deletePerson = (id) => {

    personService.deletePerson(id)
      .then(responseData => {
        console.log('Response is', responseData)
        personService.getInitialList()
          .then(initialPersons => {
            setPersons(initialPersons)
        })
      })
  }

  const handleNoteDisplay = (name) =>
  {
    setAddedNote(
      `Added ${name} to phonebook`
    )
    setTimeout(() => {
      setAddedNote(null)
    }, 5000)
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(searchedName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedNote}/>
      <ErrorNotification message={addedError}/>
      <Filter searchedName={searchedName} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App