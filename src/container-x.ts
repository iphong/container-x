/**
 * @name: container-x
 * @author: Phong Vu
 */
import { Component, ReactNode } from 'react'

export class Container<State = {}> {
	state: State
	listeners: Array<Function> = []
	constructor(state: State) {
		this.state = state
	}
	setState(nextState: State | ((prevState: State) => State), callback) {
		this.state = Object.assign({}, this.state, nextState)
		this.listeners.forEach(fn => fn(nextState))
	}
	subscribe(fn: Function) {
		this.listeners.push(fn)
	}
	unsubscribe(fn: Function) {
		this.listeners = this.listeners.filter(f => f !== fn)
	}
}
export class Subscribe extends Component<{
	to: Container,
	bind: Array<string>,
	children: (...args) => ReactNode
}> {
	componentDidMount() {
		this.props.to.subscribe(this.onUpdate)
	}
	componentWillUnmount() {
		this.props.to.unsubscribe(this.onUpdate)
	}
	onUpdate = changes => {
		return new Promise(resolve => {
			Object.keys(changes).some(k => this.props.bind.includes(k)) ? this.setState({}, resolve) : resolve()
		})
	}
	render() {
		return this.props.children(...this.props.bind.map(p => this.props.to.state[p]))
	}
}
