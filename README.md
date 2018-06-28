# container-x

Inspired from the library unstated, but with different approach 

---

## Install
```
npm install container-x
```

## Usage
```jsx
import { Container, Subscribe } from 'container-x'

const store = new Container({ foo: 'bar' })

const App = props => {
  return (
    <Subscribe to={store} bind={['foo']}>
      {foo => <div>{foo}</div>}
    </Subscribe>
  )
}

// Some places else

store.setState({ foo: 'new value' }) // Magic happens

// Async setState

store.setState({ foo: 'another value' }).then(() => {
	// this is called after all listeners are resolved
})
```
