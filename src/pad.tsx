import React from "react";
import ReactDOMServer from "react-dom/server.js";
import {BasicFieldProvider} from "./basic/basicfieldprovider.js";
import {Form} from "./form/form.js";
import {Resource} from "./resource/resource.js";
import {ArrayType} from "./resource/types.js";

const res = new Resource({
  name: {type: "text"},
  phone: {type: "text"},
  contacts: {
    type: "text",
    isArray: ArrayType.staticArray,
  },
});

const data = {
  name: "bender bending rodriguez",
  phone: "shn-mtl-ass",
  contacts: [
    "fry",
    "leela",
    "fender",
  ],
};

const fields = res.getFields(new BasicFieldProvider());

console.log(ReactDOMServer.renderToString(<Form
  fields={fields}
  data={data}
/>));
