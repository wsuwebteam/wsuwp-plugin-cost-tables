# wsuwp-plugin-cost-tables

## Shortcode | wsuwp_cost_table

### Attributes

| Attribute               | Type    | Default Value                                          |
| ----------------------- | ------- | ------------------------------------------------------ |
| className               | string  |                                                        |
| data_source             | string  | The current site url                                   |
| default_type            | string  | The slug for the first record in the types taxonomy    |
| default_session         | string  | The slug for the first record in the sessions taxonomy |
| default_campus          | string  | "pullman"                                              |
| default_career_path     | string  | "undergraduate"                                        |
| show_session_filter     | boolean | true                                                   |
| show_campus_filter      | boolean | true                                                   |
| show_career_path_filter | boolean | true                                                   |
| error_message           | string  | "No results found for the selected options."           |

### Example

[wsuwp_cost_table data_source="https://financialaid.wsu.edu" default_type="cost-table" default_session="2023-2024" default_campus="pullman" show_session_filter="false"]
