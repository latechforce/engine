import type { ICodeRunnerDriver } from '/adapter/spi/drivers/CodeRunnerSpi'
import type {
  CodeRunnerContext,
  CodeRunnerContextIntegrations,
  CodeRunnerContextPackages,
  CodeRunnerContextServices,
} from '/domain/services/CodeRunner'
import vm from 'node:vm'

// Packages
import xml2js from 'xml2js'
import * as dateFns from 'date-fns'
import * as dateFnsLocale from 'date-fns/locale'
import * as dateFnsTz from 'date-fns-tz'
import googleapis from 'googleapis'
import Airtable from 'airtable'
import axios from 'axios'
import https from 'https'
import crypto from 'crypto'
import lodash from 'lodash'
import { Client as Notion } from '@notionhq/client'
import papaparse from 'papaparse'
import puppeteer from 'puppeteer'
import path from 'path'
import fsExtra from 'fs-extra'
import slugify from 'slugify'
import sodium from 'libsodium-wrappers'
import { Mistral } from '@mistralai/mistralai'
import ExcelJS from 'exceljs'

export const packages: CodeRunnerContextPackages = {
  xml2js,
  dateFns,
  dateFnsLocale,
  dateFnsTz,
  googleapis,
  Airtable,
  Notion,
  axios,
  https,
  crypto,
  lodash,
  papaparse,
  puppeteer,
  path,
  fsExtra,
  slugify,
  sodium,
  Mistral,
  ExcelJS,
}

const globalContext = {
  fetch: global.fetch,
  Error: global.Error,
  Buffer: global.Buffer,
  Date: global.Date,
  Array: global.Array,
  Number: global.Number,
  Boolean: global.Boolean,
  Math: global.Math,
  URLSearchParams: global.URLSearchParams,
  setTimeout: setTimeout,
  console: console,
  TextEncoder: global.TextEncoder,
  TextDecoder: global.TextDecoder,
  Blob: global.Blob,
  ReadableStream: global.ReadableStream,
  File: global.File,
}

export class JavascriptRunnerDriver implements ICodeRunnerDriver {
  constructor(
    private _script: vm.Script,
    private _env: {
      [key: string]: string
    }
  ) {}

  run = async (
    inputData: object,
    services: CodeRunnerContextServices,
    integrations: CodeRunnerContextIntegrations
  ) => {
    const codeContext: CodeRunnerContext<object> = {
      inputData,
      env: this._env,
      services,
      integrations,
      packages,
    }
    const context = vm.createContext({
      ...globalContext,
      ...codeContext,
    })
    return this._script.runInContext(context)
  }
}
