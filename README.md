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
```
