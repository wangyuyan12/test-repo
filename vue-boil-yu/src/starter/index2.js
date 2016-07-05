import Vue from 'vue'

let helloworld = new Vue({
	el: '#app1',
	data: {
		message: 'hello world!'
	}
})

let input = new Vue({
	el: '#app2',
	data: {
		message: 'hello vue.js!'
	}
})

let list = new Vue({
	el: '#app3',
	data: {
		todos: [
			{text: 'learn JavaScript'},
			{text: 'learn vue.js'},
			{text: 'build awesome'}
		]
	}
})

let list2 = new Vue ({
	 el: '#app4',
	  data: {
	    newTodo: '',
	    todos: [
	      { text: 'Add some todos' }
	    ]
	  },
	  methods: {
	    addTodo() {
	      var text = this.newTodo.trim()
	      if (text) {
	        this.todos.push({ text: text })
	        this.newTodo = ''
	      }
	    },

	    removeTodo(index) {
	      this.todos.splice(index, 1)
	    }
	  }
})