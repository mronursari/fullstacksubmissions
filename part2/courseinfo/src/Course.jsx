const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part key={part.id} part ={part} />)}
  </>

const Course = ({course}) => {
  return (
    <>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total sum = {course.parts.reduce((acc, currentPart) => acc + currentPart.exercises, 0)}/>
    </>
  )
}

export default Course