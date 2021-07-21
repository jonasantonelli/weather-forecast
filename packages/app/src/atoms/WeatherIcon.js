import styled from 'styled-components'
import moon from 'icons/moon.png'
import rain from 'icons/rain.png'
import snowflake from 'icons/snowflake.png'
import sun from 'icons/sun.png'

import { weatherStatus as status } from 'utils/config'

const weatherMap = new Map([
  [
    status.sun,
    {
      title: 'Sun',
      src: sun,
    },
  ],
  [
    status.moon,
    {
      title: 'Moon',
      src: moon,
    },
  ],
  [
    status.rain,
    {
      title: 'Rain',
      src: rain,
    },
  ],
  [
    status.snow,
    {
      title: 'Snow',
      src: snowflake,
    },
  ],
])

const Root = styled.div`
  display: inline-block;
`

const Img = styled.img`
  width: 52px;
  height: 52px;
`

const WeatherIcon = ({ weather, ...rest }) => {
  const { src, title } = weatherMap.get(weather)
  return (
    <Root>
      <Img src={src} alt={title} {...rest} />
    </Root>
  )
}

export default WeatherIcon
