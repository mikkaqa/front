import Ajv from 'ajv';

const ajv = new Ajv();

const elementSchema = {
    type: 'object',
    required: ['id', 'type', 'pos', 'size'],
    properties: {
        id: { type: 'string' },
        type: { type: 'string' },
        pos: {
            type: 'object',
            required: ['x', 'y'],
            properties: {
                x: { type: 'number' },
                y: { type: 'number' }
            }
        },
        size: {
            type: 'object',
            required: ['width', 'height'],
            properties: {
                width: { type: 'number' },
                height: { type: 'number' }
            }
        }
    }
};

const slideSchema = {
    type: 'object',
    required: ['id', 'elements'],
    properties: {
        id: { type: 'string' },
        elements: {
            type: 'array',
            items: elementSchema
        }
    }
};

const editorSchema = {
    type: 'object',
    required: ['presentation', 'selection'],
    properties: {
        presentation: {
            type: 'object',
            required: ['slides'],
            properties: {
                slides: {
                    type: 'array',
                    items: slideSchema
                }
            }
        },
        selection: {
            type: 'object',
            properties: {
                selectedSlideId: { type: ['string', 'null'] },
                selectedObjectId: { type: ['string', 'null'] }
            }
        }
    }
};

export const validateEditor = ajv.compile(editorSchema);