# use-mounted-effect

A React hook to run effect only if a component is mounted.

Credits to [Lukas Klinzing](https://dev.to/theluk) for his [article](https://dev.to/theluk/usemountedeffect-asynchronous-useeffect-on-potentially-unmounted-components-5d56) about potential memory leak when using `React.useEffect` asynchronously.

Credits to (Étienne Martin)(https://etiennemartin.ca) for the template of this repository. 

## Installation

To use use-mounted-effect in your project, run:

```shell script
yarn add use-mounted-effect
```

## Purpose

When using an asynchronous effect, it can be a potential memory leak.

```typescript
const [state, setState] = React.useState();

React.useEffect(() => {
  setInterval(() => setState(...), 10_000);
}, []);
```

If the fetch call resolve when the component is unmounted, the state will be updated on something that isn't existing anymore.

This hook will run your effect only if the component is mounted.

### Usage

You can use `useMountedEffect` like you would use `React.useEffect`, but it provides you the following benefits:

- You can pass an `async` callback
- Your effect will be called with an `isMounted()` argument that it can use to check if the component is still mounted.

### Example

```typescript
const [data, setData] = React.useState();

useMountedEffect(async (isMounted) => {
  const { data } = await fetch(url);

  if (!isMounted()) return;

  setState(data);
}, []);
```

