/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * Shashikant Hirugade <shashikant.hirugade@modusbox.com>
 --------------
 ******/

'use strict'

const Boom = require('boom')

const routes = [
  {
    address: 'moja.tz.red',
    nextHop: 'moja.superremit' // id for CNP
  },
  {
    address: 'moja.za.blue.zar.green',
    nextHop: 'moja.za.blue.zar.green' // DFSP1 / Green Mobile
  }
]

const getNextHop = async function (request) {
  try {
    // look through routes and match against shortest prefix
    const route = routes[0]
    return {
      finalDestination: request.headers['fspiop-final-destination'] ? request.headers['fspiop-final-destination'] : request.headers['fspiop-destination'],
      destination: route.nextHop
    }
  } catch (err) {
    throw Boom.badRequest(err.message)
  }
}

module.exports = {
  getNextHop
}
