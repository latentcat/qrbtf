import React from 'react';
import './App.css';
import LinkButton from "../link/LinkButton";
import GitHubButton from 'react-github-btn'
import LinkTrace from "../link/LinkTrace";

const PartMore = () => (
    <div className="Qr-titled-nobg">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">More</div>
            <p className="Qr-s-subtitle">更多</p>
            <div className="Qr-article">
                <p><GitHubButton href="https://github.com/ciaochaos/qrbtf" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star ciaochaos/qrbtf on GitHub">Star</GitHubButton></p>
                <h2>最新消息</h2>
                <p><b>2020.6.23</b><br/>新增深色模式。</p>
                <p><b>2020.6.22</b><br/>新增 A — a1、A — a2、A — b1、A — b2 样式，添加样式描述，新增桌面端横向拖拽滑动。</p>
                <p><b>2020.6.11</b><br/>QRBTF React 组件发布！快在你的应用中引入 react-qrbtf 吧。<LinkTrace href='https://github.com/cpunisher/react-qrbtf' rel="noopener noreferrer" target="_blank">访问项目</LinkTrace>。</p>
                <p><b>2020.5.23</b><br/>网站开源啦！<LinkTrace href='https://github.com/ciaochaos/qrbtf' rel="noopener noreferrer" target="_blank">点击访问</LinkTrace> 我们的 Github。期待你也来参与设计、开发！给个 Star 支持一下不？查看文章 <LinkTrace href='https://mp.weixin.qq.com/s/GFEMCWQu3e2qhTuBabnHmQ' rel="noopener noreferrer" target="_blank">QRBTF 开源啦！来写个二维码样式吧～</LinkTrace>。</p>
                <p><b>2020.5.22</b><br/>新增 C2 样式、下载计数（好像还不太稳定）、普通二维码上传、颜色选择、背景图片上传、输入提示、桌面端横向滚动提示。</p>
                <h2>为什么要做一个二维码生成器？</h2>
                <p>看这里，<LinkTrace href='https://mp.weixin.qq.com/s/_Oy9I9FqPXhfwN9IUhf6_g' rel="noopener noreferrer" target="_blank">如何制作一个漂亮的二维码</LinkTrace> 这篇文章简要介绍了我们的初心与愿景。</p>
                <h2>这个生成器的特别之处在哪里？</h2>
                <p>普通的二维码样式单一，不能与环境较好的融合。这一个生成器有着 <b>丰富的参数化样式、基于 SVG 的二维码生成能力</b>，在为我们提供精美样式的同时，不限制参数如数值、颜色、背景图片的选择，又因 SVG 有较好的拓展性，可以完美兼容矢量制图流程。</p>
                <h2>如何使用？</h2>
                <p>从输入 URL 开始。没有确认框，没有额外的页面，选择样式后自动更新，调整参数后下载即可。</p>
                <h2>我应该下载 SVG 还是 JPG？</h2>
                <p>这个工具开发的初衷之一就是便利设计师将其纳入自己的工作流程中。SVG 是一个优秀的、标准的矢量图片格式，各大设计软件如 Adobe Illustrator、Sketch 等都对 SVG 有着很好的支持。用户可以在下载 SVG 后导入这些软件进行二次加工，如删除中央的信息点 <b>放入自己的 Logo</b> 等。如果需要直接分享二维码图像，请直接下载 JPG 格式。</p>
                <h2>使用遇到了问题，怎么反馈？</h2>
                <p>我们是两位大一的学生，忙于学业，可能在设计与开发的过程中有一些疏漏，敬请谅解。如果遇到浏览器兼容问题，请暂时选择更换软件或设备尝试。经常有人问，为什么电脑端右边的样式没显示全，不是 bug，只是我们懒得做切换滑动按钮，目前请按住 Shift 使用滚轮在样式区域滚动，一定能行。</p>
                <p>请注意，应用并不能保证二维码时刻可被识别，需要多加测试。</p>
                <p>如果你有兴趣和我们一起玩这个项目，<b>设计样式、开发应用</b>，欢迎点击下方的按钮加微信联系我们！</p>
            </div>
        </div>
        <div className="Qr-Centered btn-row">
            <div className="div-btn">
                <LinkButton href={"https://www.yuque.com/qrbtf/docs/donate"} value={"打赏"} />
                <LinkButton href={"https://github.com/ciaochaos/qrbtf"} value={"Github"} />
            </div>
            <div className="div-btn">
                <LinkButton href={"https://github.com/ciaochaos/qrbtf/issues"} value={"反馈"} />
                <LinkButton href={"https://mp.weixin.qq.com/s/GFEMCWQu3e2qhTuBabnHmQ"} value={"开发"} />
            </div>
        </div>
    </div>
)

export default PartMore;
