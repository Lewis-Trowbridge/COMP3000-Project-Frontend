import { render } from '@testing-library/react'
import Reading from '../Reading'

describe('<Reading/>', () => {
  it('renders the given station data', async () => {
    const expectedDate = new Date(0)
    const expectedName = 'name'
    const expectedUnit = 'unit'
    const expectedValue = 0.0

    const { findByText } = render(<Reading
      unit={expectedUnit}
      name={expectedName}
      value={expectedValue}
      timestamp={expectedDate.toISOString()}
    />)

    expect(await findByText(expectedName)).toBeInTheDocument()
    expect(await findByText(`${expectedValue} ${expectedUnit}`)).toBeInTheDocument()
    expect(await findByText(expectedDate.toUTCString())).toBeInTheDocument()
  })
})
