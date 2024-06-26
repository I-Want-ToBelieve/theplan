import { Command } from 'commander'
import fs from 'node:fs'

import { classes } from './data'
import { $ } from 'execa'

const program = new Command()

program
  .name('kp')
  .description('ke ping gen')
  .version('0.0.0')

program.command('gen')
  .description('gen the kp')
  .option('-r, --replace <string>', 'name that  will be replaced frist')
  .option('-f, --file <string>', 'the keping template file path')
  .option('-d, --weekofday <string>', 'weekofday')
  .option('-t, --time <string>', 'time')
  .action((opts) => {
    const { replace, file, time, weekofday } = opts
    const clazz = classes.find((it) => {
      if (it.weekOfDay === weekofday && it.time === time) return it
    })

    try {
      if (!clazz) {
        throw new Error('not found class')
      }
      const context = fs.readFileSync(file).toString()

      for (const student of clazz.students) {
        fs.writeFileSync(`/tmp/${student}.md`, context.replaceAll(replace, student))

        $`code /tmp/${student}.md`
      }
    } catch (error) {
      console.error(error)
    }
  })

program.parse()
