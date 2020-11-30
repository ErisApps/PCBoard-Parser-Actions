import {getInput, debug, info, error, setFailed} from '@actions/core'

import fs from 'fs'
import path from 'path'

async function run(): Promise<void> {
  try {
    const fullPath = process.env['GITHUB_WORKSPACE'] as string
    debug(`Workspace path is ${fullPath}`)
    debug(`Action local path is ${__dirname}`)

    // Get Inputs
    const jsonFilePath: string = getInput('json-file')

    if (jsonFilePath === undefined || jsonFilePath.length === 0) {
      error('A json file that has to be parsed must be provided.')
      throw Error('Unable to validate json file due to invalid input.')
    }

    info(`  json-file: ${jsonFilePath}`)
    const jsonFullFilePath = path.join(fullPath, jsonFilePath)

    const jsonString: string = fs.readFileSync(jsonFullFilePath, 'utf8')
    const jsonFileObject = JSON.parse(jsonString)
  } catch (ex) {
    setFailed(ex.message)
  }
}

run()
