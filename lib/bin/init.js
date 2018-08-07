const fs = require('fs-extra')
const path = require('path')
const spawn = require('cross-spawn')
const inquirer = require('inquirer')
const sortPackageJson = require('sort-package-json')

const endWithError = err => {
  console.error('\n' + err)
  process.exit(1)
}

const initApp = async function() {
  const appDir = process.cwd()

  const { appName, technologies } = await inquirer.prompt([
    {
      type: 'input',
      name: 'appName',
      message: 'Project name:',
      default: path.basename(appDir),
      validate: s => !!s,
    },
    {
      type: 'checkbox',
      name: 'technologies',
      message: 'Wanna add something?',
      choices: [
        { name: 'redux', checked: true },
        { name: 'recompose', checked: true },
      ],
    },
  ])

  const ownDir = path.join(__dirname, '..')
  const tplsDir = path.join(ownDir, 'templates')

  const tpls = ['base', ...technologies]

  let packageJson = require(path.join(appDir, 'package.json'))
  let deps = []
  let devDeps = []

  packageJson.name = appName

  tpls.forEach(tplName => {
    const tplFiles = path.join(tplsDir, tplName)
    if (fs.pathExistsSync(tplFiles)) fs.copySync(tplFiles, appDir)

    const tplConfigPath = path.join(tplsDir, tplName + '.js')
    if (fs.pathExistsSync(tplConfigPath)) {
      const tplConfig = require(tplConfigPath)

      deps = deps.concat(tplConfig.deps)
      devDeps = devDeps.concat(tplConfig.devDeps)

      if (tplConfig.packageJson) {
        packageJson = {
          ...packageJson,
          ...tplConfig.packageJson,
        }
      }
    }
  })

  fs.moveSync(path.join(appDir, 'gitignore'), path.join(appDir, '.gitignore'))

  fs.writeFileSync(
    path.join(appDir, 'package.json'),
    JSON.stringify(sortPackageJson(packageJson), null, 2) + '\n',
  )

  const sort = (a, b) => (a > b ? 1 : -1)

  const args = ['install', '--save', ...deps.sort(sort)]
  const proc1 = spawn.sync('npm', args, { stdio: 'inherit' })
  if (proc1.status !== 0) endWithError(`Error during installing dependencies`)

  const argsDev = ['install', '--save-dev', ...devDeps.sort(sort)]
  const proc2 = spawn.sync('npm', argsDev, { stdio: 'inherit' })
  if (proc2.status !== 0) endWithError(`Error during installing dependencies`)

  console.log(`The ${appName} app successfully created at ${appDir}!`)
}

initApp()
