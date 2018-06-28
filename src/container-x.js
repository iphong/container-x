"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
class Container {
    constructor(state) {
        this.listeners = [];
        this.state = state;
    }
    setState(updater, callback) {
        const nextState = typeof updater === 'function' ? updater(this.state) : updater;
        Object.assign({}, this.state, nextState);
        return Promise.all(this.listeners.map(fn => fn(nextState)));
    }
    subscribe(fn) {
        this.listeners.push(fn);
    }
    unsubscribe(fn) {
        this.listeners = this.listeners.filter(f => f !== fn);
    }
}
exports.Container = Container;
class Subscribe extends react_1.Component {
    constructor() {
        super(...arguments);
        this.onUpdate = (changes) => new Promise(resolve => {
            Object.keys(changes).some(k => this.props.bind.includes(k)) ? this.setState({}, resolve) : resolve();
        });
    }
    componentDidMount() {
        this.props.to.subscribe(this.onUpdate);
    }
    componentWillUnmount() {
        this.props.to.unsubscribe(this.onUpdate);
    }
    render() {
        return this.props.children(...this.props.bind.map(p => this.props.to.state[p]));
    }
}
exports.Subscribe = Subscribe;
//# sourceMappingURL=container-x.js.map