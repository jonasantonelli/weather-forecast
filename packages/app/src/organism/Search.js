import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { useHistory } from 'react-router-dom'

import Autocomplete from '@material-ui/lab/Autocomplete'
import { prefixedCities } from 'utils/config'
import { useForecastContext } from 'context/forecast'

const Root = styled.div`
  margin: 30px auto 0;

  .MuiAutocomplete-root {
    width: 300px;
    margin: auto;
    font-size: 14px;
  }

  .MuiIconButton-root,
  .MuiFormLabel-root {
    color: var(--secondary-color);
  }

  .MuiFormLabel-root.Mui-focused {
    color: var(--secondary-color);
  }

  .MuiInputBase-root {
    color: var(--secondary-color);
    border-radius: 8px;
    outline: none;
  }

  .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: var(--tertiary-color);
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: var(--tertiary-color);
  }
`

const Search = () => {
  const { city, setCity } = useForecastContext()
  const history = useHistory()

  const handleChange = (_, value) => {
    history.push('/')
    setCity(value)
  }
  return (
    <Root>
      <Autocomplete
        id="combo-box-cities"
        options={prefixedCities}
        value={city}
        onChange={handleChange}
        renderInput={params => (
          <TextField {...params} label="Search for city" variant="outlined" />
        )}
      />
    </Root>
  )
}

export default Search
