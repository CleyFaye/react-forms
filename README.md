@cley_faye/react-forms
======================
Library to quickly lay out forms using React and declarative syntax.

Heavily inspired by my days using Python and Django.
Although those are so far back, I'm sure I'm doing a lot of things wrong.

Design idea
-----------
You should be able to easily specify the expected layout of a JSON object, and create a form/viewer
that allows editing/viewing an actual JSON object matching that layout.

Ideally the actual components should be generic, and there should be provision to change the layout
without hassle.

Workflow
--------

1. Designing the layout of the JSON data
2. Creating a form
3. (optional) customize the form layout and components

### JSON data layout
It is possible to use almost any kind of data type, as long as a matching component is
provided/available.
In addition to fields that have a value and matching component, it is also possible to "nest"
definitions, so that one field in a data object contain another object.

There are two ways to define the type of a field.
For direct fields, it is possible to simply provide a string with the field type.
This type will have to match a field type available from the component provider.

For all field types it is possible to provide a structure that allows defining some additional
properties.

In addition to nested fields, there is support for nested arrays.
Arrays can be static (only handling data present in the initial input) or dynamic (allowing adding
and removing entries).

The definition of a JSON layout is done by matching the `ResourceDefinition` type in `resource.ts`.

### Creating a form
The form component takes the above as input, and lay component for all fields by default.

The simplest usage would be:

```JavaScript
render() {
  return <Form
    value={this.state.value}
    onChange={this.handleChange}
    onAction={this.handleAction}
    resource={resourceDefinition}
  />;
}
```

Where `resourceDefinition` is the definition as described above.

The `value` props expects to receive an object with only primitive types, arrays, or objects
with the same restriction, because its content will be duplicated for updates.

The `Form` component will keep the state value updated, and can call some predefined actions if the
layout provides them.
The value is duplicated and updated; properties that are not part of the displayed fields are left
untouched.
Expected action names are "submit", "cancel" and "reset".

### Customize the form layout and components
The `Form` component takes some additional props:

- `children` (the usual React property) can be provided, and it will be passed down to the layout.
- `layout` as a custom render function that receive the actual rendered components for each required
  field.
- `fieldsProvider` as a function that renders a single field
- `arrayProvider` as a function that handles array properties
- `fields` as an array of string identifying fields to expose in the form

#### Custom layout
The `layout` property is a function that defaults to a very basic HTML form layout.
It takes a function that accepts an object as its only argument with the following properties:

- `fields`: a record of all the fields component at this level of the object
- `children`: the `children` props of the `Form` field, only on the top-level layout
- `depth`: the depth of this layout. The layout used directly by the `Form` component is at depth 0,
  and each nested field increase the depth by one.
- `onAction`: a function that can be called to trigger an action on the form

This function should return a proper React node.

#### Custom fields
The `fieldsProvider` property defaults to basic HTML form fields.
It takes a function that accepts an object as its only argument with the following properties:

- `name`: the field name
- `definition`: the full field definition as an object matching the `FieldDefinition` interface
- `onAction`: a function that can be called to trigger an action on the form
- `value`: the effective value for the field
- `onChange`: a function to call when the value needs to be updated. Takes `name` and the new value
  as arguments.

This function is responsible for creating direct fields.
Nested fields are handled automatically by the library.

This function should render a proper React node.

#### Array fields
The `arrayProvider` property defaults to basic HTML to handle arrays.
It takes a function that accepts an object as its only argument with the following properties:

- `name`: the field name
- `dynamic`: true if the array should be dynamic (user can add/remove entries)
- `fields`: an array of fields, each entry representing an entry in the input value. Each entry is
  an object with the following two properties: `key` and `component`. The `key` property is
  guaranteed to follow changes properly in dynamic array
- `onAdd`: a function to call when a new entry must be added
- `onRemove`: a function to call when an entry must be removed. It takes the entry's `key` as an
  argument.

This function should render a proper React node.

#### Customize visible fields
Sometimes, you might want to only display some fields. Instead of defining multiple different
resource definitions, you can just have a complete one and specify in the `Form` instance that only
some fields should be rendered.

To do so, you can provide the fields names to render as an array of strings.
For nested fields, use the `.` notation.
The same notation can be used for nested arrays.
