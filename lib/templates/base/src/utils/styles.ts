import { css } from 'styled-components'

export const durNumbers = {
  fast: 100,
  norm: 350,
}

export const dur = {
  fast: durNumbers.fast + 'ms',
  norm: durNumbers.norm + 'ms',
}

export const colors = {
  bg: '#f7f7f7',
  border: '#f0f0f0',
  brand: '#ec1651',
  brandHover: '#fd4e8a',
  danger: '#ec1651',
  focus: '#c5c5c5',
  placeholder: '#bbbdbf',
  text: '#404041',
}

export const deviceSizes = {
  phone: 767,
  phoneVertical: 420,
  tablet: 1279,
  tabletSmall: 1023,
}

export const media = {
  phone: `max-width: ${deviceSizes.phone}px`,
  phoneVertical: `max-width: ${deviceSizes.phoneVertical}px`,
  tablet: `max-width: ${deviceSizes.tablet}px`,
  tabletSmall: `max-width: ${deviceSizes.tabletSmall}px`,
}

export const touchClass = 'm-touchevents'
export const noTouchClass = 'm-no-touchevents'

// tslint:disable:object-literal-sort-keys
export const cssEasings = {
  // Sine
  inSine: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
  outSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
  inOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
  // Quad
  inQuad: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
  outQuad: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  inOutQuad: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
  // Cubic
  inCubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
  outCubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
  inOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
  // Quart
  inQuart: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
  outQuart: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
  inOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
  // Quint
  inQuint: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
  outQuint: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
  inOutQuint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
  // Expo
  inExpo: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
  outExpo: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
  inOutExpo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
  // Circ
  inCirc: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
  outCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
  inOutCirc: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
  // Back
  inBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  outBack: 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
  inOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
}
// tslint:enable:object-literal-sort-keys

export const placeholderColor = (color: string = colors.placeholder) => css`
  ::-webkit-input-placeholder {
    color: ${color};
  }
  ::-moz-placeholder {
    color: ${color};
  }
  :-ms-input-placeholder {
    color: ${color};
  }
  :-moz-placeholder {
    color: ${color};
  }
`

export const scrollBarStyle = css`
  &::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    border-width: 2px;
    border-style: solid;
    border-color: #fff;
    background-color: ${colors.brand};
  }
`
