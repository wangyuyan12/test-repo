import vue from 'vue'

let helloworld = new vue({

	el: '#app1',

	data: {
		a: 1,
		h: 'hi',
		message: 'hello vue.js',
		htmlseg: '<h1>hi, hmtl</h1>',
		attrtest: 'test',
		inputval: 'feifeiyu',
		outval: '',
		classObj: {
			'class-a': false,
			'class-b': true,
		},
		activeColor: '#668B8B',
		fontSize: 18,
		ifTest: false,
		parentMessage: 'Parent',
		items: [
			{message: 'foo'},
			{message: 'bar'}
		],
		message2: '',
		checkedNames: [],
		picked: '',
		selected: 'A',
		options: [
			{ text: 'One', value: 'A' },
			{ text: 'Two', value: 'B' },
			{ text: 'Three', value: 'C' }
		]
	},

	created() {
		console.log('a is ' + this.a)
		console.log('created')
	},

	beforeCompile() {
		console.log('beforeCompile')
	},

	compiled() {
		console.log('compiled')
	},

	ready() {
		console.log('ready')
	},

	computed: {
		outval: {
			/*console.log(this.inputval)
			return this.inputval*/

			get() {
				console.log('in get', this.inputval)
				return this.inputval
			},

			set(newValue) {
				console.log('in set', newValue)
				this.outval = newValue
			}
		}
	},

	methods: {

		greet(e) {
			alert(this.message + '!')
			console.log(e.target.tagName)
		},

		say: (msg, e) => {
			console.log( 'say: ' + msg )
			console.log(e)
		},

		onSubmit() {
			console.log('submit')
		}
	}


})
