import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'skirt-block',
  version,
  design: 'Sewanista',
  code: 'enyachoke',
  department: 'womenswear',
  type: 'block',
  margin: 15,
  sa: 10,
  difficulty: 3,
  tags: [
    'freesewing',
    'design',
    'diy',
    'fashion',
    'made to measure',
    'parametric design',
    'block',
    'sewing',
    'sewing pattern'
  ],
  optionGroups: {
    fit: ['backDartDepthFactor', 'frontDartDepthFactor', 'backDartReduction', 'seatEase']
  },
  measurements: [
    'waistToKnee',
    'waistToHips',
    'hips',
    'waist',
    'waistBack',
    'seat',
    'seatBack',
    'waistToSeat'
  ],
  dependencies: {},
  inject: {
    back: 'base',
    front: 'base'
  },
  hide: [],
  parts: ['back', 'front'],
  options: {
    curvePlacement: 2.4,
    dart2offset: 32,
    backDartDepthFactor: { pct: 60, min: 35, max: 70 },
    frontDartDepthFactor: { pct: 45, min: 30, max: 65 },
    backDartReduction: { pct: 80, min: 50, max: 80 },
    seatEase: { pct: 3, min: 2, max: 4 }
  }
}
