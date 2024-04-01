#!/usr/bin/env node

import { spawn } from 'node:child_process'

const env = { ...process.env }

if (process.env.DATABASE_URL) {
  try {
    const databaseUrl = new URL(process.env.DATABASE_URL)
    env.PG_HOST = databaseUrl.hostname
    env.PG_PORT = databaseUrl.port
    env.PG_USER = databaseUrl.username
    env.PG_PASSWORD = databaseUrl.password
    env.PG_DB_NAME = databaseUrl.pathname.slice(1)
  } catch (err) {
    console.error('Invalid DATABASE_URL')
  }
}

;(async() => {
  // launch application
  await exec(process.argv.slice(2).join(' '))
})()

function exec(command) {
  const child = spawn(command, { shell: true, stdio: 'inherit', env })
  return new Promise((resolve, reject) => {
    child.on('exit', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${command} failed rc=${code}`))
      }
    })
  })
}
