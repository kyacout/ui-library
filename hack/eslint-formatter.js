/* eslint-disable import/no-extraneous-dependencies */

const { writeFile } = require('fs')
const { join } = require('path')
const junit = require('eslint/lib/cli-engine/formatters/junit')
const stylish = require('eslint/lib/cli-engine/formatters/stylish')

const artifactsPath = process.env.ARTIFACTS || '.'
const junitPath = join(artifactsPath, 'junit_eslint.xml')

module.exports = (...args) => {
  writeFile(junitPath, junit(...args), (err) => {
    if (!err) {
      return
    }

    console.error(`failed to write to ${junitPath}`, err)
  })

  return stylish(...args)
}
