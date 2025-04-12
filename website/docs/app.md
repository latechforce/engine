# Engine configuration

- [1. Property `Engine configuration > automations`](#automations)
  - [1.1. Engine configuration > automations > Automation configuration](#automations_items)
    - [1.1.1. Property `Engine configuration > automations > Automation configuration > actions`](#automations_items_actions)
      - [1.1.1.1. Engine configuration > automations > Automation configuration > actions > Action types](#automations_items_actions_items)
        - [1.1.1.1.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action`](#automations_items_actions_items_anyOf_i0)
          - [1.1.1.1.1.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action > action`](#automations_items_actions_items_anyOf_i0_action)
          - [1.1.1.1.1.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action > fields`](#automations_items_actions_items_anyOf_i0_fields)
            - [1.1.1.1.1.2.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action > fields > additionalProperties`](#automations_items_actions_items_anyOf_i0_fields_additionalProperties)
          - [1.1.1.1.1.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action > name`](#automations_items_actions_items_anyOf_i0_name)
          - [1.1.1.1.1.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action > service`](#automations_items_actions_items_anyOf_i0_service)
          - [1.1.1.1.1.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action > table`](#automations_items_actions_items_anyOf_i0_table)
        - [1.1.1.1.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action`](#automations_items_actions_items_anyOf_i1)
          - [1.1.1.1.2.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > action`](#automations_items_actions_items_anyOf_i1_action)
          - [1.1.1.1.2.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > code`](#automations_items_actions_items_anyOf_i1_code)
          - [1.1.1.1.2.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > env`](#automations_items_actions_items_anyOf_i1_env)
            - [1.1.1.1.2.3.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > env > additionalProperties`](#automations_items_actions_items_anyOf_i1_env_additionalProperties)
          - [1.1.1.1.2.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input`](#automations_items_actions_items_anyOf_i1_input)
            - [1.1.1.1.2.4.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > TemplateValue`](#automations_items_actions_items_anyOf_i1_input_additionalProperties)
              - [1.1.1.1.2.4.1.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 0`](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i0)
                - [1.1.1.1.2.4.1.1.1. Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 0 > item 0 items](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i0_items)
              - [1.1.1.1.2.4.1.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 1`](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i1)
                - [1.1.1.1.2.4.1.2.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 1 > number`](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i1_number)
              - [1.1.1.1.2.4.1.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 2`](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i2)
                - [1.1.1.1.2.4.1.3.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 2 > boolean`](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i2_boolean)
              - [1.1.1.1.2.4.1.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 3`](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i3)
                - [1.1.1.1.2.4.1.4.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 3 > json`](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i3_json)
              - [1.1.1.1.2.4.1.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > TemplateObject`](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i4)
              - [1.1.1.1.2.4.1.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 5`](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i5)
          - [1.1.1.1.2.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > name`](#automations_items_actions_items_anyOf_i1_name)
          - [1.1.1.1.2.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > service`](#automations_items_actions_items_anyOf_i1_service)
        - [1.1.1.1.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action`](#automations_items_actions_items_anyOf_i2)
          - [1.1.1.1.3.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > action`](#automations_items_actions_items_anyOf_i2_action)
          - [1.1.1.1.3.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > code`](#automations_items_actions_items_anyOf_i2_code)
          - [1.1.1.1.3.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > env`](#automations_items_actions_items_anyOf_i2_env)
            - [1.1.1.1.3.3.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > env > additionalProperties`](#automations_items_actions_items_anyOf_i2_env_additionalProperties)
          - [1.1.1.1.3.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > input`](#automations_items_actions_items_anyOf_i2_input)
          - [1.1.1.1.3.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > name`](#automations_items_actions_items_anyOf_i2_name)
          - [1.1.1.1.3.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > service`](#automations_items_actions_items_anyOf_i2_service)
        - [1.1.1.1.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Read Database Record Action`](#automations_items_actions_items_anyOf_i3)
          - [1.1.1.1.4.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Read Database Record Action > action`](#automations_items_actions_items_anyOf_i3_action)
          - [1.1.1.1.4.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Read Database Record Action > id`](#automations_items_actions_items_anyOf_i3_id)
          - [1.1.1.1.4.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Read Database Record Action > name`](#automations_items_actions_items_anyOf_i3_name)
          - [1.1.1.1.4.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Read Database Record Action > service`](#automations_items_actions_items_anyOf_i3_service)
          - [1.1.1.1.4.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Read Database Record Action > table`](#automations_items_actions_items_anyOf_i3_table)
        - [1.1.1.1.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Get Company Information Action`](#automations_items_actions_items_anyOf_i4)
          - [1.1.1.1.5.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Get Company Information Action > account`](#automations_items_actions_items_anyOf_i4_account)
          - [1.1.1.1.5.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Get Company Information Action > action`](#automations_items_actions_items_anyOf_i4_action)
          - [1.1.1.1.5.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Get Company Information Action > integration`](#automations_items_actions_items_anyOf_i4_integration)
          - [1.1.1.1.5.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Get Company Information Action > name`](#automations_items_actions_items_anyOf_i4_name)
          - [1.1.1.1.5.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Get Company Information Action > siret`](#automations_items_actions_items_anyOf_i4_siret)
        - [1.1.1.1.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action`](#automations_items_actions_items_anyOf_i5)
          - [1.1.1.1.6.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > account`](#automations_items_actions_items_anyOf_i5_account)
          - [1.1.1.1.6.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > action`](#automations_items_actions_items_anyOf_i5_action)
          - [1.1.1.1.6.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client`](#automations_items_actions_items_anyOf_i5_client)
            - [1.1.1.1.6.3.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > address`](#automations_items_actions_items_anyOf_i5_client_address)
            - [1.1.1.1.6.3.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > billing_address`](#automations_items_actions_items_anyOf_i5_client_billing_address)
              - [1.1.1.1.6.3.2.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > billing_address > city`](#automations_items_actions_items_anyOf_i5_client_billing_address_city)
              - [1.1.1.1.6.3.2.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > billing_address > country_code`](#automations_items_actions_items_anyOf_i5_client_billing_address_country_code)
              - [1.1.1.1.6.3.2.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > billing_address > province_code`](#automations_items_actions_items_anyOf_i5_client_billing_address_province_code)
              - [1.1.1.1.6.3.2.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > billing_address > street_address`](#automations_items_actions_items_anyOf_i5_client_billing_address_street_address)
              - [1.1.1.1.6.3.2.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > billing_address > zip_code`](#automations_items_actions_items_anyOf_i5_client_billing_address_zip_code)
            - [1.1.1.1.6.3.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > city`](#automations_items_actions_items_anyOf_i5_client_city)
            - [1.1.1.1.6.3.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > country_code`](#automations_items_actions_items_anyOf_i5_client_country_code)
            - [1.1.1.1.6.3.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > currency`](#automations_items_actions_items_anyOf_i5_client_currency)
            - [1.1.1.1.6.3.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > delivery_address`](#automations_items_actions_items_anyOf_i5_client_delivery_address)
              - [1.1.1.1.6.3.6.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > delivery_address > city`](#automations_items_actions_items_anyOf_i5_client_delivery_address_city)
              - [1.1.1.1.6.3.6.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > delivery_address > country_code`](#automations_items_actions_items_anyOf_i5_client_delivery_address_country_code)
              - [1.1.1.1.6.3.6.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > delivery_address > province_code`](#automations_items_actions_items_anyOf_i5_client_delivery_address_province_code)
              - [1.1.1.1.6.3.6.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > delivery_address > street_address`](#automations_items_actions_items_anyOf_i5_client_delivery_address_street_address)
              - [1.1.1.1.6.3.6.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > delivery_address > zip_code`](#automations_items_actions_items_anyOf_i5_client_delivery_address_zip_code)
            - [1.1.1.1.6.3.7. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > email`](#automations_items_actions_items_anyOf_i5_client_email)
            - [1.1.1.1.6.3.8. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > first_name`](#automations_items_actions_items_anyOf_i5_client_first_name)
            - [1.1.1.1.6.3.9. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > last_name`](#automations_items_actions_items_anyOf_i5_client_last_name)
            - [1.1.1.1.6.3.10. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > locale`](#automations_items_actions_items_anyOf_i5_client_locale)
            - [1.1.1.1.6.3.11. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > name`](#automations_items_actions_items_anyOf_i5_client_name)
            - [1.1.1.1.6.3.12. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > tax_identification_number`](#automations_items_actions_items_anyOf_i5_client_tax_identification_number)
            - [1.1.1.1.6.3.13. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > type`](#automations_items_actions_items_anyOf_i5_client_type)
            - [1.1.1.1.6.3.14. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > vat_number`](#automations_items_actions_items_anyOf_i5_client_vat_number)
            - [1.1.1.1.6.3.15. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > zip_code`](#automations_items_actions_items_anyOf_i5_client_zip_code)
          - [1.1.1.1.6.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > integration`](#automations_items_actions_items_anyOf_i5_integration)
          - [1.1.1.1.6.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > name`](#automations_items_actions_items_anyOf_i5_name)
        - [1.1.1.1.7. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action`](#automations_items_actions_items_anyOf_i6)
          - [1.1.1.1.7.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > account`](#automations_items_actions_items_anyOf_i6_account)
          - [1.1.1.1.7.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > action`](#automations_items_actions_items_anyOf_i6_action)
          - [1.1.1.1.7.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > id`](#automations_items_actions_items_anyOf_i6_id)
          - [1.1.1.1.7.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > integration`](#automations_items_actions_items_anyOf_i6_integration)
          - [1.1.1.1.7.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > name`](#automations_items_actions_items_anyOf_i6_name)
          - [1.1.1.1.7.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > page`](#automations_items_actions_items_anyOf_i6_page)
            - [1.1.1.1.7.6.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > page > additionalProperties`](#automations_items_actions_items_anyOf_i6_page_additionalProperties)
          - [1.1.1.1.7.7. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > table`](#automations_items_actions_items_anyOf_i6_table)
        - [1.1.1.1.8. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action`](#automations_items_actions_items_anyOf_i7)
          - [1.1.1.1.8.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > account`](#automations_items_actions_items_anyOf_i7_account)
          - [1.1.1.1.8.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > action`](#automations_items_actions_items_anyOf_i7_action)
          - [1.1.1.1.8.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email`](#automations_items_actions_items_anyOf_i7_email)
            - [1.1.1.1.8.3.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > bcc`](#automations_items_actions_items_anyOf_i7_email_bcc)
            - [1.1.1.1.8.3.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > cc`](#automations_items_actions_items_anyOf_i7_email_cc)
            - [1.1.1.1.8.3.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > from`](#automations_items_actions_items_anyOf_i7_email_from)
            - [1.1.1.1.8.3.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > html`](#automations_items_actions_items_anyOf_i7_email_html)
            - [1.1.1.1.8.3.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > subject`](#automations_items_actions_items_anyOf_i7_email_subject)
            - [1.1.1.1.8.3.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > text`](#automations_items_actions_items_anyOf_i7_email_text)
            - [1.1.1.1.8.3.7. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > to`](#automations_items_actions_items_anyOf_i7_email_to)
          - [1.1.1.1.8.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > integration`](#automations_items_actions_items_anyOf_i7_integration)
          - [1.1.1.1.8.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > name`](#automations_items_actions_items_anyOf_i7_name)
        - [1.1.1.1.9. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action`](#automations_items_actions_items_anyOf_i8)
          - [1.1.1.1.9.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > account`](#automations_items_actions_items_anyOf_i8_account)
          - [1.1.1.1.9.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > action`](#automations_items_actions_items_anyOf_i8_action)
          - [1.1.1.1.9.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > integration`](#automations_items_actions_items_anyOf_i8_integration)
          - [1.1.1.1.9.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > name`](#automations_items_actions_items_anyOf_i8_name)
          - [1.1.1.1.9.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment`](#automations_items_actions_items_anyOf_i8_payment)
            - [1.1.1.1.9.5.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > amount`](#automations_items_actions_items_anyOf_i8_payment_amount)
            - [1.1.1.1.9.5.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > charge_date`](#automations_items_actions_items_anyOf_i8_payment_charge_date)
            - [1.1.1.1.9.5.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > currency`](#automations_items_actions_items_anyOf_i8_payment_currency)
            - [1.1.1.1.9.5.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > description`](#automations_items_actions_items_anyOf_i8_payment_description)
            - [1.1.1.1.9.5.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > mandate`](#automations_items_actions_items_anyOf_i8_payment_mandate)
            - [1.1.1.1.9.5.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > metadata`](#automations_items_actions_items_anyOf_i8_payment_metadata)
            - [1.1.1.1.9.5.7. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > reference`](#automations_items_actions_items_anyOf_i8_payment_reference)
            - [1.1.1.1.9.5.8. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > retry_if_possible`](#automations_items_actions_items_anyOf_i8_payment_retry_if_possible)
        - [1.1.1.1.10. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action`](#automations_items_actions_items_anyOf_i9)
          - [1.1.1.1.10.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > account`](#automations_items_actions_items_anyOf_i9_account)
          - [1.1.1.1.10.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > action`](#automations_items_actions_items_anyOf_i9_action)
          - [1.1.1.1.10.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > integration`](#automations_items_actions_items_anyOf_i9_integration)
          - [1.1.1.1.10.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > name`](#automations_items_actions_items_anyOf_i9_name)
          - [1.1.1.1.10.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > params`](#automations_items_actions_items_anyOf_i9_params)
            - [1.1.1.1.10.5.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > params > after`](#automations_items_actions_items_anyOf_i9_params_after)
            - [1.1.1.1.10.5.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > params > before`](#automations_items_actions_items_anyOf_i9_params_before)
            - [1.1.1.1.10.5.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > params > limit`](#automations_items_actions_items_anyOf_i9_params_limit)
            - [1.1.1.1.10.5.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > params > mandate`](#automations_items_actions_items_anyOf_i9_params_mandate)
            - [1.1.1.1.10.5.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > params > status`](#automations_items_actions_items_anyOf_i9_params_status)
        - [1.1.1.1.11. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Retrieve Qonto Attachment Action`](#automations_items_actions_items_anyOf_i10)
          - [1.1.1.1.11.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Retrieve Qonto Attachment Action > account`](#automations_items_actions_items_anyOf_i10_account)
          - [1.1.1.1.11.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Retrieve Qonto Attachment Action > action`](#automations_items_actions_items_anyOf_i10_action)
          - [1.1.1.1.11.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Retrieve Qonto Attachment Action > attachmentId`](#automations_items_actions_items_anyOf_i10_attachmentId)
          - [1.1.1.1.11.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Retrieve Qonto Attachment Action > integration`](#automations_items_actions_items_anyOf_i10_integration)
          - [1.1.1.1.11.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Retrieve Qonto Attachment Action > name`](#automations_items_actions_items_anyOf_i10_name)
    - [1.1.2. Property `Engine configuration > automations > Automation configuration > description`](#automations_items_description)
    - [1.1.3. Property `Engine configuration > automations > Automation configuration > name`](#automations_items_name)
    - [1.1.4. Property `Engine configuration > automations > Automation configuration > summary`](#automations_items_summary)
    - [1.1.5. Property `Engine configuration > automations > Automation configuration > trigger`](#automations_items_trigger)
      - [1.1.5.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > IApiCalledHttpTrigger`](#automations_items_trigger_anyOf_i0)
        - [1.1.5.1.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > auth`](#automations_items_trigger_anyOf_i0_auth)
        - [1.1.5.1.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > event`](#automations_items_trigger_anyOf_i0_event)
        - [1.1.5.1.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input`](#automations_items_trigger_anyOf_i0_input)
          - [1.1.5.1.3.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > additionalProperties`](#automations_items_trigger_anyOf_i0_input_additionalProperties)
          - [1.1.5.1.3.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > enum`](#automations_items_trigger_anyOf_i0_input_enum)
            - [1.1.5.1.3.2.1. Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > enum > enum items](#automations_items_trigger_anyOf_i0_input_enum_items)
          - [1.1.5.1.3.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > items`](#automations_items_trigger_anyOf_i0_input_items)
          - [1.1.5.1.3.4. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > oneOf`](#automations_items_trigger_anyOf_i0_input_oneOf)
            - [1.1.5.1.3.4.1. Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > oneOf > JSONSchema](#automations_items_trigger_anyOf_i0_input_oneOf_items)
          - [1.1.5.1.3.5. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > properties`](#automations_items_trigger_anyOf_i0_input_properties)
            - [1.1.5.1.3.5.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > properties > JSONSchema`](#automations_items_trigger_anyOf_i0_input_properties_additionalProperties)
          - [1.1.5.1.3.6. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > required`](#automations_items_trigger_anyOf_i0_input_required)
            - [1.1.5.1.3.6.1. Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > required > required items](#automations_items_trigger_anyOf_i0_input_required_items)
          - [1.1.5.1.3.7. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > type`](#automations_items_trigger_anyOf_i0_input_type)
        - [1.1.5.1.4. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > output`](#automations_items_trigger_anyOf_i0_output)
        - [1.1.5.1.5. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > path`](#automations_items_trigger_anyOf_i0_path)
        - [1.1.5.1.6. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > service`](#automations_items_trigger_anyOf_i0_service)
      - [1.1.5.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > IRecordCreatedDatabaseTrigger`](#automations_items_trigger_anyOf_i1)
        - [1.1.5.2.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 1 > event`](#automations_items_trigger_anyOf_i1_event)
        - [1.1.5.2.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 1 > service`](#automations_items_trigger_anyOf_i1_service)
        - [1.1.5.2.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 1 > table`](#automations_items_trigger_anyOf_i1_table)
      - [1.1.5.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > IWebhookCalledHttpTrigger`](#automations_items_trigger_anyOf_i2)
        - [1.1.5.3.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 2 > auth`](#automations_items_trigger_anyOf_i2_auth)
        - [1.1.5.3.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 2 > event`](#automations_items_trigger_anyOf_i2_event)
        - [1.1.5.3.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 2 > path`](#automations_items_trigger_anyOf_i2_path)
        - [1.1.5.3.4. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 2 > service`](#automations_items_trigger_anyOf_i2_service)
      - [1.1.5.4. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > IPageCreatedNotionTrigger`](#automations_items_trigger_anyOf_i3)
        - [1.1.5.4.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 3 > account`](#automations_items_trigger_anyOf_i3_account)
        - [1.1.5.4.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 3 > event`](#automations_items_trigger_anyOf_i3_event)
        - [1.1.5.4.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 3 > integration`](#automations_items_trigger_anyOf_i3_integration)
        - [1.1.5.4.4. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 3 > table`](#automations_items_trigger_anyOf_i3_table)
      - [1.1.5.5. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > ICronTimeTickedScheduleTrigger`](#automations_items_trigger_anyOf_i4)
        - [1.1.5.5.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 4 > cronTime`](#automations_items_trigger_anyOf_i4_cronTime)
        - [1.1.5.5.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 4 > event`](#automations_items_trigger_anyOf_i4_event)
        - [1.1.5.5.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 4 > service`](#automations_items_trigger_anyOf_i4_service)
      - [1.1.5.6. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > IInviteeCreatedTrigger`](#automations_items_trigger_anyOf_i5)
        - [1.1.5.6.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 5 > account`](#automations_items_trigger_anyOf_i5_account)
        - [1.1.5.6.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 5 > event`](#automations_items_trigger_anyOf_i5_event)
        - [1.1.5.6.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 5 > integration`](#automations_items_trigger_anyOf_i5_integration)
- [2. Property `Engine configuration > buckets`](#buckets)
  - [2.1. Engine configuration > buckets > BucketConfig](#buckets_items)
    - [2.1.1. Property `Engine configuration > buckets > buckets items > name`](#buckets_items_name)
- [3. Property `Engine configuration > database`](#database)
  - [3.1. Property `Engine configuration > database > driver`](#database_driver)
  - [3.2. Property `Engine configuration > database > url`](#database_url)
- [4. Property `Engine configuration > description`](#description)
- [5. Property `Engine configuration > engine`](#engine)
- [6. Property `Engine configuration > forms`](#forms)
  - [6.1. Engine configuration > forms > FormConfig](#forms_items)
    - [6.1.1. Property `Engine configuration > forms > forms items > description`](#forms_items_description)
    - [6.1.2. Property `Engine configuration > forms > forms items > inputs`](#forms_items_inputs)
      - [6.1.2.1. Engine configuration > forms > forms items > inputs > InputConfig](#forms_items_inputs_items)
        - [6.1.2.1.1. Property `Engine configuration > forms > forms items > inputs > inputs items > description`](#forms_items_inputs_items_description)
        - [6.1.2.1.2. Property `Engine configuration > forms > forms items > inputs > inputs items > field`](#forms_items_inputs_items_field)
        - [6.1.2.1.3. Property `Engine configuration > forms > forms items > inputs > inputs items > label`](#forms_items_inputs_items_label)
        - [6.1.2.1.4. Property `Engine configuration > forms > forms items > inputs > inputs items > maxLength`](#forms_items_inputs_items_maxLength)
        - [6.1.2.1.5. Property `Engine configuration > forms > forms items > inputs > inputs items > minLength`](#forms_items_inputs_items_minLength)
        - [6.1.2.1.6. Property `Engine configuration > forms > forms items > inputs > inputs items > placeholder`](#forms_items_inputs_items_placeholder)
        - [6.1.2.1.7. Property `Engine configuration > forms > forms items > inputs > inputs items > required`](#forms_items_inputs_items_required)
    - [6.1.3. Property `Engine configuration > forms > forms items > name`](#forms_items_name)
    - [6.1.4. Property `Engine configuration > forms > forms items > path`](#forms_items_path)
    - [6.1.5. Property `Engine configuration > forms > forms items > submitLabel`](#forms_items_submitLabel)
    - [6.1.6. Property `Engine configuration > forms > forms items > successMessage`](#forms_items_successMessage)
    - [6.1.7. Property `Engine configuration > forms > forms items > table`](#forms_items_table)
    - [6.1.8. Property `Engine configuration > forms > forms items > title`](#forms_items_title)
- [7. Property `Engine configuration > integrations`](#integrations)
  - [7.1. Property `Engine configuration > integrations > airtable`](#integrations_airtable)
    - [7.1.1. Engine configuration > integrations > airtable > AirtableConfig](#integrations_airtable_items)
      - [7.1.1.1. Property `Engine configuration > integrations > airtable > airtable items > apiKey`](#integrations_airtable_items_apiKey)
      - [7.1.1.2. Property `Engine configuration > integrations > airtable > airtable items > baseUrl`](#integrations_airtable_items_baseUrl)
      - [7.1.1.3. Property `Engine configuration > integrations > airtable > airtable items > databaseId`](#integrations_airtable_items_databaseId)
      - [7.1.1.4. Property `Engine configuration > integrations > airtable > airtable items > name`](#integrations_airtable_items_name)
  - [7.2. Property `Engine configuration > integrations > calendly`](#integrations_calendly)
    - [7.2.1. Engine configuration > integrations > calendly > CalendlyConfig](#integrations_calendly_items)
      - [7.2.1.1. Property `Engine configuration > integrations > calendly > calendly items > baseUrl`](#integrations_calendly_items_baseUrl)
      - [7.2.1.2. Property `Engine configuration > integrations > calendly > calendly items > name`](#integrations_calendly_items_name)
      - [7.2.1.3. Property `Engine configuration > integrations > calendly > calendly items > user`](#integrations_calendly_items_user)
        - [7.2.1.3.1. Property `Engine configuration > integrations > calendly > calendly items > user > accessToken`](#integrations_calendly_items_user_accessToken)
  - [7.3. Property `Engine configuration > integrations > gocardless`](#integrations_gocardless)
    - [7.3.1. Engine configuration > integrations > gocardless > GoCardlessConfig](#integrations_gocardless_items)
      - [7.3.1.1. Property `Engine configuration > integrations > gocardless > gocardless items > accessToken`](#integrations_gocardless_items_accessToken)
      - [7.3.1.2. Property `Engine configuration > integrations > gocardless > gocardless items > baseUrl`](#integrations_gocardless_items_baseUrl)
      - [7.3.1.3. Property `Engine configuration > integrations > gocardless > gocardless items > name`](#integrations_gocardless_items_name)
  - [7.4. Property `Engine configuration > integrations > google`](#integrations_google)
    - [7.4.1. Property `Engine configuration > integrations > google > mail`](#integrations_google_mail)
      - [7.4.1.1. Engine configuration > integrations > google > mail > GoogleMailConfig](#integrations_google_mail_items)
        - [7.4.1.1.1. Property `Engine configuration > integrations > google > mail > mail items > baseUrl`](#integrations_google_mail_items_baseUrl)
        - [7.4.1.1.2. Property `Engine configuration > integrations > google > mail > mail items > name`](#integrations_google_mail_items_name)
        - [7.4.1.1.3. Property `Engine configuration > integrations > google > mail > mail items > password`](#integrations_google_mail_items_password)
        - [7.4.1.1.4. Property `Engine configuration > integrations > google > mail > mail items > user`](#integrations_google_mail_items_user)
  - [7.5. Property `Engine configuration > integrations > notion`](#integrations_notion)
    - [7.5.1. Engine configuration > integrations > notion > NotionConfig](#integrations_notion_items)
      - [7.5.1.1. Property `Engine configuration > integrations > notion > notion items > baseUrl`](#integrations_notion_items_baseUrl)
      - [7.5.1.2. Property `Engine configuration > integrations > notion > notion items > name`](#integrations_notion_items_name)
      - [7.5.1.3. Property `Engine configuration > integrations > notion > notion items > pollingInterval`](#integrations_notion_items_pollingInterval)
      - [7.5.1.4. Property `Engine configuration > integrations > notion > notion items > token`](#integrations_notion_items_token)
  - [7.6. Property `Engine configuration > integrations > pappers`](#integrations_pappers)
    - [7.6.1. Engine configuration > integrations > pappers > PappersConfig](#integrations_pappers_items)
      - [7.6.1.1. Property `Engine configuration > integrations > pappers > pappers items > apiKey`](#integrations_pappers_items_apiKey)
      - [7.6.1.2. Property `Engine configuration > integrations > pappers > pappers items > baseUrl`](#integrations_pappers_items_baseUrl)
      - [7.6.1.3. Property `Engine configuration > integrations > pappers > pappers items > name`](#integrations_pappers_items_name)
  - [7.7. Property `Engine configuration > integrations > phantombuster`](#integrations_phantombuster)
    - [7.7.1. Engine configuration > integrations > phantombuster > PhantombusterConfig](#integrations_phantombuster_items)
      - [7.7.1.1. Property `Engine configuration > integrations > phantombuster > phantombuster items > apiKey`](#integrations_phantombuster_items_apiKey)
      - [7.7.1.2. Property `Engine configuration > integrations > phantombuster > phantombuster items > baseUrl`](#integrations_phantombuster_items_baseUrl)
      - [7.7.1.3. Property `Engine configuration > integrations > phantombuster > phantombuster items > name`](#integrations_phantombuster_items_name)
  - [7.8. Property `Engine configuration > integrations > qonto`](#integrations_qonto)
    - [7.8.1. Engine configuration > integrations > qonto > QontoConfig](#integrations_qonto_items)
      - [7.8.1.1. Property `Engine configuration > integrations > qonto > qonto items > baseUrl`](#integrations_qonto_items_baseUrl)
      - [7.8.1.2. Property `Engine configuration > integrations > qonto > qonto items > name`](#integrations_qonto_items_name)
      - [7.8.1.3. Property `Engine configuration > integrations > qonto > qonto items > organisationSlug`](#integrations_qonto_items_organisationSlug)
      - [7.8.1.4. Property `Engine configuration > integrations > qonto > qonto items > secretKey`](#integrations_qonto_items_secretKey)
      - [7.8.1.5. Property `Engine configuration > integrations > qonto > qonto items > stagingToken`](#integrations_qonto_items_stagingToken)
- [8. Property `Engine configuration > loggers`](#loggers)
  - [8.1. Engine configuration > loggers > LoggerConfig](#loggers_items)
    - [8.1.1. Property `Engine configuration > loggers > loggers items > anyOf > LoggerElasticSearchConfig`](#loggers_items_anyOf_i0)
      - [8.1.1.1. Property `Engine configuration > loggers > loggers items > anyOf > item 0 > driver`](#loggers_items_anyOf_i0_driver)
      - [8.1.1.2. Property `Engine configuration > loggers > loggers items > anyOf > item 0 > index`](#loggers_items_anyOf_i0_index)
      - [8.1.1.3. Property `Engine configuration > loggers > loggers items > anyOf > item 0 > level`](#loggers_items_anyOf_i0_level)
      - [8.1.1.4. Property `Engine configuration > loggers > loggers items > anyOf > item 0 > silent`](#loggers_items_anyOf_i0_silent)
      - [8.1.1.5. Property `Engine configuration > loggers > loggers items > anyOf > item 0 > url`](#loggers_items_anyOf_i0_url)
    - [8.1.2. Property `Engine configuration > loggers > loggers items > anyOf > LoggerConsoleConfig`](#loggers_items_anyOf_i1)
      - [8.1.2.1. Property `Engine configuration > loggers > loggers items > anyOf > item 1 > driver`](#loggers_items_anyOf_i1_driver)
      - [8.1.2.2. Property `Engine configuration > loggers > loggers items > anyOf > item 1 > level`](#loggers_items_anyOf_i1_level)
      - [8.1.2.3. Property `Engine configuration > loggers > loggers items > anyOf > item 1 > silent`](#loggers_items_anyOf_i1_silent)
    - [8.1.3. Property `Engine configuration > loggers > loggers items > anyOf > LoggerFileConfig`](#loggers_items_anyOf_i2)
      - [8.1.3.1. Property `Engine configuration > loggers > loggers items > anyOf > item 2 > driver`](#loggers_items_anyOf_i2_driver)
      - [8.1.3.2. Property `Engine configuration > loggers > loggers items > anyOf > item 2 > filename`](#loggers_items_anyOf_i2_filename)
      - [8.1.3.3. Property `Engine configuration > loggers > loggers items > anyOf > item 2 > level`](#loggers_items_anyOf_i2_level)
      - [8.1.3.4. Property `Engine configuration > loggers > loggers items > anyOf > item 2 > silent`](#loggers_items_anyOf_i2_silent)
- [9. Property `Engine configuration > monitors`](#monitors)
  - [9.1. Engine configuration > monitors > monitors items](#monitors_items)
    - [9.1.1. Property `Engine configuration > monitors > monitors items > anyOf > MonitorConsoleConfig`](#monitors_items_anyOf_i0)
      - [9.1.1.1. Property `Engine configuration > monitors > monitors items > anyOf > item 0 > driver`](#monitors_items_anyOf_i0_driver)
    - [9.1.2. Property `Engine configuration > monitors > monitors items > anyOf > Omit`0``](#monitors_items_anyOf_i1)
      - [9.1.2.1. Property `Engine configuration > monitors > monitors items > anyOf > item 1 > driver`](#monitors_items_anyOf_i1_driver)
      - [9.1.2.2. Property `Engine configuration > monitors > monitors items > anyOf > item 1 > dsn`](#monitors_items_anyOf_i1_dsn)
      - [9.1.2.3. Property `Engine configuration > monitors > monitors items > anyOf > item 1 > environment`](#monitors_items_anyOf_i1_environment)
- [10. Property `Engine configuration > name`](#name)
- [11. Property `Engine configuration > server`](#server)
  - [11.1. Property `Engine configuration > server > apiKeys`](#server_apiKeys)
    - [11.1.1. Engine configuration > server > apiKeys > apiKeys items](#server_apiKeys_items)
  - [11.2. Property `Engine configuration > server > baseUrl`](#server_baseUrl)
  - [11.3. Property `Engine configuration > server > env`](#server_env)
  - [11.4. Property `Engine configuration > server > idleTimeout`](#server_idleTimeout)
  - [11.5. Property `Engine configuration > server > monitors`](#server_monitors)
    - [11.5.1. Engine configuration > server > monitors > monitors items](#server_monitors_items)
  - [11.6. Property `Engine configuration > server > port`](#server_port)
  - [11.7. Property `Engine configuration > server > sslCert`](#server_sslCert)
  - [11.8. Property `Engine configuration > server > sslKey`](#server_sslKey)
- [12. Property `Engine configuration > tables`](#tables)
  - [12.1. Engine configuration > tables > Table configuration](#tables_items)
    - [12.1.1. Property `Engine configuration > tables > Table configuration > fields`](#tables_items_fields)
      - [12.1.1.1. Engine configuration > tables > Table configuration > fields > Field types](#tables_items_fields_items)
        - [12.1.1.1.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > DateTime field`](#tables_items_fields_items_anyOf_i0)
          - [12.1.1.1.1.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > DateTime field > name`](#tables_items_fields_items_anyOf_i0_name)
          - [12.1.1.1.1.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > DateTime field > onMigration`](#tables_items_fields_items_anyOf_i0_onMigration)
            - [12.1.1.1.1.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > DateTime field > onMigration > replace`](#tables_items_fields_items_anyOf_i0_onMigration_replace)
          - [12.1.1.1.1.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > DateTime field > required`](#tables_items_fields_items_anyOf_i0_required)
          - [12.1.1.1.1.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > DateTime field > type`](#tables_items_fields_items_anyOf_i0_type)
        - [12.1.1.1.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Email field`](#tables_items_fields_items_anyOf_i1)
          - [12.1.1.1.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Email field > name`](#tables_items_fields_items_anyOf_i1_name)
          - [12.1.1.1.2.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Email field > onMigration`](#tables_items_fields_items_anyOf_i1_onMigration)
            - [12.1.1.1.2.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Email field > onMigration > replace`](#tables_items_fields_items_anyOf_i1_onMigration_replace)
          - [12.1.1.1.2.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Email field > required`](#tables_items_fields_items_anyOf_i1_required)
          - [12.1.1.1.2.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Email field > type`](#tables_items_fields_items_anyOf_i1_type)
        - [12.1.1.1.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Long text field`](#tables_items_fields_items_anyOf_i2)
          - [12.1.1.1.3.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Long text field > name`](#tables_items_fields_items_anyOf_i2_name)
          - [12.1.1.1.3.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Long text field > onMigration`](#tables_items_fields_items_anyOf_i2_onMigration)
            - [12.1.1.1.3.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Long text field > onMigration > replace`](#tables_items_fields_items_anyOf_i2_onMigration_replace)
          - [12.1.1.1.3.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Long text field > required`](#tables_items_fields_items_anyOf_i2_required)
          - [12.1.1.1.3.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Long text field > type`](#tables_items_fields_items_anyOf_i2_type)
        - [12.1.1.1.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single line text field`](#tables_items_fields_items_anyOf_i3)
          - [12.1.1.1.4.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single line text field > name`](#tables_items_fields_items_anyOf_i3_name)
          - [12.1.1.1.4.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single line text field > onMigration`](#tables_items_fields_items_anyOf_i3_onMigration)
            - [12.1.1.1.4.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single line text field > onMigration > replace`](#tables_items_fields_items_anyOf_i3_onMigration_replace)
          - [12.1.1.1.4.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single line text field > required`](#tables_items_fields_items_anyOf_i3_required)
          - [12.1.1.1.4.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single line text field > type`](#tables_items_fields_items_anyOf_i3_type)
        - [12.1.1.1.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Number field`](#tables_items_fields_items_anyOf_i4)
          - [12.1.1.1.5.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Number field > name`](#tables_items_fields_items_anyOf_i4_name)
          - [12.1.1.1.5.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Number field > onMigration`](#tables_items_fields_items_anyOf_i4_onMigration)
            - [12.1.1.1.5.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Number field > onMigration > replace`](#tables_items_fields_items_anyOf_i4_onMigration_replace)
          - [12.1.1.1.5.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Number field > required`](#tables_items_fields_items_anyOf_i4_required)
          - [12.1.1.1.5.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Number field > type`](#tables_items_fields_items_anyOf_i4_type)
        - [12.1.1.1.6. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field`](#tables_items_fields_items_anyOf_i5)
          - [12.1.1.1.6.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > formula`](#tables_items_fields_items_anyOf_i5_formula)
          - [12.1.1.1.6.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > name`](#tables_items_fields_items_anyOf_i5_name)
          - [12.1.1.1.6.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > onMigration`](#tables_items_fields_items_anyOf_i5_onMigration)
            - [12.1.1.1.6.3.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > onMigration > replace`](#tables_items_fields_items_anyOf_i5_onMigration_replace)
          - [12.1.1.1.6.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > output`](#tables_items_fields_items_anyOf_i5_output)
            - [12.1.1.1.6.4.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > output > onMigration`](#tables_items_fields_items_anyOf_i5_output_onMigration)
              - [12.1.1.1.6.4.1.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > output > onMigration > replace`](#tables_items_fields_items_anyOf_i5_output_onMigration_replace)
            - [12.1.1.1.6.4.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > output > required`](#tables_items_fields_items_anyOf_i5_output_required)
            - [12.1.1.1.6.4.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > output > type`](#tables_items_fields_items_anyOf_i5_output_type)
          - [12.1.1.1.6.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > required`](#tables_items_fields_items_anyOf_i5_required)
          - [12.1.1.1.6.6. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > type`](#tables_items_fields_items_anyOf_i5_type)
        - [12.1.1.1.7. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field`](#tables_items_fields_items_anyOf_i6)
          - [12.1.1.1.7.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > name`](#tables_items_fields_items_anyOf_i6_name)
          - [12.1.1.1.7.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > onMigration`](#tables_items_fields_items_anyOf_i6_onMigration)
            - [12.1.1.1.7.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > onMigration > replace`](#tables_items_fields_items_anyOf_i6_onMigration_replace)
          - [12.1.1.1.7.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > options`](#tables_items_fields_items_anyOf_i6_options)
            - [12.1.1.1.7.3.1. Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > options > options items](#tables_items_fields_items_anyOf_i6_options_items)
          - [12.1.1.1.7.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > required`](#tables_items_fields_items_anyOf_i6_required)
          - [12.1.1.1.7.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > type`](#tables_items_fields_items_anyOf_i6_type)
        - [12.1.1.1.8. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field`](#tables_items_fields_items_anyOf_i7)
          - [12.1.1.1.8.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field > name`](#tables_items_fields_items_anyOf_i7_name)
          - [12.1.1.1.8.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field > onMigration`](#tables_items_fields_items_anyOf_i7_onMigration)
            - [12.1.1.1.8.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field > onMigration > replace`](#tables_items_fields_items_anyOf_i7_onMigration_replace)
          - [12.1.1.1.8.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field > required`](#tables_items_fields_items_anyOf_i7_required)
          - [12.1.1.1.8.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field > table`](#tables_items_fields_items_anyOf_i7_table)
          - [12.1.1.1.8.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field > type`](#tables_items_fields_items_anyOf_i7_type)
        - [12.1.1.1.9. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field`](#tables_items_fields_items_anyOf_i8)
          - [12.1.1.1.9.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field > name`](#tables_items_fields_items_anyOf_i8_name)
          - [12.1.1.1.9.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field > onMigration`](#tables_items_fields_items_anyOf_i8_onMigration)
            - [12.1.1.1.9.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field > onMigration > replace`](#tables_items_fields_items_anyOf_i8_onMigration_replace)
          - [12.1.1.1.9.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field > required`](#tables_items_fields_items_anyOf_i8_required)
          - [12.1.1.1.9.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field > table`](#tables_items_fields_items_anyOf_i8_table)
          - [12.1.1.1.9.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field > type`](#tables_items_fields_items_anyOf_i8_type)
        - [12.1.1.1.10. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field`](#tables_items_fields_items_anyOf_i9)
          - [12.1.1.1.10.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > formula`](#tables_items_fields_items_anyOf_i9_formula)
          - [12.1.1.1.10.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > linkedRecordField`](#tables_items_fields_items_anyOf_i9_linkedRecordField)
          - [12.1.1.1.10.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > multipleLinkedRecord`](#tables_items_fields_items_anyOf_i9_multipleLinkedRecord)
          - [12.1.1.1.10.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > name`](#tables_items_fields_items_anyOf_i9_name)
          - [12.1.1.1.10.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > onMigration`](#tables_items_fields_items_anyOf_i9_onMigration)
            - [12.1.1.1.10.5.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > onMigration > replace`](#tables_items_fields_items_anyOf_i9_onMigration_replace)
          - [12.1.1.1.10.6. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > output`](#tables_items_fields_items_anyOf_i9_output)
          - [12.1.1.1.10.7. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > required`](#tables_items_fields_items_anyOf_i9_required)
          - [12.1.1.1.10.8. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > type`](#tables_items_fields_items_anyOf_i9_type)
        - [12.1.1.1.11. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Checkbox field`](#tables_items_fields_items_anyOf_i10)
          - [12.1.1.1.11.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Checkbox field > name`](#tables_items_fields_items_anyOf_i10_name)
          - [12.1.1.1.11.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Checkbox field > onMigration`](#tables_items_fields_items_anyOf_i10_onMigration)
            - [12.1.1.1.11.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Checkbox field > onMigration > replace`](#tables_items_fields_items_anyOf_i10_onMigration_replace)
          - [12.1.1.1.11.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Checkbox field > required`](#tables_items_fields_items_anyOf_i10_required)
          - [12.1.1.1.11.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Checkbox field > type`](#tables_items_fields_items_anyOf_i10_type)
        - [12.1.1.1.12. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field`](#tables_items_fields_items_anyOf_i11)
          - [12.1.1.1.12.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > name`](#tables_items_fields_items_anyOf_i11_name)
          - [12.1.1.1.12.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > onMigration`](#tables_items_fields_items_anyOf_i11_onMigration)
            - [12.1.1.1.12.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > onMigration > replace`](#tables_items_fields_items_anyOf_i11_onMigration_replace)
          - [12.1.1.1.12.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > options`](#tables_items_fields_items_anyOf_i11_options)
            - [12.1.1.1.12.3.1. Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > options > options items](#tables_items_fields_items_anyOf_i11_options_items)
          - [12.1.1.1.12.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > required`](#tables_items_fields_items_anyOf_i11_required)
          - [12.1.1.1.12.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > type`](#tables_items_fields_items_anyOf_i11_type)
        - [12.1.1.1.13. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple attachment field`](#tables_items_fields_items_anyOf_i12)
          - [12.1.1.1.13.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple attachment field > name`](#tables_items_fields_items_anyOf_i12_name)
          - [12.1.1.1.13.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple attachment field > onMigration`](#tables_items_fields_items_anyOf_i12_onMigration)
            - [12.1.1.1.13.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple attachment field > onMigration > replace`](#tables_items_fields_items_anyOf_i12_onMigration_replace)
          - [12.1.1.1.13.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple attachment field > required`](#tables_items_fields_items_anyOf_i12_required)
          - [12.1.1.1.13.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple attachment field > type`](#tables_items_fields_items_anyOf_i12_type)
        - [12.1.1.1.14. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > URL field`](#tables_items_fields_items_anyOf_i13)
          - [12.1.1.1.14.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > URL field > name`](#tables_items_fields_items_anyOf_i13_name)
          - [12.1.1.1.14.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > URL field > onMigration`](#tables_items_fields_items_anyOf_i13_onMigration)
            - [12.1.1.1.14.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > URL field > onMigration > replace`](#tables_items_fields_items_anyOf_i13_onMigration_replace)
          - [12.1.1.1.14.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > URL field > required`](#tables_items_fields_items_anyOf_i13_required)
          - [12.1.1.1.14.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > URL field > type`](#tables_items_fields_items_anyOf_i13_type)
        - [12.1.1.1.15. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single attachment field`](#tables_items_fields_items_anyOf_i14)
          - [12.1.1.1.15.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single attachment field > name`](#tables_items_fields_items_anyOf_i14_name)
          - [12.1.1.1.15.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single attachment field > onMigration`](#tables_items_fields_items_anyOf_i14_onMigration)
            - [12.1.1.1.15.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single attachment field > onMigration > replace`](#tables_items_fields_items_anyOf_i14_onMigration_replace)
          - [12.1.1.1.15.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single attachment field > required`](#tables_items_fields_items_anyOf_i14_required)
          - [12.1.1.1.15.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single attachment field > type`](#tables_items_fields_items_anyOf_i14_type)
    - [12.1.2. Property `Engine configuration > tables > Table configuration > name`](#tables_items_name)
    - [12.1.3. Property `Engine configuration > tables > Table configuration > schema`](#tables_items_schema)
- [13. Property `Engine configuration > theme`](#theme)
  - [13.1. Property `Engine configuration > theme > anyOf > ThemeConfigNone`](#theme_anyOf_i0)
    - [13.1.1. Property `Engine configuration > theme > anyOf > item 0 > type`](#theme_anyOf_i0_type)
  - [13.2. Property `Engine configuration > theme > anyOf > ThemeConfigTailwindCSS`](#theme_anyOf_i1)
    - [13.2.1. Property `Engine configuration > theme > anyOf > item 1 > base`](#theme_anyOf_i1_base)
    - [13.2.2. Property `Engine configuration > theme > anyOf > item 1 > type`](#theme_anyOf_i1_type)
- [14. Property `Engine configuration > tunnel`](#tunnel)
  - [14.1. Property `Engine configuration > tunnel > authToken`](#tunnel_authToken)
  - [14.2. Property `Engine configuration > tunnel > baseUrl`](#tunnel_baseUrl)
  - [14.3. Property `Engine configuration > tunnel > integration`](#tunnel_integration)
  - [14.4. Property `Engine configuration > tunnel > name`](#tunnel_name)
- [15. Property `Engine configuration > version`](#version)

**Title:** Engine configuration

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

**Description:** This is the configuration of the engine.

| Property                         | Pattern | Type        | Deprecated | Definition                                                                  | Title/Description                           |
| -------------------------------- | ------- | ----------- | ---------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| - [automations](#automations )   | No      | array       | No         | -                                                                           | This is the list of automations of the app. |
| - [buckets](#buckets )           | No      | array       | No         | -                                                                           | This is the list of buckets of the app.     |
| - [database](#database )         | No      | object      | No         | In #/definitions/DatabaseConfig                                             | Configuration for the database connection   |
| - [description](#description )   | No      | string      | No         | -                                                                           | This is the description of the app.         |
| + [engine](#engine )             | No      | string      | No         | -                                                                           | This is the version of the engine.          |
| - [forms](#forms )               | No      | array       | No         | -                                                                           | This is the list of forms of the app.       |
| - [integrations](#integrations ) | No      | object      | No         | In #/definitions/IIntegrations                                              | Integrations configuration                  |
| - [loggers](#loggers )           | No      | array       | No         | -                                                                           | Configuration for application logging       |
| - [monitors](#monitors )         | No      | array       | No         | -                                                                           | Array of monitoring service configurations  |
| + [name](#name )                 | No      | string      | No         | -                                                                           | This is the name of the app.                |
| - [server](#server )             | No      | object      | No         | In #/definitions/Omit`0` | Configuration for the application server    |
| - [tables](#tables )             | No      | array       | No         | -                                                                           | This is the list of tables of the app.      |
| - [theme](#theme )               | No      | Combination | No         | -                                                                           | Configuration for application theming       |
| - [tunnel](#tunnel )             | No      | object      | No         | In #/definitions/TunnelNgrokConfig                                          | Configuration for network tunneling         |
| + [version](#version )           | No      | string      | No         | -                                                                           | This is the version of the app.             |

## `0``0`1. Property `Engine configuration > automations`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** This is the list of automations of the app.

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                | Description                                              |
| ---------------------------------------------- | -------------------------------------------------------- |
| [Automation configuration](#automations_items) | Defines an automation workflow with triggers and actions |

### `0``0`1.1. Engine configuration > automations > Automation configuration

**Title:** Automation configuration

|                           |                           |
| ------------------------- | ------------------------- |
| **Type**                  | `object`                  |
| **Required**              | No                        |
| **Additional properties** | Not allowed               |
| **Defined in**            | #/definitions/IAutomation |

**Description:** Defines an automation workflow with triggers and actions

| Property                                         | Pattern | Type   | Deprecated | Definition                | Title/Description                                            |
| ------------------------------------------------ | ------- | ------ | ---------- | ------------------------- | ------------------------------------------------------------ |
| + [actions](#automations_items_actions )         | No      | array  | No         | -                         | List of actions to be executed when the trigger is activated |
| - [description](#automations_items_description ) | No      | string | No         | -                         | -                                                            |
| + [name](#automations_items_name )               | No      | string | No         | -                         | -                                                            |
| - [summary](#automations_items_summary )         | No      | string | No         | -                         | -                                                            |
| + [trigger](#automations_items_trigger )         | No      | object | No         | In #/definitions/ITrigger | Trigger types                                                |

#### `0``0`1.1.1. Property `Engine configuration > automations > Automation configuration > actions`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | Yes     |

**Description:** List of actions to be executed when the trigger is activated

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                  | Description                                                             |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| [Action types](#automations_items_actions_items) | Union type of all possible actions that can be performed in automations |

##### `0``0`1.1.1.1. Engine configuration > automations > Automation configuration > actions > Action types

**Title:** Action types

|                           |                       |
| ------------------------- | --------------------- |
| **Type**                  | `combining`           |
| **Required**              | No                    |
| **Additional properties** | Any type allowed      |
| **Defined in**            | #/definitions/IAction |

**Description:** Union type of all possible actions that can be performed in automations

| Any of(Option)                                                                 |
| ------------------------------------------------------------------------------ |
| [Create Database Record Action](#automations_items_actions_items_anyOf_i0)     |
| [Run JavaScript Code Action](#automations_items_actions_items_anyOf_i1)        |
| [Run TypeScript Code Action](#automations_items_actions_items_anyOf_i2)        |
| [Read Database Record Action](#automations_items_actions_items_anyOf_i3)       |
| [Get Company Information Action](#automations_items_actions_items_anyOf_i4)    |
| [Create Qonto Client Action](#automations_items_actions_items_anyOf_i5)        |
| [Update Notion Page Action](#automations_items_actions_items_anyOf_i6)         |
| [Send Email Action](#automations_items_actions_items_anyOf_i7)                 |
| [Create GoCardless Payment Action](#automations_items_actions_items_anyOf_i8)  |
| [List GoCardless Payments Action](#automations_items_actions_items_anyOf_i9)   |
| [Retrieve Qonto Attachment Action](#automations_items_actions_items_anyOf_i10) |

###### `0``0`1.1.1.1.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action`

**Title:** Create Database Record Action

|                           |                                           |
| ------------------------- | ----------------------------------------- |
| **Type**                  | `object`                                  |
| **Required**              | No                                        |
| **Additional properties** | Not allowed                               |
| **Defined in**            | #/definitions/ICreateRecordDatabaseAction |

**Description:** Creates a new record in the specified database table with the given fields

| Property                                                        | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [action](#automations_items_actions_items_anyOf_i0_action )   | No      | const  | No         | -          | -                 |
| + [fields](#automations_items_actions_items_anyOf_i0_fields )   | No      | object | No         | -          | -                 |
| + [name](#automations_items_actions_items_anyOf_i0_name )       | No      | string | No         | -          | -                 |
| + [service](#automations_items_actions_items_anyOf_i0_service ) | No      | const  | No         | -          | -                 |
| + [table](#automations_items_actions_items_anyOf_i0_table )     | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.1.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action > action`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"CreateRecord"`

###### `0``0`1.1.1.1.1.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action > fields`

|                           |                                                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                                     |
| **Required**              | Yes                                                                                                                          |
| **Additional properties** | [Each additional property must conform to the schema](#automations_items_actions_items_anyOf_i0_fields_additionalProperties) |

| Property                                                                     | Pattern | Type   | Deprecated | Definition | Title/Description |
| ---------------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [](#automations_items_actions_items_anyOf_i0_fields_additionalProperties ) | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.1.2.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action > fields > additionalProperties`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.1.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.1.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action > service`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Database"`

###### `0``0`1.1.1.1.1.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Database Record Action > table`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action`

**Title:** Run JavaScript Code Action

|                           |                                        |
| ------------------------- | -------------------------------------- |
| **Type**                  | `object`                               |
| **Required**              | No                                     |
| **Additional properties** | Not allowed                            |
| **Defined in**            | #/definitions/IRunJavascriptCodeAction |

**Description:** Executes JavaScript code with optional input and environment variables

| Property                                                        | Pattern | Type   | Deprecated | Definition                      | Title/Description |
| --------------------------------------------------------------- | ------- | ------ | ---------- | ------------------------------- | ----------------- |
| + [action](#automations_items_actions_items_anyOf_i1_action )   | No      | const  | No         | -                               | -                 |
| + [code](#automations_items_actions_items_anyOf_i1_code )       | No      | string | No         | -                               | -                 |
| - [env](#automations_items_actions_items_anyOf_i1_env )         | No      | object | No         | -                               | -                 |
| - [input](#automations_items_actions_items_anyOf_i1_input )     | No      | object | No         | In #/definitions/TemplateObject | -                 |
| + [name](#automations_items_actions_items_anyOf_i1_name )       | No      | string | No         | -                               | -                 |
| + [service](#automations_items_actions_items_anyOf_i1_service ) | No      | const  | No         | -                               | -                 |

###### `0``0`1.1.1.1.2.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > action`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"RunJavascript"`

###### `0``0`1.1.1.1.2.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > code`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.2.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > env`

|                           |                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                                  |
| **Required**              | No                                                                                                                        |
| **Additional properties** | [Each additional property must conform to the schema](#automations_items_actions_items_anyOf_i1_env_additionalProperties) |

| Property                                                                  | Pattern | Type   | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [](#automations_items_actions_items_anyOf_i1_env_additionalProperties ) | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.2.3.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > env > additionalProperties`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.2.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input`

|                           |                                                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                                    |
| **Required**              | No                                                                                                                          |
| **Additional properties** | [Each additional property must conform to the schema](#automations_items_actions_items_anyOf_i1_input_additionalProperties) |
| **Defined in**            | #/definitions/TemplateObject                                                                                                |

| Property                                                                    | Pattern | Type   | Deprecated | Definition                     | Title/Description |
| --------------------------------------------------------------------------- | ------- | ------ | ---------- | ------------------------------ | ----------------- |
| - [](#automations_items_actions_items_anyOf_i1_input_additionalProperties ) | No      | object | No         | In #/definitions/TemplateValue | -                 |

###### `0``0`1.1.1.1.2.4.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > TemplateValue`

|                           |                             |
| ------------------------- | --------------------------- |
| **Type**                  | `combining`                 |
| **Required**              | No                          |
| **Additional properties** | Any type allowed            |
| **Defined in**            | #/definitions/TemplateValue |

| Any of(Option)                                                                                  |
| ----------------------------------------------------------------------------------------------- |
| [item 0](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i0)         |
| [item 1](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i1)         |
| [item 2](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i2)         |
| [item 3](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i3)         |
| [TemplateObject](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i4) |
| [item 5](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i5)         |

###### `0``0`1.1.1.1.2.4.1.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 0`

|              |                   |
| ------------ | ----------------- |
| **Type**     | `array of string` |
| **Required** | No                |

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                                                                     | Description |
| --------------------------------------------------------------------------------------------------- | ----------- |
| [item 0 items](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i0_items) | -           |

###### `0``0`1.1.1.1.2.4.1.1.1. Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 0 > item 0 items

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.2.4.1.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 1`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                                                          | Pattern | Type   | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [number](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i1_number ) | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.2.4.1.2.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 1 > number`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.2.4.1.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 2`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                                                            | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [boolean](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i2_boolean ) | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.2.4.1.3.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 2 > boolean`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.2.4.1.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 3`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                                                      | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [json](#automations_items_actions_items_anyOf_i1_input_additionalProperties_anyOf_i3_json ) | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.2.4.1.4.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 3 > json`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.2.4.1.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > TemplateObject`

|                           |                                                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                                    |
| **Required**              | No                                                                                                                          |
| **Additional properties** | [Each additional property must conform to the schema](#automations_items_actions_items_anyOf_i1_input_additionalProperties) |
| **Same definition as**    | [input](#automations_items_actions_items_anyOf_i1_input)                                                                    |

###### `0``0`1.1.1.1.2.4.1.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > input > additionalProperties > anyOf > item 5`

|              |                             |
| ------------ | --------------------------- |
| **Type**     | `string, number or boolean` |
| **Required** | No                          |

###### `0``0`1.1.1.1.2.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.2.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run JavaScript Code Action > service`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Code"`

###### `0``0`1.1.1.1.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action`

**Title:** Run TypeScript Code Action

|                           |                                        |
| ------------------------- | -------------------------------------- |
| **Type**                  | `object`                               |
| **Required**              | No                                     |
| **Additional properties** | Not allowed                            |
| **Defined in**            | #/definitions/IRunTypescriptCodeAction |

**Description:** Executes TypeScript code with type checking and optional input

| Property                                                        | Pattern | Type   | Deprecated | Definition                                                        | Title/Description |
| --------------------------------------------------------------- | ------- | ------ | ---------- | ----------------------------------------------------------------- | ----------------- |
| + [action](#automations_items_actions_items_anyOf_i2_action )   | No      | const  | No         | -                                                                 | -                 |
| + [code](#automations_items_actions_items_anyOf_i2_code )       | No      | string | No         | -                                                                 | -                 |
| - [env](#automations_items_actions_items_anyOf_i2_env )         | No      | object | No         | -                                                                 | -                 |
| - [input](#automations_items_actions_items_anyOf_i2_input )     | No      | object | No         | Same as [input](#automations_items_actions_items_anyOf_i1_input ) | -                 |
| + [name](#automations_items_actions_items_anyOf_i2_name )       | No      | string | No         | -                                                                 | -                 |
| + [service](#automations_items_actions_items_anyOf_i2_service ) | No      | const  | No         | -                                                                 | -                 |

###### `0``0`1.1.1.1.3.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > action`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"RunTypescript"`

###### `0``0`1.1.1.1.3.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > code`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.3.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > env`

|                           |                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                                  |
| **Required**              | No                                                                                                                        |
| **Additional properties** | [Each additional property must conform to the schema](#automations_items_actions_items_anyOf_i2_env_additionalProperties) |

| Property                                                                  | Pattern | Type   | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [](#automations_items_actions_items_anyOf_i2_env_additionalProperties ) | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.3.3.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > env > additionalProperties`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.3.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > input`

|                           |                                                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                                    |
| **Required**              | No                                                                                                                          |
| **Additional properties** | [Each additional property must conform to the schema](#automations_items_actions_items_anyOf_i1_input_additionalProperties) |
| **Same definition as**    | [input](#automations_items_actions_items_anyOf_i1_input)                                                                    |

###### `0``0`1.1.1.1.3.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.3.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Run TypeScript Code Action > service`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Code"`

###### `0``0`1.1.1.1.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Read Database Record Action`

**Title:** Read Database Record Action

|                           |                                         |
| ------------------------- | --------------------------------------- |
| **Type**                  | `object`                                |
| **Required**              | No                                      |
| **Additional properties** | Not allowed                             |
| **Defined in**            | #/definitions/IReadRecordDatabaseAction |

**Description:** Retrieves a record from the specified database table by its ID

| Property                                                        | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [action](#automations_items_actions_items_anyOf_i3_action )   | No      | const  | No         | -          | -                 |
| + [id](#automations_items_actions_items_anyOf_i3_id )           | No      | string | No         | -          | -                 |
| + [name](#automations_items_actions_items_anyOf_i3_name )       | No      | string | No         | -          | -                 |
| + [service](#automations_items_actions_items_anyOf_i3_service ) | No      | const  | No         | -          | -                 |
| + [table](#automations_items_actions_items_anyOf_i3_table )     | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.4.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Read Database Record Action > action`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"ReadRecord"`

###### `0``0`1.1.1.1.4.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Read Database Record Action > id`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.4.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Read Database Record Action > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.4.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Read Database Record Action > service`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Database"`

###### `0``0`1.1.1.1.4.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Read Database Record Action > table`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Get Company Information Action`

**Title:** Get Company Information Action

|                           |                                        |
| ------------------------- | -------------------------------------- |
| **Type**                  | `object`                               |
| **Required**              | No                                     |
| **Additional properties** | Not allowed                            |
| **Defined in**            | #/definitions/IGetCompanyPappersAction |

**Description:** Retrieves detailed company information from Pappers using a SIREN number

| Property                                                                | Pattern | Type   | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [account](#automations_items_actions_items_anyOf_i4_account )         | No      | string | No         | -          | -                 |
| + [action](#automations_items_actions_items_anyOf_i4_action )           | No      | const  | No         | -          | -                 |
| + [integration](#automations_items_actions_items_anyOf_i4_integration ) | No      | const  | No         | -          | -                 |
| + [name](#automations_items_actions_items_anyOf_i4_name )               | No      | string | No         | -          | -                 |
| + [siret](#automations_items_actions_items_anyOf_i4_siret )             | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.5.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Get Company Information Action > account`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.5.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Get Company Information Action > action`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"GetCompany"`

###### `0``0`1.1.1.1.5.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Get Company Information Action > integration`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Pappers"`

###### `0``0`1.1.1.1.5.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Get Company Information Action > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.5.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Get Company Information Action > siret`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action`

**Title:** Create Qonto Client Action

|                           |                                        |
| ------------------------- | -------------------------------------- |
| **Type**                  | `object`                               |
| **Required**              | No                                     |
| **Additional properties** | Not allowed                            |
| **Defined in**            | #/definitions/ICreateClientQontoAction |

**Description:** Creates a new client in Qonto with the specified details

| Property                                                                | Pattern | Type   | Deprecated | Definition                         | Title/Description |
| ----------------------------------------------------------------------- | ------- | ------ | ---------- | ---------------------------------- | ----------------- |
| + [account](#automations_items_actions_items_anyOf_i5_account )         | No      | string | No         | -                                  | -                 |
| + [action](#automations_items_actions_items_anyOf_i5_action )           | No      | const  | No         | -                                  | -                 |
| + [client](#automations_items_actions_items_anyOf_i5_client )           | No      | object | No         | In #/definitions/QontoCreateClient | -                 |
| + [integration](#automations_items_actions_items_anyOf_i5_integration ) | No      | const  | No         | -                                  | -                 |
| + [name](#automations_items_actions_items_anyOf_i5_name )               | No      | string | No         | -                                  | -                 |

###### `0``0`1.1.1.1.6.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > account`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > action`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"CreateClient"`

###### `0``0`1.1.1.1.6.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client`

|                           |                                 |
| ------------------------- | ------------------------------- |
| **Type**                  | `object`                        |
| **Required**              | Yes                             |
| **Additional properties** | Not allowed                     |
| **Defined in**            | #/definitions/QontoCreateClient |

| Property                                                                                                   | Pattern | Type   | Deprecated | Definition                            | Title/Description |
| ---------------------------------------------------------------------------------------------------------- | ------- | ------ | ---------- | ------------------------------------- | ----------------- |
| + [address](#automations_items_actions_items_anyOf_i5_client_address )                                     | No      | string | No         | -                                     | -                 |
| - [billing_address](#automations_items_actions_items_anyOf_i5_client_billing_address )                     | No      | object | No         | In #/definitions/QontoBillingAddress  | -                 |
| + [city](#automations_items_actions_items_anyOf_i5_client_city )                                           | No      | string | No         | -                                     | -                 |
| + [country_code](#automations_items_actions_items_anyOf_i5_client_country_code )                           | No      | string | No         | -                                     | -                 |
| + [currency](#automations_items_actions_items_anyOf_i5_client_currency )                                   | No      | string | No         | -                                     | -                 |
| - [delivery_address](#automations_items_actions_items_anyOf_i5_client_delivery_address )                   | No      | object | No         | In #/definitions/QontoDeliveryAddress | -                 |
| - [email](#automations_items_actions_items_anyOf_i5_client_email )                                         | No      | string | No         | -                                     | -                 |
| - [first_name](#automations_items_actions_items_anyOf_i5_client_first_name )                               | No      | string | No         | -                                     | -                 |
| - [last_name](#automations_items_actions_items_anyOf_i5_client_last_name )                                 | No      | string | No         | -                                     | -                 |
| + [locale](#automations_items_actions_items_anyOf_i5_client_locale )                                       | No      | string | No         | -                                     | -                 |
| - [name](#automations_items_actions_items_anyOf_i5_client_name )                                           | No      | string | No         | -                                     | -                 |
| - [tax_identification_number](#automations_items_actions_items_anyOf_i5_client_tax_identification_number ) | No      | string | No         | -                                     | -                 |
| + [type](#automations_items_actions_items_anyOf_i5_client_type )                                           | No      | string | No         | -                                     | -                 |
| - [vat_number](#automations_items_actions_items_anyOf_i5_client_vat_number )                               | No      | string | No         | -                                     | -                 |
| + [zip_code](#automations_items_actions_items_anyOf_i5_client_zip_code )                                   | No      | string | No         | -                                     | -                 |

###### `0``0`1.1.1.1.6.3.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > address`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > billing_address`

|                           |                                   |
| ------------------------- | --------------------------------- |
| **Type**                  | `object`                          |
| **Required**              | No                                |
| **Additional properties** | Not allowed                       |
| **Defined in**            | #/definitions/QontoBillingAddress |

| Property                                                                                             | Pattern | Type   | Deprecated | Definition | Title/Description |
| ---------------------------------------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [city](#automations_items_actions_items_anyOf_i5_client_billing_address_city )                     | No      | string | No         | -          | -                 |
| + [country_code](#automations_items_actions_items_anyOf_i5_client_billing_address_country_code )     | No      | string | No         | -          | -                 |
| + [province_code](#automations_items_actions_items_anyOf_i5_client_billing_address_province_code )   | No      | string | No         | -          | -                 |
| + [street_address](#automations_items_actions_items_anyOf_i5_client_billing_address_street_address ) | No      | string | No         | -          | -                 |
| + [zip_code](#automations_items_actions_items_anyOf_i5_client_billing_address_zip_code )             | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.6.3.2.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > billing_address > city`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.2.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > billing_address > country_code`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.2.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > billing_address > province_code`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.2.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > billing_address > street_address`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.2.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > billing_address > zip_code`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > city`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > country_code`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > currency`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > delivery_address`

|                           |                                    |
| ------------------------- | ---------------------------------- |
| **Type**                  | `object`                           |
| **Required**              | No                                 |
| **Additional properties** | Not allowed                        |
| **Defined in**            | #/definitions/QontoDeliveryAddress |

| Property                                                                                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [city](#automations_items_actions_items_anyOf_i5_client_delivery_address_city )                     | No      | string | No         | -          | -                 |
| + [country_code](#automations_items_actions_items_anyOf_i5_client_delivery_address_country_code )     | No      | string | No         | -          | -                 |
| + [province_code](#automations_items_actions_items_anyOf_i5_client_delivery_address_province_code )   | No      | string | No         | -          | -                 |
| + [street_address](#automations_items_actions_items_anyOf_i5_client_delivery_address_street_address ) | No      | string | No         | -          | -                 |
| + [zip_code](#automations_items_actions_items_anyOf_i5_client_delivery_address_zip_code )             | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.6.3.6.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > delivery_address > city`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.6.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > delivery_address > country_code`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.6.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > delivery_address > province_code`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.6.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > delivery_address > street_address`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.6.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > delivery_address > zip_code`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.7. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > email`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.6.3.8. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > first_name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.6.3.9. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > last_name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.6.3.10. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > locale`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.11. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.6.3.12. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > tax_identification_number`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.6.3.13. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > type`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.3.14. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > vat_number`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.6.3.15. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > client > zip_code`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.6.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > integration`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Qonto"`

###### `0``0`1.1.1.1.6.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create Qonto Client Action > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.7. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action`

**Title:** Update Notion Page Action

|                           |                                       |
| ------------------------- | ------------------------------------- |
| **Type**                  | `object`                              |
| **Required**              | No                                    |
| **Additional properties** | Not allowed                           |
| **Defined in**            | #/definitions/IUpdatePageNotionAction |

**Description:** Updates the properties of a Notion page in the specified database

| Property                                                                | Pattern | Type   | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [account](#automations_items_actions_items_anyOf_i6_account )         | No      | string | No         | -          | -                 |
| + [action](#automations_items_actions_items_anyOf_i6_action )           | No      | const  | No         | -          | -                 |
| + [id](#automations_items_actions_items_anyOf_i6_id )                   | No      | string | No         | -          | -                 |
| + [integration](#automations_items_actions_items_anyOf_i6_integration ) | No      | const  | No         | -          | -                 |
| + [name](#automations_items_actions_items_anyOf_i6_name )               | No      | string | No         | -          | -                 |
| + [page](#automations_items_actions_items_anyOf_i6_page )               | No      | object | No         | -          | -                 |
| + [table](#automations_items_actions_items_anyOf_i6_table )             | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.7.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > account`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.7.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > action`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"UpdatePage"`

###### `0``0`1.1.1.1.7.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > id`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.7.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > integration`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Notion"`

###### `0``0`1.1.1.1.7.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.7.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > page`

|                           |                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                                   |
| **Required**              | Yes                                                                                                                        |
| **Additional properties** | [Each additional property must conform to the schema](#automations_items_actions_items_anyOf_i6_page_additionalProperties) |

| Property                                                                   | Pattern | Type   | Deprecated | Definition | Title/Description |
| -------------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [](#automations_items_actions_items_anyOf_i6_page_additionalProperties ) | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.7.6.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > page > additionalProperties`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.7.7. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Update Notion Page Action > table`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.8. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action`

**Title:** Send Email Action

|                           |                                          |
| ------------------------- | ---------------------------------------- |
| **Type**                  | `object`                                 |
| **Required**              | No                                       |
| **Additional properties** | Not allowed                              |
| **Defined in**            | #/definitions/ISendEmailGoogleMailAction |

**Description:** Sends an email using Google Mail with specified recipients, subject, and content

| Property                                                                | Pattern | Type   | Deprecated | Definition                              | Title/Description |
| ----------------------------------------------------------------------- | ------- | ------ | ---------- | --------------------------------------- | ----------------- |
| + [account](#automations_items_actions_items_anyOf_i7_account )         | No      | string | No         | -                                       | -                 |
| + [action](#automations_items_actions_items_anyOf_i7_action )           | No      | const  | No         | -                                       | -                 |
| + [email](#automations_items_actions_items_anyOf_i7_email )             | No      | object | No         | In #/definitions/GoogleMailEmailOptions | -                 |
| + [integration](#automations_items_actions_items_anyOf_i7_integration ) | No      | const  | No         | -                                       | -                 |
| + [name](#automations_items_actions_items_anyOf_i7_name )               | No      | string | No         | -                                       | -                 |

###### `0``0`1.1.1.1.8.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > account`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.8.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > action`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"SendEmail"`

###### `0``0`1.1.1.1.8.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email`

|                           |                                      |
| ------------------------- | ------------------------------------ |
| **Type**                  | `object`                             |
| **Required**              | Yes                                  |
| **Additional properties** | Not allowed                          |
| **Defined in**            | #/definitions/GoogleMailEmailOptions |

| Property                                                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [bcc](#automations_items_actions_items_anyOf_i7_email_bcc )         | No      | string | No         | -          | -                 |
| - [cc](#automations_items_actions_items_anyOf_i7_email_cc )           | No      | string | No         | -          | -                 |
| - [from](#automations_items_actions_items_anyOf_i7_email_from )       | No      | string | No         | -          | -                 |
| - [html](#automations_items_actions_items_anyOf_i7_email_html )       | No      | string | No         | -          | -                 |
| - [subject](#automations_items_actions_items_anyOf_i7_email_subject ) | No      | string | No         | -          | -                 |
| - [text](#automations_items_actions_items_anyOf_i7_email_text )       | No      | string | No         | -          | -                 |
| + [to](#automations_items_actions_items_anyOf_i7_email_to )           | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.8.3.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > bcc`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.8.3.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > cc`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.8.3.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > from`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.8.3.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > html`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.8.3.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > subject`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.8.3.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > text`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.8.3.7. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > email > to`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.8.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > integration`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"GoogleMail"`

###### `0``0`1.1.1.1.8.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Send Email Action > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.9. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action`

**Title:** Create GoCardless Payment Action

|                           |                                              |
| ------------------------- | -------------------------------------------- |
| **Type**                  | `object`                                     |
| **Required**              | No                                           |
| **Additional properties** | Not allowed                                  |
| **Defined in**            | #/definitions/ICreatePaymentGoCardlessAction |

**Description:** Creates a new payment in GoCardless with the specified details

| Property                                                                | Pattern | Type   | Deprecated | Definition                               | Title/Description |
| ----------------------------------------------------------------------- | ------- | ------ | ---------- | ---------------------------------------- | ----------------- |
| + [account](#automations_items_actions_items_anyOf_i8_account )         | No      | string | No         | -                                        | -                 |
| + [action](#automations_items_actions_items_anyOf_i8_action )           | No      | const  | No         | -                                        | -                 |
| + [integration](#automations_items_actions_items_anyOf_i8_integration ) | No      | const  | No         | -                                        | -                 |
| + [name](#automations_items_actions_items_anyOf_i8_name )               | No      | string | No         | -                                        | -                 |
| + [payment](#automations_items_actions_items_anyOf_i8_payment )         | No      | object | No         | In #/definitions/GoCardlessCreatePayment | -                 |

###### `0``0`1.1.1.1.9.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > account`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.9.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > action`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"CreatePayment"`

###### `0``0`1.1.1.1.9.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > integration`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"GoCardless"`

###### `0``0`1.1.1.1.9.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.9.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment`

|                           |                                       |
| ------------------------- | ------------------------------------- |
| **Type**                  | `object`                              |
| **Required**              | Yes                                   |
| **Additional properties** | Not allowed                           |
| **Defined in**            | #/definitions/GoCardlessCreatePayment |

| Property                                                                                    | Pattern | Type    | Deprecated | Definition                             | Title/Description |
| ------------------------------------------------------------------------------------------- | ------- | ------- | ---------- | -------------------------------------- | ----------------- |
| + [amount](#automations_items_actions_items_anyOf_i8_payment_amount )                       | No      | number  | No         | -                                      | -                 |
| - [charge_date](#automations_items_actions_items_anyOf_i8_payment_charge_date )             | No      | string  | No         | -                                      | -                 |
| + [currency](#automations_items_actions_items_anyOf_i8_payment_currency )                   | No      | string  | No         | -                                      | -                 |
| - [description](#automations_items_actions_items_anyOf_i8_payment_description )             | No      | string  | No         | -                                      | -                 |
| + [mandate](#automations_items_actions_items_anyOf_i8_payment_mandate )                     | No      | string  | No         | -                                      | -                 |
| - [metadata](#automations_items_actions_items_anyOf_i8_payment_metadata )                   | No      | object  | No         | In #/definitions/Record`0` | -                 |
| - [reference](#automations_items_actions_items_anyOf_i8_payment_reference )                 | No      | string  | No         | -                                      | -                 |
| - [retry_if_possible](#automations_items_actions_items_anyOf_i8_payment_retry_if_possible ) | No      | boolean | No         | -                                      | -                 |

###### `0``0`1.1.1.1.9.5.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > amount`

|              |          |
| ------------ | -------- |
| **Type**     | `number` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.9.5.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > charge_date`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.9.5.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > currency`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.9.5.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > description`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.9.5.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > mandate`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.9.5.6. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > metadata`

|                           |                                     |
| ------------------------- | ----------------------------------- |
| **Type**                  | `object`                            |
| **Required**              | No                                  |
| **Additional properties** | Any type allowed                    |
| **Defined in**            | #/definitions/Record`0` |

###### `0``0`1.1.1.1.9.5.7. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > reference`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.9.5.8. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Create GoCardless Payment Action > payment > retry_if_possible`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`1.1.1.1.10. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action`

**Title:** List GoCardless Payments Action

|                           |                                             |
| ------------------------- | ------------------------------------------- |
| **Type**                  | `object`                                    |
| **Required**              | No                                          |
| **Additional properties** | Not allowed                                 |
| **Defined in**            | #/definitions/IListPaymentsGoCardlessAction |

**Description:** Retrieves a list of payments from GoCardless based on specified filters

| Property                                                                | Pattern | Type   | Deprecated | Definition                             | Title/Description |
| ----------------------------------------------------------------------- | ------- | ------ | ---------- | -------------------------------------- | ----------------- |
| + [account](#automations_items_actions_items_anyOf_i9_account )         | No      | string | No         | -                                      | -                 |
| + [action](#automations_items_actions_items_anyOf_i9_action )           | No      | const  | No         | -                                      | -                 |
| + [integration](#automations_items_actions_items_anyOf_i9_integration ) | No      | const  | No         | -                                      | -                 |
| + [name](#automations_items_actions_items_anyOf_i9_name )               | No      | string | No         | -                                      | -                 |
| + [params](#automations_items_actions_items_anyOf_i9_params )           | No      | object | No         | In #/definitions/GoCardlessListPayment | -                 |

###### `0``0`1.1.1.1.10.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > account`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.10.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > action`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"ListPayments"`

###### `0``0`1.1.1.1.10.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > integration`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"GoCardless"`

###### `0``0`1.1.1.1.10.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.10.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > params`

|                           |                                     |
| ------------------------- | ----------------------------------- |
| **Type**                  | `object`                            |
| **Required**              | Yes                                 |
| **Additional properties** | Not allowed                         |
| **Defined in**            | #/definitions/GoCardlessListPayment |

| Property                                                               | Pattern | Type   | Deprecated | Definition | Title/Description |
| ---------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [after](#automations_items_actions_items_anyOf_i9_params_after )     | No      | string | No         | -          | -                 |
| - [before](#automations_items_actions_items_anyOf_i9_params_before )   | No      | string | No         | -          | -                 |
| - [limit](#automations_items_actions_items_anyOf_i9_params_limit )     | No      | number | No         | -          | -                 |
| - [mandate](#automations_items_actions_items_anyOf_i9_params_mandate ) | No      | string | No         | -          | -                 |
| - [status](#automations_items_actions_items_anyOf_i9_params_status )   | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.10.5.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > params > after`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.10.5.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > params > before`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.10.5.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > params > limit`

|              |          |
| ------------ | -------- |
| **Type**     | `number` |
| **Required** | No       |

###### `0``0`1.1.1.1.10.5.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > params > mandate`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.10.5.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > List GoCardless Payments Action > params > status`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.1.1.11. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Retrieve Qonto Attachment Action`

**Title:** Retrieve Qonto Attachment Action

|                           |                                              |
| ------------------------- | -------------------------------------------- |
| **Type**                  | `object`                                     |
| **Required**              | No                                           |
| **Additional properties** | Not allowed                                  |
| **Defined in**            | #/definitions/IRetrieveAttachmentQontoAction |

**Description:** Retrieves a specific attachment from Qonto using its ID

| Property                                                                   | Pattern | Type   | Deprecated | Definition | Title/Description |
| -------------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [account](#automations_items_actions_items_anyOf_i10_account )           | No      | string | No         | -          | -                 |
| + [action](#automations_items_actions_items_anyOf_i10_action )             | No      | const  | No         | -          | -                 |
| + [attachmentId](#automations_items_actions_items_anyOf_i10_attachmentId ) | No      | string | No         | -          | -                 |
| + [integration](#automations_items_actions_items_anyOf_i10_integration )   | No      | const  | No         | -          | -                 |
| + [name](#automations_items_actions_items_anyOf_i10_name )                 | No      | string | No         | -          | -                 |

###### `0``0`1.1.1.1.11.1. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Retrieve Qonto Attachment Action > account`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.11.2. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Retrieve Qonto Attachment Action > action`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"RetrieveAttachment"`

###### `0``0`1.1.1.1.11.3. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Retrieve Qonto Attachment Action > attachmentId`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.1.1.11.4. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Retrieve Qonto Attachment Action > integration`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Qonto"`

###### `0``0`1.1.1.1.11.5. Property `Engine configuration > automations > Automation configuration > actions > Action types > anyOf > Retrieve Qonto Attachment Action > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

#### `0``0`1.1.2. Property `Engine configuration > automations > Automation configuration > description`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

#### `0``0`1.1.3. Property `Engine configuration > automations > Automation configuration > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

#### `0``0`1.1.4. Property `Engine configuration > automations > Automation configuration > summary`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

#### `0``0`1.1.5. Property `Engine configuration > automations > Automation configuration > trigger`

**Title:** Trigger types

|                           |                        |
| ------------------------- | ---------------------- |
| **Type**                  | `combining`            |
| **Required**              | Yes                    |
| **Additional properties** | Any type allowed       |
| **Defined in**            | #/definitions/ITrigger |

**Description:** The event or condition that starts the automation

| Any of(Option)                                                        |
| --------------------------------------------------------------------- |
| [IApiCalledHttpTrigger](#automations_items_trigger_anyOf_i0)          |
| [IRecordCreatedDatabaseTrigger](#automations_items_trigger_anyOf_i1)  |
| [IWebhookCalledHttpTrigger](#automations_items_trigger_anyOf_i2)      |
| [IPageCreatedNotionTrigger](#automations_items_trigger_anyOf_i3)      |
| [ICronTimeTickedScheduleTrigger](#automations_items_trigger_anyOf_i4) |
| [IInviteeCreatedTrigger](#automations_items_trigger_anyOf_i5)         |

##### `0``0`1.1.5.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > IApiCalledHttpTrigger`

|                           |                                     |
| ------------------------- | ----------------------------------- |
| **Type**                  | `object`                            |
| **Required**              | No                                  |
| **Additional properties** | Not allowed                         |
| **Defined in**            | #/definitions/IApiCalledHttpTrigger |

| Property                                                  | Pattern | Type   | Deprecated | Definition                                                        | Title/Description |
| --------------------------------------------------------- | ------- | ------ | ---------- | ----------------------------------------------------------------- | ----------------- |
| - [auth](#automations_items_trigger_anyOf_i0_auth )       | No      | const  | No         | -                                                                 | -                 |
| + [event](#automations_items_trigger_anyOf_i0_event )     | No      | const  | No         | -                                                                 | -                 |
| - [input](#automations_items_trigger_anyOf_i0_input )     | No      | object | No         | In #/definitions/JSONSchema                                       | -                 |
| - [output](#automations_items_trigger_anyOf_i0_output )   | No      | object | No         | Same as [input](#automations_items_actions_items_anyOf_i1_input ) | -                 |
| + [path](#automations_items_trigger_anyOf_i0_path )       | No      | string | No         | -                                                                 | -                 |
| + [service](#automations_items_trigger_anyOf_i0_service ) | No      | const  | No         | -                                                                 | -                 |

###### `0``0`1.1.5.1.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > auth`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | No      |

Specific value: `"ApiKey"`

###### `0``0`1.1.5.1.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > event`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"ApiCalled"`

###### `0``0`1.1.5.1.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input`

|                           |                          |
| ------------------------- | ------------------------ |
| **Type**                  | `object`                 |
| **Required**              | No                       |
| **Additional properties** | Not allowed              |
| **Defined in**            | #/definitions/JSONSchema |

| Property                                                                                  | Pattern | Type             | Deprecated | Definition                                                  | Title/Description |
| ----------------------------------------------------------------------------------------- | ------- | ---------------- | ---------- | ----------------------------------------------------------- | ----------------- |
| - [additionalProperties](#automations_items_trigger_anyOf_i0_input_additionalProperties ) | No      | boolean          | No         | -                                                           | -                 |
| - [enum](#automations_items_trigger_anyOf_i0_input_enum )                                 | No      | array of string  | No         | -                                                           | -                 |
| - [items](#automations_items_trigger_anyOf_i0_input_items )                               | No      | object           | No         | Same as [input](#automations_items_trigger_anyOf_i0_input ) | -                 |
| - [oneOf](#automations_items_trigger_anyOf_i0_input_oneOf )                               | No      | array            | No         | -                                                           | -                 |
| - [properties](#automations_items_trigger_anyOf_i0_input_properties )                     | No      | object           | No         | In #/definitions/JSONSchemaProperties                       | -                 |
| - [required](#automations_items_trigger_anyOf_i0_input_required )                         | No      | array of string  | No         | -                                                           | -                 |
| - [type](#automations_items_trigger_anyOf_i0_input_type )                                 | No      | enum (of string) | No         | -                                                           | -                 |

###### `0``0`1.1.5.1.3.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > additionalProperties`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`1.1.5.1.3.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > enum`

|              |                   |
| ------------ | ----------------- |
| **Type**     | `array of string` |
| **Required** | No                |

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                                    | Description |
| ------------------------------------------------------------------ | ----------- |
| [enum items](#automations_items_trigger_anyOf_i0_input_enum_items) | -           |

###### `0``0`1.1.5.1.3.2.1. Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > enum > enum items

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.5.1.3.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > items`

|                           |                                                    |
| ------------------------- | -------------------------------------------------- |
| **Type**                  | `object`                                           |
| **Required**              | No                                                 |
| **Additional properties** | Not allowed                                        |
| **Same definition as**    | [input](#automations_items_trigger_anyOf_i0_input) |

###### `0``0`1.1.5.1.3.4. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > oneOf`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                                     | Description |
| ------------------------------------------------------------------- | ----------- |
| [JSONSchema](#automations_items_trigger_anyOf_i0_input_oneOf_items) | -           |

###### `0``0`1.1.5.1.3.4.1. Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > oneOf > JSONSchema

|                           |                                                    |
| ------------------------- | -------------------------------------------------- |
| **Type**                  | `object`                                           |
| **Required**              | No                                                 |
| **Additional properties** | Not allowed                                        |
| **Same definition as**    | [input](#automations_items_trigger_anyOf_i0_input) |

###### `0``0`1.1.5.1.3.5. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > properties`

|                           |                                                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                                         |
| **Required**              | No                                                                                                                               |
| **Additional properties** | [Each additional property must conform to the schema](#automations_items_trigger_anyOf_i0_input_properties_additionalProperties) |
| **Defined in**            | #/definitions/JSONSchemaProperties                                                                                               |

| Property                                                                         | Pattern | Type   | Deprecated | Definition                                                  | Title/Description |
| -------------------------------------------------------------------------------- | ------- | ------ | ---------- | ----------------------------------------------------------- | ----------------- |
| - [](#automations_items_trigger_anyOf_i0_input_properties_additionalProperties ) | No      | object | No         | Same as [input](#automations_items_trigger_anyOf_i0_input ) | -                 |

###### `0``0`1.1.5.1.3.5.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > properties > JSONSchema`

|                           |                                                    |
| ------------------------- | -------------------------------------------------- |
| **Type**                  | `object`                                           |
| **Required**              | No                                                 |
| **Additional properties** | Not allowed                                        |
| **Same definition as**    | [input](#automations_items_trigger_anyOf_i0_input) |

###### `0``0`1.1.5.1.3.6. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > required`

|              |                   |
| ------------ | ----------------- |
| **Type**     | `array of string` |
| **Required** | No                |

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                                            | Description |
| -------------------------------------------------------------------------- | ----------- |
| [required items](#automations_items_trigger_anyOf_i0_input_required_items) | -           |

###### `0``0`1.1.5.1.3.6.1. Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > required > required items

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`1.1.5.1.3.7. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > input > type`

|              |                    |
| ------------ | ------------------ |
| **Type**     | `enum (of string)` |
| **Required** | No                 |

Must be one of:
* "array"
* "boolean"
* "number"
* "object"
* "string"

###### `0``0`1.1.5.1.4. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > output`

|                           |                                                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                                    |
| **Required**              | No                                                                                                                          |
| **Additional properties** | [Each additional property must conform to the schema](#automations_items_actions_items_anyOf_i1_input_additionalProperties) |
| **Same definition as**    | [input](#automations_items_actions_items_anyOf_i1_input)                                                                    |

###### `0``0`1.1.5.1.5. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > path`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.5.1.6. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 0 > service`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Http"`

##### `0``0`1.1.5.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > IRecordCreatedDatabaseTrigger`

|                           |                                             |
| ------------------------- | ------------------------------------------- |
| **Type**                  | `object`                                    |
| **Required**              | No                                          |
| **Additional properties** | Not allowed                                 |
| **Defined in**            | #/definitions/IRecordCreatedDatabaseTrigger |

| Property                                                  | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [event](#automations_items_trigger_anyOf_i1_event )     | No      | const  | No         | -          | -                 |
| + [service](#automations_items_trigger_anyOf_i1_service ) | No      | const  | No         | -          | -                 |
| + [table](#automations_items_trigger_anyOf_i1_table )     | No      | string | No         | -          | -                 |

###### `0``0`1.1.5.2.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 1 > event`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"RecordCreated"`

###### `0``0`1.1.5.2.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 1 > service`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Database"`

###### `0``0`1.1.5.2.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 1 > table`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`1.1.5.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > IWebhookCalledHttpTrigger`

|                           |                                         |
| ------------------------- | --------------------------------------- |
| **Type**                  | `object`                                |
| **Required**              | No                                      |
| **Additional properties** | Not allowed                             |
| **Defined in**            | #/definitions/IWebhookCalledHttpTrigger |

| Property                                                  | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [auth](#automations_items_trigger_anyOf_i2_auth )       | No      | const  | No         | -          | -                 |
| + [event](#automations_items_trigger_anyOf_i2_event )     | No      | const  | No         | -          | -                 |
| + [path](#automations_items_trigger_anyOf_i2_path )       | No      | string | No         | -          | -                 |
| + [service](#automations_items_trigger_anyOf_i2_service ) | No      | const  | No         | -          | -                 |

###### `0``0`1.1.5.3.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 2 > auth`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | No      |

Specific value: `"ApiKey"`

###### `0``0`1.1.5.3.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 2 > event`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"WebhookCalled"`

###### `0``0`1.1.5.3.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 2 > path`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.5.3.4. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 2 > service`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Http"`

##### `0``0`1.1.5.4. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > IPageCreatedNotionTrigger`

|                           |                                         |
| ------------------------- | --------------------------------------- |
| **Type**                  | `object`                                |
| **Required**              | No                                      |
| **Additional properties** | Not allowed                             |
| **Defined in**            | #/definitions/IPageCreatedNotionTrigger |

| Property                                                          | Pattern | Type   | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [account](#automations_items_trigger_anyOf_i3_account )         | No      | string | No         | -          | -                 |
| + [event](#automations_items_trigger_anyOf_i3_event )             | No      | const  | No         | -          | -                 |
| + [integration](#automations_items_trigger_anyOf_i3_integration ) | No      | const  | No         | -          | -                 |
| + [table](#automations_items_trigger_anyOf_i3_table )             | No      | string | No         | -          | -                 |

###### `0``0`1.1.5.4.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 3 > account`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.5.4.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 3 > event`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"TablePageCreated"`

###### `0``0`1.1.5.4.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 3 > integration`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Notion"`

###### `0``0`1.1.5.4.4. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 3 > table`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`1.1.5.5. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > ICronTimeTickedScheduleTrigger`

|                           |                                              |
| ------------------------- | -------------------------------------------- |
| **Type**                  | `object`                                     |
| **Required**              | No                                           |
| **Additional properties** | Not allowed                                  |
| **Defined in**            | #/definitions/ICronTimeTickedScheduleTrigger |

| Property                                                    | Pattern | Type   | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [cronTime](#automations_items_trigger_anyOf_i4_cronTime ) | No      | string | No         | -          | -                 |
| + [event](#automations_items_trigger_anyOf_i4_event )       | No      | const  | No         | -          | -                 |
| + [service](#automations_items_trigger_anyOf_i4_service )   | No      | const  | No         | -          | -                 |

###### `0``0`1.1.5.5.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 4 > cronTime`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.5.5.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 4 > event`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"CronTimeTicked"`

###### `0``0`1.1.5.5.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 4 > service`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Schedule"`

##### `0``0`1.1.5.6. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > IInviteeCreatedTrigger`

|                           |                                      |
| ------------------------- | ------------------------------------ |
| **Type**                  | `object`                             |
| **Required**              | No                                   |
| **Additional properties** | Not allowed                          |
| **Defined in**            | #/definitions/IInviteeCreatedTrigger |

| Property                                                          | Pattern | Type   | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [account](#automations_items_trigger_anyOf_i5_account )         | No      | string | No         | -          | -                 |
| + [event](#automations_items_trigger_anyOf_i5_event )             | No      | const  | No         | -          | -                 |
| + [integration](#automations_items_trigger_anyOf_i5_integration ) | No      | const  | No         | -          | -                 |

###### `0``0`1.1.5.6.1. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 5 > account`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`1.1.5.6.2. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 5 > event`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"InviteeCreated"`

###### `0``0`1.1.5.6.3. Property `Engine configuration > automations > Automation configuration > trigger > anyOf > item 5 > integration`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Calendly"`

## `0``0`2. Property `Engine configuration > buckets`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** This is the list of buckets of the app.

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be | Description |
| ------------------------------- | ----------- |
| [BucketConfig](#buckets_items)  | -           |

### `0``0`2.1. Engine configuration > buckets > BucketConfig

|                           |                            |
| ------------------------- | -------------------------- |
| **Type**                  | `object`                   |
| **Required**              | No                         |
| **Additional properties** | Not allowed                |
| **Defined in**            | #/definitions/BucketConfig |

| Property                       | Pattern | Type   | Deprecated | Definition | Title/Description |
| ------------------------------ | ------- | ------ | ---------- | ---------- | ----------------- |
| + [name](#buckets_items_name ) | No      | string | No         | -          | -                 |

#### `0``0`2.1.1. Property `Engine configuration > buckets > buckets items > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

## `0``0`3. Property `Engine configuration > database`

|                           |                              |
| ------------------------- | ---------------------------- |
| **Type**                  | `object`                     |
| **Required**              | No                           |
| **Additional properties** | Not allowed                  |
| **Defined in**            | #/definitions/DatabaseConfig |

**Description:** Configuration for the database connection

| Property                      | Pattern | Type             | Deprecated | Definition                          | Title/Description |
| ----------------------------- | ------- | ---------------- | ---------- | ----------------------------------- | ----------------- |
| + [driver](#database_driver ) | No      | enum (of string) | No         | In #/definitions/DatabaseDriverName | -                 |
| + [url](#database_url )       | No      | string           | No         | -                                   | -                 |

### `0``0`3.1. Property `Engine configuration > database > driver`

|                |                                  |
| -------------- | -------------------------------- |
| **Type**       | `enum (of string)`               |
| **Required**   | Yes                              |
| **Defined in** | #/definitions/DatabaseDriverName |

Must be one of:
* "PostgreSQL"
* "SQLite"

### `0``0`3.2. Property `Engine configuration > database > url`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

## `0``0`4. Property `Engine configuration > description`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

**Description:** This is the description of the app.

## `0``0`5. Property `Engine configuration > engine`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

**Description:** This is the version of the engine.

## `0``0`6. Property `Engine configuration > forms`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** This is the list of forms of the app.

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be | Description |
| ------------------------------- | ----------- |
| [FormConfig](#forms_items)      | -           |

### `0``0`6.1. Engine configuration > forms > FormConfig

|                           |                          |
| ------------------------- | ------------------------ |
| **Type**                  | `object`                 |
| **Required**              | No                       |
| **Additional properties** | Not allowed              |
| **Defined in**            | #/definitions/FormConfig |

| Property                                         | Pattern | Type   | Deprecated | Definition | Title/Description |
| ------------------------------------------------ | ------- | ------ | ---------- | ---------- | ----------------- |
| - [description](#forms_items_description )       | No      | string | No         | -          | -                 |
| + [inputs](#forms_items_inputs )                 | No      | array  | No         | -          | -                 |
| + [name](#forms_items_name )                     | No      | string | No         | -          | -                 |
| + [path](#forms_items_path )                     | No      | string | No         | -          | -                 |
| - [submitLabel](#forms_items_submitLabel )       | No      | string | No         | -          | -                 |
| - [successMessage](#forms_items_successMessage ) | No      | string | No         | -          | -                 |
| + [table](#forms_items_table )                   | No      | string | No         | -          | -                 |
| - [title](#forms_items_title )                   | No      | string | No         | -          | -                 |

#### `0``0`6.1.1. Property `Engine configuration > forms > forms items > description`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

#### `0``0`6.1.2. Property `Engine configuration > forms > forms items > inputs`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | Yes     |

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be          | Description |
| ---------------------------------------- | ----------- |
| [InputConfig](#forms_items_inputs_items) | -           |

##### `0``0`6.1.2.1. Engine configuration > forms > forms items > inputs > InputConfig

|                           |                           |
| ------------------------- | ------------------------- |
| **Type**                  | `object`                  |
| **Required**              | No                        |
| **Additional properties** | Not allowed               |
| **Defined in**            | #/definitions/InputConfig |

| Property                                                | Pattern | Type    | Deprecated | Definition | Title/Description |
| ------------------------------------------------------- | ------- | ------- | ---------- | ---------- | ----------------- |
| - [description](#forms_items_inputs_items_description ) | No      | string  | No         | -          | -                 |
| + [field](#forms_items_inputs_items_field )             | No      | string  | No         | -          | -                 |
| - [label](#forms_items_inputs_items_label )             | No      | string  | No         | -          | -                 |
| - [maxLength](#forms_items_inputs_items_maxLength )     | No      | number  | No         | -          | -                 |
| - [minLength](#forms_items_inputs_items_minLength )     | No      | number  | No         | -          | -                 |
| - [placeholder](#forms_items_inputs_items_placeholder ) | No      | string  | No         | -          | -                 |
| - [required](#forms_items_inputs_items_required )       | No      | boolean | No         | -          | -                 |

###### `0``0`6.1.2.1.1. Property `Engine configuration > forms > forms items > inputs > inputs items > description`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`6.1.2.1.2. Property `Engine configuration > forms > forms items > inputs > inputs items > field`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`6.1.2.1.3. Property `Engine configuration > forms > forms items > inputs > inputs items > label`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`6.1.2.1.4. Property `Engine configuration > forms > forms items > inputs > inputs items > maxLength`

|              |          |
| ------------ | -------- |
| **Type**     | `number` |
| **Required** | No       |

###### `0``0`6.1.2.1.5. Property `Engine configuration > forms > forms items > inputs > inputs items > minLength`

|              |          |
| ------------ | -------- |
| **Type**     | `number` |
| **Required** | No       |

###### `0``0`6.1.2.1.6. Property `Engine configuration > forms > forms items > inputs > inputs items > placeholder`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`6.1.2.1.7. Property `Engine configuration > forms > forms items > inputs > inputs items > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

#### `0``0`6.1.3. Property `Engine configuration > forms > forms items > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

#### `0``0`6.1.4. Property `Engine configuration > forms > forms items > path`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

#### `0``0`6.1.5. Property `Engine configuration > forms > forms items > submitLabel`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

#### `0``0`6.1.6. Property `Engine configuration > forms > forms items > successMessage`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

#### `0``0`6.1.7. Property `Engine configuration > forms > forms items > table`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

#### `0``0`6.1.8. Property `Engine configuration > forms > forms items > title`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

## `0``0`7. Property `Engine configuration > integrations`

**Title:** Integrations configuration

|                           |                             |
| ------------------------- | --------------------------- |
| **Type**                  | `object`                    |
| **Required**              | No                          |
| **Additional properties** | Not allowed                 |
| **Defined in**            | #/definitions/IIntegrations |

**Description:** This is the list of integrations of the app.

| Property                                        | Pattern | Type   | Deprecated | Definition | Title/Description                                       |
| ----------------------------------------------- | ------- | ------ | ---------- | ---------- | ------------------------------------------------------- |
| - [airtable](#integrations_airtable )           | No      | array  | No         | -          | Configurations for Airtable integration                 |
| - [calendly](#integrations_calendly )           | No      | array  | No         | -          | Configurations for Calendly scheduling integration      |
| - [gocardless](#integrations_gocardless )       | No      | array  | No         | -          | Configurations for GoCardless payment integration       |
| - [google](#integrations_google )               | No      | object | No         | -          | Configurations for Google services integration          |
| - [notion](#integrations_notion )               | No      | array  | No         | -          | Configurations for Notion integration                   |
| - [pappers](#integrations_pappers )             | No      | array  | No         | -          | Configurations for Pappers company data integration     |
| - [phantombuster](#integrations_phantombuster ) | No      | array  | No         | -          | Configurations for Phantombuster automation integration |
| - [qonto](#integrations_qonto )                 | No      | array  | No         | -          | Configurations for Qonto banking integration            |

### `0``0`7.1. Property `Engine configuration > integrations > airtable`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** Configurations for Airtable integration

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                | Description |
| ---------------------------------------------- | ----------- |
| [AirtableConfig](#integrations_airtable_items) | -           |

#### `0``0`7.1.1. Engine configuration > integrations > airtable > AirtableConfig

|                           |                              |
| ------------------------- | ---------------------------- |
| **Type**                  | `object`                     |
| **Required**              | No                           |
| **Additional properties** | Not allowed                  |
| **Defined in**            | #/definitions/AirtableConfig |

| Property                                                 | Pattern | Type   | Deprecated | Definition | Title/Description |
| -------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [apiKey](#integrations_airtable_items_apiKey )         | No      | string | No         | -          | -                 |
| - [baseUrl](#integrations_airtable_items_baseUrl )       | No      | string | No         | -          | -                 |
| + [databaseId](#integrations_airtable_items_databaseId ) | No      | string | No         | -          | -                 |
| + [name](#integrations_airtable_items_name )             | No      | string | No         | -          | -                 |

##### `0``0`7.1.1.1. Property `Engine configuration > integrations > airtable > airtable items > apiKey`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`7.1.1.2. Property `Engine configuration > integrations > airtable > airtable items > baseUrl`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

##### `0``0`7.1.1.3. Property `Engine configuration > integrations > airtable > airtable items > databaseId`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`7.1.1.4. Property `Engine configuration > integrations > airtable > airtable items > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

### `0``0`7.2. Property `Engine configuration > integrations > calendly`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** Configurations for Calendly scheduling integration

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                | Description |
| ---------------------------------------------- | ----------- |
| [CalendlyConfig](#integrations_calendly_items) | -           |

#### `0``0`7.2.1. Engine configuration > integrations > calendly > CalendlyConfig

|                           |                              |
| ------------------------- | ---------------------------- |
| **Type**                  | `object`                     |
| **Required**              | No                           |
| **Additional properties** | Not allowed                  |
| **Defined in**            | #/definitions/CalendlyConfig |

| Property                                           | Pattern | Type   | Deprecated | Definition | Title/Description |
| -------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [baseUrl](#integrations_calendly_items_baseUrl ) | No      | string | No         | -          | -                 |
| + [name](#integrations_calendly_items_name )       | No      | string | No         | -          | -                 |
| + [user](#integrations_calendly_items_user )       | No      | object | No         | -          | -                 |

##### `0``0`7.2.1.1. Property `Engine configuration > integrations > calendly > calendly items > baseUrl`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

##### `0``0`7.2.1.2. Property `Engine configuration > integrations > calendly > calendly items > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`7.2.1.3. Property `Engine configuration > integrations > calendly > calendly items > user`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | Yes         |
| **Additional properties** | Not allowed |

| Property                                                        | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [accessToken](#integrations_calendly_items_user_accessToken ) | No      | string | No         | -          | -                 |

###### `0``0`7.2.1.3.1. Property `Engine configuration > integrations > calendly > calendly items > user > accessToken`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

### `0``0`7.3. Property `Engine configuration > integrations > gocardless`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** Configurations for GoCardless payment integration

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                    | Description |
| -------------------------------------------------- | ----------- |
| [GoCardlessConfig](#integrations_gocardless_items) | -           |

#### `0``0`7.3.1. Engine configuration > integrations > gocardless > GoCardlessConfig

|                           |                                |
| ------------------------- | ------------------------------ |
| **Type**                  | `object`                       |
| **Required**              | No                             |
| **Additional properties** | Not allowed                    |
| **Defined in**            | #/definitions/GoCardlessConfig |

| Property                                                     | Pattern | Type   | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------ | ------- | ------ | ---------- | ---------- | ----------------- |
| + [accessToken](#integrations_gocardless_items_accessToken ) | No      | string | No         | -          | -                 |
| - [baseUrl](#integrations_gocardless_items_baseUrl )         | No      | string | No         | -          | -                 |
| + [name](#integrations_gocardless_items_name )               | No      | string | No         | -          | -                 |

##### `0``0`7.3.1.1. Property `Engine configuration > integrations > gocardless > gocardless items > accessToken`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`7.3.1.2. Property `Engine configuration > integrations > gocardless > gocardless items > baseUrl`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

##### `0``0`7.3.1.3. Property `Engine configuration > integrations > gocardless > gocardless items > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

### `0``0`7.4. Property `Engine configuration > integrations > google`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

**Description:** Configurations for Google services integration

| Property                             | Pattern | Type  | Deprecated | Definition | Title/Description                    |
| ------------------------------------ | ------- | ----- | ---------- | ---------- | ------------------------------------ |
| - [mail](#integrations_google_mail ) | No      | array | No         | -          | Configurations for Gmail integration |

#### `0``0`7.4.1. Property `Engine configuration > integrations > google > mail`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** Configurations for Gmail integration

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                     | Description |
| --------------------------------------------------- | ----------- |
| [GoogleMailConfig](#integrations_google_mail_items) | -           |

##### `0``0`7.4.1.1. Engine configuration > integrations > google > mail > GoogleMailConfig

|                           |                                |
| ------------------------- | ------------------------------ |
| **Type**                  | `object`                       |
| **Required**              | No                             |
| **Additional properties** | Not allowed                    |
| **Defined in**            | #/definitions/GoogleMailConfig |

| Property                                                | Pattern | Type   | Deprecated | Definition | Title/Description |
| ------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [baseUrl](#integrations_google_mail_items_baseUrl )   | No      | string | No         | -          | -                 |
| + [name](#integrations_google_mail_items_name )         | No      | string | No         | -          | -                 |
| + [password](#integrations_google_mail_items_password ) | No      | string | No         | -          | -                 |
| + [user](#integrations_google_mail_items_user )         | No      | string | No         | -          | -                 |

###### `0``0`7.4.1.1.1. Property `Engine configuration > integrations > google > mail > mail items > baseUrl`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`7.4.1.1.2. Property `Engine configuration > integrations > google > mail > mail items > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`7.4.1.1.3. Property `Engine configuration > integrations > google > mail > mail items > password`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`7.4.1.1.4. Property `Engine configuration > integrations > google > mail > mail items > user`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

### `0``0`7.5. Property `Engine configuration > integrations > notion`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** Configurations for Notion integration

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be            | Description |
| ------------------------------------------ | ----------- |
| [NotionConfig](#integrations_notion_items) | -           |

#### `0``0`7.5.1. Engine configuration > integrations > notion > NotionConfig

|                           |                            |
| ------------------------- | -------------------------- |
| **Type**                  | `object`                   |
| **Required**              | No                         |
| **Additional properties** | Not allowed                |
| **Defined in**            | #/definitions/NotionConfig |

| Property                                                         | Pattern | Type   | Deprecated | Definition | Title/Description |
| ---------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [baseUrl](#integrations_notion_items_baseUrl )                 | No      | string | No         | -          | -                 |
| + [name](#integrations_notion_items_name )                       | No      | string | No         | -          | -                 |
| - [pollingInterval](#integrations_notion_items_pollingInterval ) | No      | number | No         | -          | -                 |
| + [token](#integrations_notion_items_token )                     | No      | string | No         | -          | -                 |

##### `0``0`7.5.1.1. Property `Engine configuration > integrations > notion > notion items > baseUrl`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

##### `0``0`7.5.1.2. Property `Engine configuration > integrations > notion > notion items > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`7.5.1.3. Property `Engine configuration > integrations > notion > notion items > pollingInterval`

|              |          |
| ------------ | -------- |
| **Type**     | `number` |
| **Required** | No       |

##### `0``0`7.5.1.4. Property `Engine configuration > integrations > notion > notion items > token`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

### `0``0`7.6. Property `Engine configuration > integrations > pappers`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** Configurations for Pappers company data integration

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be              | Description |
| -------------------------------------------- | ----------- |
| [PappersConfig](#integrations_pappers_items) | -           |

#### `0``0`7.6.1. Engine configuration > integrations > pappers > PappersConfig

|                           |                             |
| ------------------------- | --------------------------- |
| **Type**                  | `object`                    |
| **Required**              | No                          |
| **Additional properties** | Not allowed                 |
| **Defined in**            | #/definitions/PappersConfig |

| Property                                          | Pattern | Type   | Deprecated | Definition | Title/Description |
| ------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [apiKey](#integrations_pappers_items_apiKey )   | No      | string | No         | -          | -                 |
| - [baseUrl](#integrations_pappers_items_baseUrl ) | No      | string | No         | -          | -                 |
| + [name](#integrations_pappers_items_name )       | No      | string | No         | -          | -                 |

##### `0``0`7.6.1.1. Property `Engine configuration > integrations > pappers > pappers items > apiKey`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`7.6.1.2. Property `Engine configuration > integrations > pappers > pappers items > baseUrl`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

##### `0``0`7.6.1.3. Property `Engine configuration > integrations > pappers > pappers items > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

### `0``0`7.7. Property `Engine configuration > integrations > phantombuster`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** Configurations for Phantombuster automation integration

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                          | Description |
| -------------------------------------------------------- | ----------- |
| [PhantombusterConfig](#integrations_phantombuster_items) | -           |

#### `0``0`7.7.1. Engine configuration > integrations > phantombuster > PhantombusterConfig

|                           |                                   |
| ------------------------- | --------------------------------- |
| **Type**                  | `object`                          |
| **Required**              | No                                |
| **Additional properties** | Not allowed                       |
| **Defined in**            | #/definitions/PhantombusterConfig |

| Property                                                | Pattern | Type   | Deprecated | Definition | Title/Description |
| ------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [apiKey](#integrations_phantombuster_items_apiKey )   | No      | string | No         | -          | -                 |
| - [baseUrl](#integrations_phantombuster_items_baseUrl ) | No      | string | No         | -          | -                 |
| + [name](#integrations_phantombuster_items_name )       | No      | string | No         | -          | -                 |

##### `0``0`7.7.1.1. Property `Engine configuration > integrations > phantombuster > phantombuster items > apiKey`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`7.7.1.2. Property `Engine configuration > integrations > phantombuster > phantombuster items > baseUrl`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

##### `0``0`7.7.1.3. Property `Engine configuration > integrations > phantombuster > phantombuster items > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

### `0``0`7.8. Property `Engine configuration > integrations > qonto`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** Configurations for Qonto banking integration

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be          | Description |
| ---------------------------------------- | ----------- |
| [QontoConfig](#integrations_qonto_items) | -           |

#### `0``0`7.8.1. Engine configuration > integrations > qonto > QontoConfig

|                           |                           |
| ------------------------- | ------------------------- |
| **Type**                  | `object`                  |
| **Required**              | No                        |
| **Additional properties** | Not allowed               |
| **Defined in**            | #/definitions/QontoConfig |

| Property                                                          | Pattern | Type   | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [baseUrl](#integrations_qonto_items_baseUrl )                   | No      | string | No         | -          | -                 |
| + [name](#integrations_qonto_items_name )                         | No      | string | No         | -          | -                 |
| + [organisationSlug](#integrations_qonto_items_organisationSlug ) | No      | string | No         | -          | -                 |
| + [secretKey](#integrations_qonto_items_secretKey )               | No      | string | No         | -          | -                 |
| - [stagingToken](#integrations_qonto_items_stagingToken )         | No      | string | No         | -          | -                 |

##### `0``0`7.8.1.1. Property `Engine configuration > integrations > qonto > qonto items > baseUrl`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

##### `0``0`7.8.1.2. Property `Engine configuration > integrations > qonto > qonto items > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`7.8.1.3. Property `Engine configuration > integrations > qonto > qonto items > organisationSlug`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`7.8.1.4. Property `Engine configuration > integrations > qonto > qonto items > secretKey`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`7.8.1.5. Property `Engine configuration > integrations > qonto > qonto items > stagingToken`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

## `0``0`8. Property `Engine configuration > loggers`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** Configuration for application logging

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be | Description |
| ------------------------------- | ----------- |
| [LoggerConfig](#loggers_items)  | -           |

### `0``0`8.1. Engine configuration > loggers > LoggerConfig

|                           |                            |
| ------------------------- | -------------------------- |
| **Type**                  | `combining`                |
| **Required**              | No                         |
| **Additional properties** | Any type allowed           |
| **Defined in**            | #/definitions/LoggerConfig |

| Any of(Option)                                       |
| ---------------------------------------------------- |
| [LoggerElasticSearchConfig](#loggers_items_anyOf_i0) |
| [LoggerConsoleConfig](#loggers_items_anyOf_i1)       |
| [LoggerFileConfig](#loggers_items_anyOf_i2)          |

#### `0``0`8.1.1. Property `Engine configuration > loggers > loggers items > anyOf > LoggerElasticSearchConfig`

|                           |                                         |
| ------------------------- | --------------------------------------- |
| **Type**                  | `object`                                |
| **Required**              | No                                      |
| **Additional properties** | Not allowed                             |
| **Defined in**            | #/definitions/LoggerElasticSearchConfig |

| Property                                    | Pattern | Type    | Deprecated | Definition | Title/Description |
| ------------------------------------------- | ------- | ------- | ---------- | ---------- | ----------------- |
| + [driver](#loggers_items_anyOf_i0_driver ) | No      | const   | No         | -          | -                 |
| + [index](#loggers_items_anyOf_i0_index )   | No      | string  | No         | -          | -                 |
| - [level](#loggers_items_anyOf_i0_level )   | No      | string  | No         | -          | -                 |
| - [silent](#loggers_items_anyOf_i0_silent ) | No      | boolean | No         | -          | -                 |
| + [url](#loggers_items_anyOf_i0_url )       | No      | string  | No         | -          | -                 |

##### `0``0`8.1.1.1. Property `Engine configuration > loggers > loggers items > anyOf > item 0 > driver`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"ElasticSearch"`

##### `0``0`8.1.1.2. Property `Engine configuration > loggers > loggers items > anyOf > item 0 > index`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`8.1.1.3. Property `Engine configuration > loggers > loggers items > anyOf > item 0 > level`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

##### `0``0`8.1.1.4. Property `Engine configuration > loggers > loggers items > anyOf > item 0 > silent`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

##### `0``0`8.1.1.5. Property `Engine configuration > loggers > loggers items > anyOf > item 0 > url`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

#### `0``0`8.1.2. Property `Engine configuration > loggers > loggers items > anyOf > LoggerConsoleConfig`

|                           |                                   |
| ------------------------- | --------------------------------- |
| **Type**                  | `object`                          |
| **Required**              | No                                |
| **Additional properties** | Not allowed                       |
| **Defined in**            | #/definitions/LoggerConsoleConfig |

| Property                                    | Pattern | Type    | Deprecated | Definition | Title/Description |
| ------------------------------------------- | ------- | ------- | ---------- | ---------- | ----------------- |
| + [driver](#loggers_items_anyOf_i1_driver ) | No      | const   | No         | -          | -                 |
| - [level](#loggers_items_anyOf_i1_level )   | No      | string  | No         | -          | -                 |
| - [silent](#loggers_items_anyOf_i1_silent ) | No      | boolean | No         | -          | -                 |

##### `0``0`8.1.2.1. Property `Engine configuration > loggers > loggers items > anyOf > item 1 > driver`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Console"`

##### `0``0`8.1.2.2. Property `Engine configuration > loggers > loggers items > anyOf > item 1 > level`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

##### `0``0`8.1.2.3. Property `Engine configuration > loggers > loggers items > anyOf > item 1 > silent`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

#### `0``0`8.1.3. Property `Engine configuration > loggers > loggers items > anyOf > LoggerFileConfig`

|                           |                                |
| ------------------------- | ------------------------------ |
| **Type**                  | `object`                       |
| **Required**              | No                             |
| **Additional properties** | Not allowed                    |
| **Defined in**            | #/definitions/LoggerFileConfig |

| Property                                        | Pattern | Type    | Deprecated | Definition | Title/Description |
| ----------------------------------------------- | ------- | ------- | ---------- | ---------- | ----------------- |
| + [driver](#loggers_items_anyOf_i2_driver )     | No      | const   | No         | -          | -                 |
| + [filename](#loggers_items_anyOf_i2_filename ) | No      | string  | No         | -          | -                 |
| - [level](#loggers_items_anyOf_i2_level )       | No      | string  | No         | -          | -                 |
| - [silent](#loggers_items_anyOf_i2_silent )     | No      | boolean | No         | -          | -                 |

##### `0``0`8.1.3.1. Property `Engine configuration > loggers > loggers items > anyOf > item 2 > driver`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"File"`

##### `0``0`8.1.3.2. Property `Engine configuration > loggers > loggers items > anyOf > item 2 > filename`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`8.1.3.3. Property `Engine configuration > loggers > loggers items > anyOf > item 2 > level`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

##### `0``0`8.1.3.4. Property `Engine configuration > loggers > loggers items > anyOf > item 2 > silent`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

## `0``0`9. Property `Engine configuration > monitors`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** Array of monitoring service configurations

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be   | Description |
| --------------------------------- | ----------- |
| [monitors items](#monitors_items) | -           |

### `0``0`9.1. Engine configuration > monitors > monitors items

|                           |                  |
| ------------------------- | ---------------- |
| **Type**                  | `combining`      |
| **Required**              | No               |
| **Additional properties** | Any type allowed |

| Any of(Option)                                                               |
| ---------------------------------------------------------------------------- |
| [MonitorConsoleConfig](#monitors_items_anyOf_i0)                             |
| [Omit`0`](#monitors_items_anyOf_i1) |

#### `0``0`9.1.1. Property `Engine configuration > monitors > monitors items > anyOf > MonitorConsoleConfig`

|                           |                                    |
| ------------------------- | ---------------------------------- |
| **Type**                  | `object`                           |
| **Required**              | No                                 |
| **Additional properties** | Not allowed                        |
| **Defined in**            | #/definitions/MonitorConsoleConfig |

| Property                                     | Pattern | Type  | Deprecated | Definition | Title/Description |
| -------------------------------------------- | ------- | ----- | ---------- | ---------- | ----------------- |
| + [driver](#monitors_items_anyOf_i0_driver ) | No      | const | No         | -          | -                 |

##### `0``0`9.1.1.1. Property `Engine configuration > monitors > monitors items > anyOf > item 0 > driver`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Console"`

#### `0``0`9.1.2. Property `Engine configuration > monitors > monitors items > anyOf > Omit`0``

|                           |                                                                |
| ------------------------- | -------------------------------------------------------------- |
| **Type**                  | `object`                                                       |
| **Required**              | No                                                             |
| **Additional properties** | Not allowed                                                    |
| **Defined in**            | #/definitions/Omit`0` |

| Property                                               | Pattern | Type   | Deprecated | Definition | Title/Description |
| ------------------------------------------------------ | ------- | ------ | ---------- | ---------- | ----------------- |
| + [driver](#monitors_items_anyOf_i1_driver )           | No      | const  | No         | -          | -                 |
| + [dsn](#monitors_items_anyOf_i1_dsn )                 | No      | string | No         | -          | -                 |
| + [environment](#monitors_items_anyOf_i1_environment ) | No      | string | No         | -          | -                 |

##### `0``0`9.1.2.1. Property `Engine configuration > monitors > monitors items > anyOf > item 1 > driver`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Sentry"`

##### `0``0`9.1.2.2. Property `Engine configuration > monitors > monitors items > anyOf > item 1 > dsn`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

##### `0``0`9.1.2.3. Property `Engine configuration > monitors > monitors items > anyOf > item 1 > environment`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

## `0``0`10. Property `Engine configuration > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

**Description:** This is the name of the app.

## `0``0`11. Property `Engine configuration > server`

|                           |                                                                          |
| ------------------------- | ------------------------------------------------------------------------ |
| **Type**                  | `object`                                                                 |
| **Required**              | No                                                                       |
| **Additional properties** | Not allowed                                                              |
| **Defined in**            | #/definitions/Omit`0` |

**Description:** Configuration for the application server

| Property                              | Pattern | Type                      | Deprecated | Definition | Title/Description |
| ------------------------------------- | ------- | ------------------------- | ---------- | ---------- | ----------------- |
| - [apiKeys](#server_apiKeys )         | No      | array of string           | No         | -          | -                 |
| - [baseUrl](#server_baseUrl )         | No      | string                    | No         | -          | -                 |
| - [env](#server_env )                 | No      | string                    | No         | -          | -                 |
| - [idleTimeout](#server_idleTimeout ) | No      | string or number          | No         | -          | -                 |
| - [monitors](#server_monitors )       | No      | array of enum (of string) | No         | -          | -                 |
| - [port](#server_port )               | No      | string or number          | No         | -          | -                 |
| - [sslCert](#server_sslCert )         | No      | string                    | No         | -          | -                 |
| - [sslKey](#server_sslKey )           | No      | string                    | No         | -          | -                 |

### `0``0`11.1. Property `Engine configuration > server > apiKeys`

|              |                   |
| ------------ | ----------------- |
| **Type**     | `array of string` |
| **Required** | No                |

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be        | Description |
| -------------------------------------- | ----------- |
| [apiKeys items](#server_apiKeys_items) | -           |

#### `0``0`11.1.1. Engine configuration > server > apiKeys > apiKeys items

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

### `0``0`11.2. Property `Engine configuration > server > baseUrl`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

### `0``0`11.3. Property `Engine configuration > server > env`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

### `0``0`11.4. Property `Engine configuration > server > idleTimeout`

|              |                    |
| ------------ | ------------------ |
| **Type**     | `string or number` |
| **Required** | No                 |

### `0``0`11.5. Property `Engine configuration > server > monitors`

|              |                             |
| ------------ | --------------------------- |
| **Type**     | `array of enum (of string)` |
| **Required** | No                          |

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be          | Description |
| ---------------------------------------- | ----------- |
| [monitors items](#server_monitors_items) | -           |

#### `0``0`11.5.1. Engine configuration > server > monitors > monitors items

|              |                    |
| ------------ | ------------------ |
| **Type**     | `enum (of string)` |
| **Required** | No                 |

Must be one of:
* "Console"
* "Sentry"

### `0``0`11.6. Property `Engine configuration > server > port`

|              |                    |
| ------------ | ------------------ |
| **Type**     | `string or number` |
| **Required** | No                 |

### `0``0`11.7. Property `Engine configuration > server > sslCert`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

### `0``0`11.8. Property `Engine configuration > server > sslKey`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

## `0``0`12. Property `Engine configuration > tables`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | No      |

**Description:** This is the list of tables of the app.

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be      | Description                               |
| ------------------------------------ | ----------------------------------------- |
| [Table configuration](#tables_items) | Defines the structure of a database table |

### `0``0`12.1. Engine configuration > tables > Table configuration

**Title:** Table configuration

|                           |                      |
| ------------------------- | -------------------- |
| **Type**                  | `object`             |
| **Required**              | No                   |
| **Additional properties** | Not allowed          |
| **Defined in**            | #/definitions/ITable |

**Description:** Defines the structure of a database table

| Property                          | Pattern | Type   | Deprecated | Definition | Title/Description                              |
| --------------------------------- | ------- | ------ | ---------- | ---------- | ---------------------------------------------- |
| + [fields](#tables_items_fields ) | No      | array  | No         | -          | Array of field definitions for the table       |
| + [name](#tables_items_name )     | No      | string | No         | -          | The unique identifier for the table            |
| - [schema](#tables_items_schema ) | No      | string | No         | -          | The database schema where the table is located |

#### `0``0`12.1.1. Property `Engine configuration > tables > Table configuration > fields`

|              |         |
| ------------ | ------- |
| **Type**     | `array` |
| **Required** | Yes     |

**Description:** Array of field definitions for the table

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be           | Description                                                                 |
| ----------------------------------------- | --------------------------------------------------------------------------- |
| [Field types](#tables_items_fields_items) | Union type of all possible field types that can be used in forms and tables |

##### `0``0`12.1.1.1. Engine configuration > tables > Table configuration > fields > Field types

**Title:** Field types

|                           |                      |
| ------------------------- | -------------------- |
| **Type**                  | `combining`          |
| **Required**              | No                   |
| **Additional properties** | Any type allowed     |
| **Defined in**            | #/definitions/IField |

**Description:** Union type of all possible field types that can be used in forms and tables

| Any of(Option)                                                      |
| ------------------------------------------------------------------- |
| [DateTime field](#tables_items_fields_items_anyOf_i0)               |
| [Email field](#tables_items_fields_items_anyOf_i1)                  |
| [Long text field](#tables_items_fields_items_anyOf_i2)              |
| [Single line text field](#tables_items_fields_items_anyOf_i3)       |
| [Number field](#tables_items_fields_items_anyOf_i4)                 |
| [Formula field](#tables_items_fields_items_anyOf_i5)                |
| [Single select field](#tables_items_fields_items_anyOf_i6)          |
| [Single linked record field](#tables_items_fields_items_anyOf_i7)   |
| [Multiple linked record field](#tables_items_fields_items_anyOf_i8) |
| [Rollup field](#tables_items_fields_items_anyOf_i9)                 |
| [Checkbox field](#tables_items_fields_items_anyOf_i10)              |
| [Multiple select field](#tables_items_fields_items_anyOf_i11)       |
| [Multiple attachment field](#tables_items_fields_items_anyOf_i12)   |
| [URL field](#tables_items_fields_items_anyOf_i13)                   |
| [Single attachment field](#tables_items_fields_items_anyOf_i14)     |

###### `0``0`12.1.1.1.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > DateTime field`

**Title:** DateTime field

|                           |                              |
| ------------------------- | ---------------------------- |
| **Type**                  | `object`                     |
| **Required**              | No                           |
| **Additional properties** | Not allowed                  |
| **Defined in**            | #/definitions/IDateTimeField |

**Description:** Represents a date and time field in forms and tables

| Property                                                          | Pattern | Type    | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------- | ------- | ------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i0_name )               | No      | string  | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i0_onMigration ) | No      | object  | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i0_required )       | No      | boolean | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i0_type )               | No      | const   | No         | -          | -                 |

###### `0``0`12.1.1.1.1.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > DateTime field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.1.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > DateTime field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i0_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.1.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > DateTime field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.1.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > DateTime field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.1.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > DateTime field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"DateTime"`

###### `0``0`12.1.1.1.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Email field`

**Title:** Email field

|                           |                           |
| ------------------------- | ------------------------- |
| **Type**                  | `object`                  |
| **Required**              | No                        |
| **Additional properties** | Not allowed               |
| **Defined in**            | #/definitions/IEmailField |

**Description:** Represents an email address field in forms and tables

| Property                                                          | Pattern | Type    | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------- | ------- | ------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i1_name )               | No      | string  | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i1_onMigration ) | No      | object  | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i1_required )       | No      | boolean | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i1_type )               | No      | const   | No         | -          | -                 |

###### `0``0`12.1.1.1.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Email field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.2.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Email field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i1_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.2.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Email field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.2.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Email field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.2.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Email field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Email"`

###### `0``0`12.1.1.1.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Long text field`

**Title:** Long text field

|                           |                              |
| ------------------------- | ---------------------------- |
| **Type**                  | `object`                     |
| **Required**              | No                           |
| **Additional properties** | Not allowed                  |
| **Defined in**            | #/definitions/ILongTextField |

**Description:** Represents a multi-line text field in forms and tables

| Property                                                          | Pattern | Type    | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------- | ------- | ------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i2_name )               | No      | string  | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i2_onMigration ) | No      | object  | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i2_required )       | No      | boolean | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i2_type )               | No      | const   | No         | -          | -                 |

###### `0``0`12.1.1.1.3.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Long text field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.3.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Long text field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i2_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.3.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Long text field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.3.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Long text field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.3.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Long text field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"LongText"`

###### `0``0`12.1.1.1.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single line text field`

**Title:** Single line text field

|                           |                                    |
| ------------------------- | ---------------------------------- |
| **Type**                  | `object`                           |
| **Required**              | No                                 |
| **Additional properties** | Not allowed                        |
| **Defined in**            | #/definitions/ISingleLineTextField |

**Description:** Represents a single-line text field in forms and tables

| Property                                                          | Pattern | Type    | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------- | ------- | ------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i3_name )               | No      | string  | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i3_onMigration ) | No      | object  | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i3_required )       | No      | boolean | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i3_type )               | No      | const   | No         | -          | -                 |

###### `0``0`12.1.1.1.4.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single line text field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.4.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single line text field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i3_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.4.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single line text field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.4.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single line text field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.4.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single line text field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"SingleLineText"`

###### `0``0`12.1.1.1.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Number field`

**Title:** Number field

|                           |                            |
| ------------------------- | -------------------------- |
| **Type**                  | `object`                   |
| **Required**              | No                         |
| **Additional properties** | Not allowed                |
| **Defined in**            | #/definitions/INumberField |

**Description:** Represents a numeric field in forms and tables

| Property                                                          | Pattern | Type    | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------- | ------- | ------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i4_name )               | No      | string  | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i4_onMigration ) | No      | object  | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i4_required )       | No      | boolean | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i4_type )               | No      | const   | No         | -          | -                 |

###### `0``0`12.1.1.1.5.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Number field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.5.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Number field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i4_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.5.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Number field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.5.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Number field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.5.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Number field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Number"`

###### `0``0`12.1.1.1.6. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field`

**Title:** Formula field

|                           |                             |
| ------------------------- | --------------------------- |
| **Type**                  | `object`                    |
| **Required**              | No                          |
| **Additional properties** | Not allowed                 |
| **Defined in**            | #/definitions/IFormulaField |

**Description:** Represents a calculated field in forms and tables

| Property                                                          | Pattern | Type    | Deprecated | Definition                    | Title/Description |
| ----------------------------------------------------------------- | ------- | ------- | ---------- | ----------------------------- | ----------------- |
| + [formula](#tables_items_fields_items_anyOf_i5_formula )         | No      | string  | No         | -                             | -                 |
| + [name](#tables_items_fields_items_anyOf_i5_name )               | No      | string  | No         | -                             | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i5_onMigration ) | No      | object  | No         | -                             | -                 |
| + [output](#tables_items_fields_items_anyOf_i5_output )           | No      | object  | No         | In #/definitions/IOutputField | -                 |
| - [required](#tables_items_fields_items_anyOf_i5_required )       | No      | boolean | No         | -                             | -                 |
| + [type](#tables_items_fields_items_anyOf_i5_type )               | No      | const   | No         | -                             | -                 |

###### `0``0`12.1.1.1.6.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > formula`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.6.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.6.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i5_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.6.3.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.6.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > output`

|                           |                            |
| ------------------------- | -------------------------- |
| **Type**                  | `object`                   |
| **Required**              | Yes                        |
| **Additional properties** | Not allowed                |
| **Defined in**            | #/definitions/IOutputField |

| Property                                                                 | Pattern | Type             | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------------ | ------- | ---------------- | ---------- | ---------- | ----------------- |
| - [onMigration](#tables_items_fields_items_anyOf_i5_output_onMigration ) | No      | object           | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i5_output_required )       | No      | boolean          | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i5_output_type )               | No      | enum (of string) | No         | -          | -                 |

###### `0``0`12.1.1.1.6.4.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > output > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                                     | Pattern | Type   | Deprecated | Definition | Title/Description |
| ---------------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i5_output_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.6.4.1.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > output > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.6.4.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > output > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.6.4.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > output > type`

|              |                    |
| ------------ | ------------------ |
| **Type**     | `enum (of string)` |
| **Required** | Yes                |

Must be one of:
* "DateTime"
* "LongText"
* "Number"
* "SingleLineText"

###### `0``0`12.1.1.1.6.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.6.6. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Formula field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Formula"`

###### `0``0`12.1.1.1.7. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field`

**Title:** Single select field

|                           |                                  |
| ------------------------- | -------------------------------- |
| **Type**                  | `object`                         |
| **Required**              | No                               |
| **Additional properties** | Not allowed                      |
| **Defined in**            | #/definitions/ISingleSelectField |

**Description:** Represents a field that can store a single selected option from a predefined list

| Property                                                          | Pattern | Type            | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------- | ------- | --------------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i6_name )               | No      | string          | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i6_onMigration ) | No      | object          | No         | -          | -                 |
| + [options](#tables_items_fields_items_anyOf_i6_options )         | No      | array of string | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i6_required )       | No      | boolean         | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i6_type )               | No      | const           | No         | -          | -                 |

###### `0``0`12.1.1.1.7.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.7.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i6_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.7.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.7.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > options`

|              |                   |
| ------------ | ----------------- |
| **Type**     | `array of string` |
| **Required** | Yes               |

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                                    | Description |
| ------------------------------------------------------------------ | ----------- |
| [options items](#tables_items_fields_items_anyOf_i6_options_items) | -           |

###### `0``0`12.1.1.1.7.3.1. Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > options > options items

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.7.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.7.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single select field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"SingleSelect"`

###### `0``0`12.1.1.1.8. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field`

**Title:** Single linked record field

|                           |                                        |
| ------------------------- | -------------------------------------- |
| **Type**                  | `object`                               |
| **Required**              | No                                     |
| **Additional properties** | Not allowed                            |
| **Defined in**            | #/definitions/ISingleLinkedRecordField |

**Description:** Represents a field that can link to a single record from another table

| Property                                                          | Pattern | Type    | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------- | ------- | ------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i7_name )               | No      | string  | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i7_onMigration ) | No      | object  | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i7_required )       | No      | boolean | No         | -          | -                 |
| + [table](#tables_items_fields_items_anyOf_i7_table )             | No      | string  | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i7_type )               | No      | const   | No         | -          | -                 |

###### `0``0`12.1.1.1.8.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.8.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i7_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.8.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.8.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.8.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field > table`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.8.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single linked record field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"SingleLinkedRecord"`

###### `0``0`12.1.1.1.9. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field`

**Title:** Multiple linked record field

|                           |                                          |
| ------------------------- | ---------------------------------------- |
| **Type**                  | `object`                                 |
| **Required**              | No                                       |
| **Additional properties** | Not allowed                              |
| **Defined in**            | #/definitions/IMultipleLinkedRecordField |

**Description:** Represents a field that can link to multiple records from another table

| Property                                                          | Pattern | Type    | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------- | ------- | ------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i8_name )               | No      | string  | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i8_onMigration ) | No      | object  | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i8_required )       | No      | boolean | No         | -          | -                 |
| + [table](#tables_items_fields_items_anyOf_i8_table )             | No      | string  | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i8_type )               | No      | const   | No         | -          | -                 |

###### `0``0`12.1.1.1.9.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.9.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i8_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.9.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.9.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.9.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field > table`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.9.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple linked record field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"MultipleLinkedRecord"`

###### `0``0`12.1.1.1.10. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field`

**Title:** Rollup field

|                           |                            |
| ------------------------- | -------------------------- |
| **Type**                  | `object`                   |
| **Required**              | No                         |
| **Additional properties** | Not allowed                |
| **Defined in**            | #/definitions/IRollupField |

**Description:** Represents a field that aggregates data from linked records

| Property                                                                            | Pattern | Type    | Deprecated | Definition                                                    | Title/Description |
| ----------------------------------------------------------------------------------- | ------- | ------- | ---------- | ------------------------------------------------------------- | ----------------- |
| + [formula](#tables_items_fields_items_anyOf_i9_formula )                           | No      | string  | No         | -                                                             | -                 |
| + [linkedRecordField](#tables_items_fields_items_anyOf_i9_linkedRecordField )       | No      | string  | No         | -                                                             | -                 |
| + [multipleLinkedRecord](#tables_items_fields_items_anyOf_i9_multipleLinkedRecord ) | No      | string  | No         | -                                                             | -                 |
| + [name](#tables_items_fields_items_anyOf_i9_name )                                 | No      | string  | No         | -                                                             | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i9_onMigration )                   | No      | object  | No         | -                                                             | -                 |
| + [output](#tables_items_fields_items_anyOf_i9_output )                             | No      | object  | No         | Same as [output](#tables_items_fields_items_anyOf_i5_output ) | -                 |
| - [required](#tables_items_fields_items_anyOf_i9_required )                         | No      | boolean | No         | -                                                             | -                 |
| + [type](#tables_items_fields_items_anyOf_i9_type )                                 | No      | const   | No         | -                                                             | -                 |

###### `0``0`12.1.1.1.10.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > formula`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.10.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > linkedRecordField`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.10.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > multipleLinkedRecord`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.10.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.10.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| --------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i9_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.10.5.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.10.6. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > output`

|                           |                                                      |
| ------------------------- | ---------------------------------------------------- |
| **Type**                  | `object`                                             |
| **Required**              | Yes                                                  |
| **Additional properties** | Not allowed                                          |
| **Same definition as**    | [output](#tables_items_fields_items_anyOf_i5_output) |

###### `0``0`12.1.1.1.10.7. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.10.8. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Rollup field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Rollup"`

###### `0``0`12.1.1.1.11. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Checkbox field`

**Title:** Checkbox field

|                           |                              |
| ------------------------- | ---------------------------- |
| **Type**                  | `object`                     |
| **Required**              | No                           |
| **Additional properties** | Not allowed                  |
| **Defined in**            | #/definitions/ICheckboxField |

**Description:** Represents a boolean checkbox field in forms and tables

| Property                                                           | Pattern | Type    | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------ | ------- | ------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i10_name )               | No      | string  | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i10_onMigration ) | No      | object  | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i10_required )       | No      | boolean | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i10_type )               | No      | const   | No         | -          | -                 |

###### `0``0`12.1.1.1.11.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Checkbox field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.11.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Checkbox field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                               | Pattern | Type   | Deprecated | Definition | Title/Description |
| ---------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i10_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.11.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Checkbox field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.11.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Checkbox field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.11.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Checkbox field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Checkbox"`

###### `0``0`12.1.1.1.12. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field`

**Title:** Multiple select field

|                           |                                    |
| ------------------------- | ---------------------------------- |
| **Type**                  | `object`                           |
| **Required**              | No                                 |
| **Additional properties** | Not allowed                        |
| **Defined in**            | #/definitions/IMultipleSelectField |

**Description:** Represents a field that can store multiple selected options from a predefined list

| Property                                                           | Pattern | Type            | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------ | ------- | --------------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i11_name )               | No      | string          | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i11_onMigration ) | No      | object          | No         | -          | -                 |
| + [options](#tables_items_fields_items_anyOf_i11_options )         | No      | array of string | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i11_required )       | No      | boolean         | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i11_type )               | No      | const           | No         | -          | -                 |

###### `0``0`12.1.1.1.12.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.12.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                               | Pattern | Type   | Deprecated | Definition | Title/Description |
| ---------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i11_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.12.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.12.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > options`

|              |                   |
| ------------ | ----------------- |
| **Type**     | `array of string` |
| **Required** | Yes               |

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                                     | Description |
| ------------------------------------------------------------------- | ----------- |
| [options items](#tables_items_fields_items_anyOf_i11_options_items) | -           |

###### `0``0`12.1.1.1.12.3.1. Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > options > options items

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.12.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.12.5. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple select field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"MultipleSelect"`

###### `0``0`12.1.1.1.13. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple attachment field`

**Title:** Multiple attachment field

|                           |                                        |
| ------------------------- | -------------------------------------- |
| **Type**                  | `object`                               |
| **Required**              | No                                     |
| **Additional properties** | Not allowed                            |
| **Defined in**            | #/definitions/IMultipleAttachmentField |

**Description:** Represents a field that can store multiple file attachments

| Property                                                           | Pattern | Type    | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------ | ------- | ------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i12_name )               | No      | string  | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i12_onMigration ) | No      | object  | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i12_required )       | No      | boolean | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i12_type )               | No      | const   | No         | -          | -                 |

###### `0``0`12.1.1.1.13.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple attachment field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.13.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple attachment field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                               | Pattern | Type   | Deprecated | Definition | Title/Description |
| ---------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i12_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.13.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple attachment field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.13.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple attachment field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.13.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Multiple attachment field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"MultipleAttachment"`

###### `0``0`12.1.1.1.14. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > URL field`

**Title:** URL field

|                           |                         |
| ------------------------- | ----------------------- |
| **Type**                  | `object`                |
| **Required**              | No                      |
| **Additional properties** | Not allowed             |
| **Defined in**            | #/definitions/IUrlField |

**Description:** Represents a URL field in forms and tables

| Property                                                           | Pattern | Type    | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------ | ------- | ------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i13_name )               | No      | string  | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i13_onMigration ) | No      | object  | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i13_required )       | No      | boolean | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i13_type )               | No      | const   | No         | -          | -                 |

###### `0``0`12.1.1.1.14.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > URL field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.14.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > URL field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                               | Pattern | Type   | Deprecated | Definition | Title/Description |
| ---------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i13_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.14.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > URL field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.14.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > URL field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.14.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > URL field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Url"`

###### `0``0`12.1.1.1.15. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single attachment field`

**Title:** Single attachment field

|                           |                                      |
| ------------------------- | ------------------------------------ |
| **Type**                  | `object`                             |
| **Required**              | No                                   |
| **Additional properties** | Not allowed                          |
| **Defined in**            | #/definitions/ISingleAttachmentField |

**Description:** Represents a field that can store a single file attachment

| Property                                                           | Pattern | Type    | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------ | ------- | ------- | ---------- | ---------- | ----------------- |
| + [name](#tables_items_fields_items_anyOf_i14_name )               | No      | string  | No         | -          | -                 |
| - [onMigration](#tables_items_fields_items_anyOf_i14_onMigration ) | No      | object  | No         | -          | -                 |
| - [required](#tables_items_fields_items_anyOf_i14_required )       | No      | boolean | No         | -          | -                 |
| + [type](#tables_items_fields_items_anyOf_i14_type )               | No      | const   | No         | -          | -                 |

###### `0``0`12.1.1.1.15.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single attachment field > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

###### `0``0`12.1.1.1.15.2. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single attachment field > onMigration`

|                           |             |
| ------------------------- | ----------- |
| **Type**                  | `object`    |
| **Required**              | No          |
| **Additional properties** | Not allowed |

| Property                                                               | Pattern | Type   | Deprecated | Definition | Title/Description |
| ---------------------------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [replace](#tables_items_fields_items_anyOf_i14_onMigration_replace ) | No      | string | No         | -          | -                 |

###### `0``0`12.1.1.1.15.2.1. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single attachment field > onMigration > replace`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

###### `0``0`12.1.1.1.15.3. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single attachment field > required`

|              |           |
| ------------ | --------- |
| **Type**     | `boolean` |
| **Required** | No        |

###### `0``0`12.1.1.1.15.4. Property `Engine configuration > tables > Table configuration > fields > Field types > anyOf > Single attachment field > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"SingleAttachment"`

#### `0``0`12.1.2. Property `Engine configuration > tables > Table configuration > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

**Description:** The unique identifier for the table

#### `0``0`12.1.3. Property `Engine configuration > tables > Table configuration > schema`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

**Description:** The database schema where the table is located

## `0``0`13. Property `Engine configuration > theme`

|                           |                  |
| ------------------------- | ---------------- |
| **Type**                  | `combining`      |
| **Required**              | No               |
| **Additional properties** | Any type allowed |

**Description:** Configuration for application theming

| Any of(Option)                            |
| ----------------------------------------- |
| [ThemeConfigNone](#theme_anyOf_i0)        |
| [ThemeConfigTailwindCSS](#theme_anyOf_i1) |

### `0``0`13.1. Property `Engine configuration > theme > anyOf > ThemeConfigNone`

|                           |                               |
| ------------------------- | ----------------------------- |
| **Type**                  | `object`                      |
| **Required**              | No                            |
| **Additional properties** | Not allowed                   |
| **Defined in**            | #/definitions/ThemeConfigNone |

| Property                        | Pattern | Type  | Deprecated | Definition | Title/Description |
| ------------------------------- | ------- | ----- | ---------- | ---------- | ----------------- |
| + [type](#theme_anyOf_i0_type ) | No      | const | No         | -          | -                 |

#### `0``0`13.1.1. Property `Engine configuration > theme > anyOf > item 0 > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"none"`

### `0``0`13.2. Property `Engine configuration > theme > anyOf > ThemeConfigTailwindCSS`

|                           |                                      |
| ------------------------- | ------------------------------------ |
| **Type**                  | `object`                             |
| **Required**              | No                                   |
| **Additional properties** | Not allowed                          |
| **Defined in**            | #/definitions/ThemeConfigTailwindCSS |

| Property                        | Pattern | Type   | Deprecated | Definition | Title/Description |
| ------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [base](#theme_anyOf_i1_base ) | No      | string | No         | -          | -                 |
| + [type](#theme_anyOf_i1_type ) | No      | const  | No         | -          | -                 |

#### `0``0`13.2.1. Property `Engine configuration > theme > anyOf > item 1 > base`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

#### `0``0`13.2.2. Property `Engine configuration > theme > anyOf > item 1 > type`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"tailwindcss"`

## `0``0`14. Property `Engine configuration > tunnel`

|                           |                                 |
| ------------------------- | ------------------------------- |
| **Type**                  | `object`                        |
| **Required**              | No                              |
| **Additional properties** | Not allowed                     |
| **Defined in**            | #/definitions/TunnelNgrokConfig |

**Description:** Configuration for network tunneling

| Property                              | Pattern | Type   | Deprecated | Definition | Title/Description |
| ------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| + [authToken](#tunnel_authToken )     | No      | string | No         | -          | -                 |
| - [baseUrl](#tunnel_baseUrl )         | No      | string | No         | -          | -                 |
| + [integration](#tunnel_integration ) | No      | const  | No         | -          | -                 |
| + [name](#tunnel_name )               | No      | string | No         | -          | -                 |

### `0``0`14.1. Property `Engine configuration > tunnel > authToken`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

### `0``0`14.2. Property `Engine configuration > tunnel > baseUrl`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | No       |

### `0``0`14.3. Property `Engine configuration > tunnel > integration`

|              |         |
| ------------ | ------- |
| **Type**     | `const` |
| **Required** | Yes     |

Specific value: `"Ngrok"`

### `0``0`14.4. Property `Engine configuration > tunnel > name`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

## `0``0`15. Property `Engine configuration > version`

|              |          |
| ------------ | -------- |
| **Type**     | `string` |
| **Required** | Yes      |

**Description:** This is the version of the app.

----------------------------------------------------------------------------------------------------------------------------
Generated using [json-schema-for-humans](https://github.com/coveooss/json-schema-for-humans) on 2025-04-12 at 12:57:35 +0200
