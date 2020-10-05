import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftBase from './base'
import draftBack from './back'
import draftFront from './front'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Pattern.prototype.draftBase = draftBase
Pattern.prototype.draftBack = draftBack
Pattern.prototype.draftFront = draftFront

export default Pattern
