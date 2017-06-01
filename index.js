const {grey,red,yellow,green} = require('chalk')
const logUpdate = require('log-update');
const elegantSpinner = require('elegant-spinner');
const t = require('outdent')

const taskler = (tasks, done = n => n) => {
	let canvas = {};

	setInterval(() => {
		logUpdate(t`
	    ${
	      Object.keys(canvas).map(line => {
	        return t`
	          ${canvas[line].status === 'running' ? yellow(canvas[line].spinner()) : green('✔') } ${canvas[line].title}${canvas[line].status === 'running' ? canvas[line].sub ? '\n' + grey('   → ' + canvas[line].sub) : '' : ''}`
	      }).join('\n')
	    }
	  `);

		if(!Object.values(canvas).some(({status}) => status === 'running')) {
			done()
			process.exit(1);
		}
	}, 80);

  tasks.forEach(({title, task}) => {
    canvas[title] = {
      status: 'running',
      title,
      sub: '',
			spinner: elegantSpinner()
    }

    task({
      emit: text => canvas[title].sub = text,
      succeed: () => {
				canvas[title].status = 'succeed'
			}
    })
  })
}

module.exports = taskler
