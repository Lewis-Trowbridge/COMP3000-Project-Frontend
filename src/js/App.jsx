import useBackend from './utils/useBackend'

function App() {
  // eslint-disable-next-line no-unused-vars
  const { data } = useBackend({
    bbox: {
      bottomLeftX: 50.35535618196109,
      bottomLeftY: -4.230367299744433,
      topRightX: 50.480183908774855,
      topRightY: -4.013752232325168,
    },
  })

  return (
    <p>Hello world!</p>
  )
}

export default App
