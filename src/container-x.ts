import { Component, ReactNode } from 'react'

export class Container<State = object> {
	state: State
	listeners: Array<Function> = []
	constructor(state: State) {
		this.state = state
	}
	setState(updater: State | ((prevState: State) => State), callback) {
		const nextState = typeof updater === 'function' ? updater(this.state) : updater
		this.state = Object.assign({}, this.state, nextState)
		return Promise.all(this.listeners.map(fn => fn(nextState)))
	}
	subscribe(fn: Function) {
		this.listeners.push(fn)
	}
	unsubscribe(fn: Function) {
		this.listeners = this.listeners.filter(f => f !== fn)
	}
}
export class Subscribe extends Component<{ to: Container, bind: Array<string>, children(...args): ReactNode }> {
	componentDidMount() {
		this.props.to.subscribe(this.onUpdate)
	}
	componentWillUnmount() {
		this.props.to.unsubscribe(this.onUpdate)
	}
	onUpdate = (changes: object) => new Promise(resolve => {
		Object.keys(changes).some(k => this.props.bind.includes(k)) ? this.setState({}, resolve) : resolve()
	})
	render() {
		return this.props.children(...this.props.bind.map(p => this.props.to.state[p]))
	}
}
