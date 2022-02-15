# React Native - Style/Structure Guideline - TypeScript

## Structure

**hint**: Avoid Deep Nesting Content, should follow the following diagram.

│── animations  
├── api  
├── assets  
├── components 
│  ├── lists  
│  │  ├── index.ts  
│  │  ├── MyItemsList.tsx  
│  ├── Header  
│  ├── MyComponent.tsx  
├── globals   
├── images  
├── navigations  
├── redux  
├── scenes  
├── tests  
├── utils  
├── App.tsx  



## Naming

**Folders:** `snake_case`  
**Files:** `PascalCase`  
**Class/Functions Components:** `PascalCase`  
**Navigations Components:** `PascalCase`  
**Functions:** `camelCase`  
**Vars**: `snake_case` (use `let` | `const` instead of the generic `var`)  

## Class vs React.createClass vs stateless vs functional component

Always prefer functional component (not arrow functions) over class.

```ts
// bad
const Listing = React.createClass({
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
});

// bad
class Listing extends React.Component {
  render() {
    return <div>{this.props.hello}</div>;
  }
}

// bad (relying on function name inference is discouraged)
const Listing = ({ hello }: Props) => (
  <div>{hello}</div>
);

// good
...
function Listing({ hello }: Props) {
  return <div>{hello}</div>;
}
```



## Import/Export

### Use Absolute import

Prefer using absolute import over relative import:

```ts

// bad (relative import)
import { MyItemList, FooList } from '../components/lists';

// good
import { MyItemList, FooList } from 'components/lists';
```

### Export component functional area as API

Simply add an `index.ts` in functional area to export easily the components:

```ts
import MyItemList from './MyItemList.tsx';
import FooList from './FooList.tsx';

export { MyItemList, FooList };
```

To import:

```ts
import { MyItemList, FooList } from 'components/lists';
```