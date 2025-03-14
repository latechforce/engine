import { type CssResponse, isCssResponse } from './Css'
import { type DocxResponse, isDocxResponse } from './Docx'
import { type FontResponse, isFontResponse } from './Font'
import { type HtmlResponse, isHtmlResponse } from './Html'
import { isJpgResponse, type JpgResponse } from './Jpg'
import { type JsonResponse, isJsonResponse } from './Json'
import { isJsxResponse, type JsxResponse } from './Jsx'
import { isPdfResponse, type PdfResponse } from './Pdf'
import { isPngResponse, type PngResponse } from './Png'
import { type XlsxResponse, isXlsxResponse } from './Xlsx'

export type Response =
  | JsonResponse
  | HtmlResponse
  | CssResponse
  | FontResponse
  | DocxResponse
  | XlsxResponse
  | PngResponse
  | JpgResponse
  | PdfResponse
  | JsxResponse

export function isResponse(value: unknown): value is Response {
  return (
    isJsonResponse(value) ||
    isHtmlResponse(value) ||
    isCssResponse(value) ||
    isFontResponse(value) ||
    isDocxResponse(value) ||
    isXlsxResponse(value) ||
    isPngResponse(value) ||
    isJpgResponse(value) ||
    isPdfResponse(value) ||
    isJsxResponse(value)
  )
}
