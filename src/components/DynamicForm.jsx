import React from 'react';
import Form from '@rjsf/core';
import Ajv from 'ajv';

const schema = {
    title: "User Registration",
    type: "object",
    properties: {
        firstName: { type: "string", title: "First Name" },
        lastName: { type: "string", title: "Last Name" }
    },
    required: ["firstName", "lastName"]
};

// Create an instance of Ajv
const ajv = new Ajv({ allErrors: true });

// Create a custom validator for the form
const validator = ajv.compile(schema);

const DynamicForm = () => (
    <Form
        schema={schema}
        validator={validator}
        onSubmit={({ formData }) => console.log(formData)}
    />
);

export default DynamicForm;
