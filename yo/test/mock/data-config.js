'use strict';

angular.module('mockedDataConfig', [])
    .value('mockDataConfigSaveJSON', {
        'id': 4,
        'resources': [
            { 'id': 2 }
        ],
        'parameters': {
            'column_delimiter': ';',
            'escape_character': '\\\\',
            'quote_character': '\\\'',
            'column_names': 'columnN',
            'storage_type': 'csv'
        }
    })
    .value('mockDataConfigGetJSON', {
        "id": 4,
        "resources": [
            {
                "id": 2
            }
        ],
        "parameters": {
            "column_delimiter": ";",
            "escape_character": "\\\\",
            "quote_character": "\\\"",
            "column_names": "columnN",
            "storage_type": "csv"
        }
    })
    .value('mockDataResourceGetJson', {
        "id": 42,
        configurations: [{
            id: 1337,
            name: 'foo',
            description: 'Lorem ipsum dolor sit amet.',
            parameters: {
                ignore_lines: 0,
                discard_rows: 2,
                at_most_rows: 5,
                column_delimiter: "^",
                escape_character: "\\\\",
                quote_character: "\\\"",
                column_names: "columnN",
                storage_type: "csv"
            }
        }]
    })
    .value('mockDataConfigXMLResource', {
        id: 42,
        configurations: [{
            id: 4,
            name: 'foooo',
            description: 'bar baz',
            resources: [{
                id: 42
            }],
            parameters: {
                schema_file: {
                    id: 1337,
                    name: 'foo',
                    description: 'bar'
                },
                storage_type: 'xml'
            }
        }]
    });
