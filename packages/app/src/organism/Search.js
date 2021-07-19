import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Autocomplete from '@material-ui/lab/Autocomplete'
import { prefixedCities } from 'utils/config'
import { useForecastContext } from 'context/forecast'

const useStyles = makeStyles(() => ({
  root: {
    width: 300,
    margin: 'auto',
    fontSize: 14,
  },
  input: {
    color: 'var(--color-secondary)',
  },
}))

const Root = styled.div`
  margin: 40px auto 20px;

  .MuiIconButton-root,
  .MuiFormLabel-root {
    color: var(--color-secondary);
  }

  .MuiFormLabel-root.Mui-focused {
    color: var(--color-secondary);
  }

  .MuiInputBase-root {
    border-radius: 8px;
    outline: none;
  }

  .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: var(--color-tertiary);
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: var(--color-tertiary);
  }
`

const Search = () => {
  const classes = useStyles()
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
        classes={{
          root: classes.root,
          input: classes.input,
        }}
        onChange={handleChange}
        renderInput={params => (
          <TextField {...params} label="Search for city" variant="outlined" />
        )}
      />
    </Root>
  )
}

export default Search
