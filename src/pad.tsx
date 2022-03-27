import React from "react";
import ReactDOMServer from "react-dom/server.js";
import {BasicFieldProvider} from "./basic/basicfieldprovider.js";
import {Resource} from "./resource/resource.js";
import {ArrayType} from "./resource/types.js";

const res = new Resource({
  name: {type: "text"},
  phone: {type: "text"},
  /*
  contacts: {
    type: "text",
    isArray: ArrayType.staticArray,
  },
  */
});

const data = {
  name: "bender bending rodriguez",
  phone: "shn-mtl-ass",
  /*
  contacts: [
    "fry",
    "leela",
    "fender",
  ],
  */
};

const fields = res.getFields(new BasicFieldProvider());

let keyId = 0;

const fieldComps = Object.keys(fields).map(fieldName => fields[fieldName]({
  key: (++keyId).toString(),
  name: "titi",
  value: "potato",
  onChange(name: string, newValue: unknown): void {
    throw new Error("Function not implemented.");
  },
  position: undefined,
}));

console.log(ReactDOMServer.renderToString(<div>{fieldComps}</div>));
