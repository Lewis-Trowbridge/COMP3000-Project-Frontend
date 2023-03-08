import { COLOUR_SCALES, METRICS } from '../constants'

export default (metric, value) => {
  if (metric === METRICS.AIR_QUALITY) {
    if (value >= 0 && value <= 11) {
      return COLOUR_SCALES[metric][1]
    }
    if (value > 11 && value <= 23) {
      return COLOUR_SCALES[metric][2]
    }
    if (value > 23 && value <= 35) {
      return COLOUR_SCALES[metric][3]
    }
    if (value > 35 && value <= 41) {
      return COLOUR_SCALES[metric][4]
    }
    if (value > 41 && value <= 47) {
      return COLOUR_SCALES[metric][5]
    }
    if (value > 47 && value <= 53) {
      return COLOUR_SCALES[metric][6]
    }
    if (value > 53 && value <= 58) {
      return COLOUR_SCALES[metric][7]
    }
    if (value > 58 && value <= 64) {
      return COLOUR_SCALES[metric][8]
    }
    if (value > 64 && value <= 70) {
      return COLOUR_SCALES[metric][9]
    }
    return COLOUR_SCALES[metric][10]
  }
  if (value < -5) {
    return COLOUR_SCALES[metric][1]
  }
  if (value > -5 && value <= 0) {
    return COLOUR_SCALES[metric][2]
  }
  if (value > 0 && value <= 5) {
    return COLOUR_SCALES[metric][3]
  }
  if (value > 5 && value <= 15) {
    return COLOUR_SCALES[metric][4]
  }
  if (value > 15 && value <= 20) {
    return COLOUR_SCALES[metric][5]
  }
  if (value > 20 && value <= 25) {
    return COLOUR_SCALES[metric][6]
  }
  return COLOUR_SCALES[metric][7]
}
