<h1 align="center">QRBTF</h1>

<p align="center">
    URL: <a href="https://qrbtf.com" target="_blank">qrbtf.com</a><br />
    The world's first and best AI & parametric QR code generator.
</p>

<p align="center">
    <img src="public/assets/resources/qrbtf-hero.jpg">
    <img src="public/assets/resources/qrcodes.jpg">
</p>

### Features

- **AI part**
  - Original models trained on a large number of images.
  - Extremely fast and high quality inference.
- **Parametric part**
  - Open source.
  - Various styles with no backend required.
  - Support for SVG format.

Articles:

- [如何制作一个漂亮的二维码 (Chinese)](https://mp.weixin.qq.com/s/_Oy9I9FqPXhfwN9IUhf6_g)
- [AI 生成可扫码图像 — 新 ControlNet 模型展示 (Chinese)](https://mp.weixin.qq.com/s/i4WR5ULH1ZZYl8Watf3EPw)
- [ControlNet for QR Code](https://www.reddit.com/r/StableDiffusion/comments/141hg9x/controlnet_for_qr_code/)

### Usage

1. Open [qrbtf.com](https://qrbtf.com).
2. Enter a URL or text.
3. Select a style.
4. Adjust parameters.
5. Download for `SVG` `JPG` or `SVG` format.

### React Component (react-qrbtf)

See [CPunisher / react-qrbtf](https://github.com/cpunisher/react-qrbtf) for more information.

```bash
npm install react-qrbtf --save
```

#### Include the Component

```js
import React from "react";
import { QRNormal } from "react-qrbtf";

class Component extends React.Component {
  render() {
    return (
      <QRNormal
        value="react-qrbtf"
        className="my-qrcode"
        styles={{ svg: { width: "200px" } }}
        type="round"
        size={50}
        opacity={80}
        posType="planet"
        otherColor="#33CCCC"
        posColor="#009999"
      />
    );
  }
}
```

### Authors

- [ciaochaos](https://github.com/ciaochaos)
- [CPunisher](https://github.com/CPunisher)
- More members at [Latent Cat](https://latentcat.com)

### License

[GNU General Public License v3.0](LICENSE)
