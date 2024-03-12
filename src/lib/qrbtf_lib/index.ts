import QRCode from 'qrcode'
import {render} from "@/lib/qrbtf_lib/svg_tag";

export function getQrcodeObject() {
  const qrObj = QRCode.create('I am a pony!')
  console.log(qrObj)
  return qrObj
}


export function renderSvg() {
  const qrObj = QRCode.create('I am a pony!')
  const svg = render(qrObj, {})
  // console.log(svg)
  return svg
}
