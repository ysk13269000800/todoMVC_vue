;
(function (Vue) { //全局中依赖Vue
	const todos = [{
			id: 1,
			title: '吃饭',
			completed: false
		},
		{
			id: 2,
			title: '睡觉',
			completed: true
		}, {
			id: 3,
			title: '打豆豆',
			completed: true
		}
	]

	new Vue({
		el: '#todoapp',
		data: {
			todos,
			currentEditing: null
		},
		methods: {
			//ES6简写,无特殊意义
			//等价于addTodo:function(){}
			addTodo(event) {
				//1.获取文本框中的数据
				var todoText = event.target.value.trim()
				if (!todoText.length) {
					return
				}
				const todos = this.todos
				var id = todos.length ? todos[todos.length - 1].id + 1 :1
				//数组列表发生变化，则绑定渲染数据的视图也会更新
				this.todos.push({
					id,
					title: todoText,
					completed: false
				})
				event.target.value = '' //添加后清空文本框
				//2.判断数据是否非空
				//3.如果为空，则不做，如果非空就添加到数组中
			},
			//切换任务的完成状态
			toggleAll(event) {
				var checked = event.target.checked
				//数组中的元素的tomplated都改为checked
				this.todos.forEach(todo => todo.completed = checked)
			},
			removeTodo(index, e) {
				this.todos.splice(index, 1)
			},
			handleGetEditingDblclick(todo) {
				this.currentEditing = todo
			},
			handleSaveEditKeydown(todo,index,e){
				const target = e.target
				console.log(target)
				const value = target.value.trim()

				if (!value.length) {
					this.todos.splice(index, 1)
				}else{
					todo.title = value
					this.currentEditing = null
				}
			},
			handleCancelEditEsc() {
				// 1. 把样式给去除
				this.currentEditing = null
			},
			handleClearAllDoneClick(){
				this.todos = this.todos.filter(t => !t.completed)
			}
		}
	}).$mount('#app')
})(Vue)
