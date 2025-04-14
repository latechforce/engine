---
sidebar_position: 4
---

# Table

## Description

Defines the structure of a database table

## Properties

| Name   | Type                               | Required | Description                                    |
| ------ | ---------------------------------- | -------- | ---------------------------------------------- |
| name   | string                             | ✔       | The unique identifier for the table            |
| schema | string                             |          | The database schema where the table is located |
| fields | Array of [Field](/api/table/field) | ✔       | Array of field definitions for the table       |
