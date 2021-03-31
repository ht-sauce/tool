import QRCode from 'qrcode'

export default function (text, name = '二维码.png') {
  let canvas = document.createElement('canvas')
  return new Promise((resolve, reject) => {
    QRCode.toCanvas(
      canvas,
      text,
      {
        width: 400,
        height: 400,
      },
      function (error) {
        if (error) reject(error)
        else {
          const fullQuality = canvas.toDataURL('image/jpeg', 1.0)
          let save_link = document.createElement('a')
          save_link.href = fullQuality
          save_link.download = name
          save_link.click()
          save_link = null
          canvas = null
          return resolve()
        }
      },
    )
  })
}
