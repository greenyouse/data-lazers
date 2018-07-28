# DataLazers

Make converting unknown data into a standard format a bit easier. This library
allows you to write data transformations as data structures and declarative
functions.

It's a small library (2.9kB with dependencies) and easy to extend with your own
operators.

## Warning

This is a new project so treat it as pre-alpha and subject to change. 

Hopefully it can get more stable over the next few weeks/months.

## Installation

```sh
npm i data-lazers
```

## Usage

`L` is the base object for the library.

There is one main function `translate` and six smaller functions prefixed
by an underscore:

- `_default`
- `_equals`
- `_format`
- `_or`
- `_pipe`
- `_when`

## Show me the code

More examples are coming but here are some samples:

```js
L.translate({foo: 'hello'}, {hello: 'world'});
// => {foo: 'world'}

L.translate({foo: 'hello'}, {
    hello: 'world',
    other: 'things' // filtered out, key didn't match
});
// => {foo: 'world'}

// hold onto 'yer butts
L.translate({
    large: 'example', // 'object'
    // match of or little, else default to lots
    with: L._default('lots', 'of', 'little'), // 'lots'
    // when 'and' exists, return {'other': 0}
    things: L._when('and', {'other': 0}), // { other: 0 }
    // pipe functions, match nested lookup, even number?, multiply by 100
    fun: L._pipe('stuff', 'over', 'here', n => n + 1, n => n * 100), // 600
    // tagged template for pulling out key values and indexes
    look: L._format`it's a ${'cool'} string`, // it's a template string
    // logical or that returns the first match
    and: L._or('some', 'other', 'strings'), // other
    // didn't match
    pretty: 'neat eh?' //null
}, {
    example: 'object',
    stuff: {over: {here: 5}},
    cool: 'template',
    and: 100,
    other: 'other'
});
/*
=> {
    large: "object",
    with: "lots",
    things: { other: 0 },
    fun: 600,
    look: "it's a template string",
    and: "other"
}
*/
```

There are moderately good JSDocs and tests to look through for now.
    

## TODO
- [ ] js-verify for extra testing, all core functions
- [ ] add a GH pages site with machine-generated docs
- [ ] open source real-world apps using lib
- [ ] clean up `core/index.js`
- [ ] show extra domain-specific functions extending the core lib
- [ ] set up builds for different styles, IFFE/ES6/CJS/UMD
- [ ] write a better README
- [ ] add memes :D
