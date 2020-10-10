import React from 'react'
import freesewing from '@freesewing/core'
import Workbench from '@freesewing/components/Workbench'
import 'typeface-roboto-condensed'
import '@freesewing/css-theme'

import Pattern from 'pattern'

const App = (props) => {
  let instance = new Pattern()
  let config = instance.config

  // You can use this to add transations
  
  let translations = {
    JSON: 'JSON',
    'options.skirt-block.backDartDepthFactor.title': 'Centre Backdart Depth Factor',
    'options.skirt-block.backDartReduction.title': 'Side Backdart Reduction',
    'options.skirt-block.frontDartDepthFactor.title': 'Frontdart Depth Factor',
    'options.skirt-block.seatEase.title': 'Seat Ease',
    'options.skirt-block.backSidePositioning.title': 'Back side dart Positioning'
  }
  

  return (
    <Workbench
      freesewing={freesewing}
      Pattern={Pattern}
      config={config}
      userLanguage="en"
      translations={translations}
    />
  )
}

export default App
