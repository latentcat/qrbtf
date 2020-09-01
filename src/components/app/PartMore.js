import React from 'react';
import './App.css';
import GitHubButton from 'react-github-btn'
import ScrollContainer from "react-indiana-drag-scroll";
import LazyLoad from "react-lazy-load";
import mediumZoom from "medium-zoom";
import LinkButton from "../link/LinkButton";
import ImageZoom from "../../containers/app/ImageZoom";
import LinkTrace from "../link/LinkTrace";
import {isPC} from "../../utils/navigatorUtils";
import {handleScroll} from "../../utils/gaHelper";

const pictures = [
    'https://7172-qrbtf-1d845d-1255694434.tcb.qcloud.la/QrbtfGallery/gallery04.jpg',
    'https://7172-qrbtf-1d845d-1255694434.tcb.qcloud.la/QrbtfGallery/gallery02.jpg',
    'https://7172-qrbtf-1d845d-1255694434.tcb.qcloud.la/QrbtfGallery/gallery01.jpg',
    'https://7172-qrbtf-1d845d-1255694434.tcb.qcloud.la/QrbtfGallery/gallery03.jpg',
    'https://7172-qrbtf-1d845d-1255694434.tcb.qcloud.la/QrbtfGallery/gallery05.jpg',
    'https://7172-qrbtf-1d845d-1255694434.tcb.qcloud.la/QrbtfGallery/gallery06.jpg',
]

const PartMore = () => {

    return (
        <div className="Qr-titled-nobg">
            <div className="Qr-Centered title-margin">
                <div className="Qr-s-title">More</div>
                <p className="Qr-s-subtitle">更多</p>
                <div className="Qr-s-subtitle Qr-rel">
                    {isPC() ? <div className="Qr-style-hint">拖拽滑动</div> : null}
                </div>
            </div>
            <div className="title-margin">
                <div className="Qr-article">
                    <div className="Qr-Centered">
                        <p><GitHubButton href="https://github.com/ciaochaos/qrbtf"
                                         data-color-scheme="no-preference: light; light: light; dark: dark;"
                                         data-icon="octicon-star" data-size="large" data-show-count="true"
                                         aria-label="Star ciaochaos/qrbtf on GitHub">Star</GitHubButton></p>
                        <h2>设计分享</h2>
                    </div>
                    <ScrollContainer
                        className="Qr-s Qr-s-gallery"
                        onStartScroll={(e) => handleScroll('gallery')}
                        hideScrollbars={false}
                        horizontal={true}
                        vertical={false}>
                        <div className="Qr-box">
                            <Gallery contents={pictures}/>
                        </div>
                    </ScrollContainer>
                    <div className="Qr-Centered">
                        <h2>最新消息</h2>
                        <p><b>2020.9.1</b><br/>新增 C3 样式、图标插入、 PNG 下载。</p>
                        <p><b>2020.6.29</b><br/>新的反馈渠道！我们开始征集好玩的二维码设计啦，可以是推送尾图、海报等等，快来上传吧。<LinkTrace
                            href='https://qrbtf-com.mikecrm.com/J2wjEEq' rel="noopener noreferrer"
                            target="_blank">点击提交</LinkTrace>。</p>
                        <p><b>2020.6.24</b><br/>新增深色模式，新增 SP — 3 样式。</p>
                        <p><b>2020.6.22</b><br/>新增 A — a1、A — a2、A — b1、A — b2 样式，添加样式描述，新增桌面端横向拖拽滑动。</p>
                        <p><b>2020.6.11</b><br/>QRBTF React 组件发布！快在你的应用中引入 react-qrbtf 吧。<LinkTrace
                            href='https://github.com/cpunisher/react-qrbtf' rel="noopener noreferrer"
                            target="_blank">访问项目</LinkTrace>。</p>
                        <p><b>2020.5.23</b><br/>网站开源啦！<LinkTrace href='https://github.com/ciaochaos/qrbtf'
                                                                 rel="noopener noreferrer"
                                                                 target="_blank">点击访问</LinkTrace> 我们的
                            Github。期待你也来参与设计、开发！给个
                            Star 支持一下不？查看文章 <LinkTrace href='https://mp.weixin.qq.com/s/GFEMCWQu3e2qhTuBabnHmQ'
                                                       rel="noopener noreferrer" target="_blank">QRBTF
                                开源啦！来写个二维码样式吧～</LinkTrace>。</p>
                        <p><b>2020.5.22</b><br/>新增 C2 样式、下载计数（好像还不太稳定）、普通二维码上传、颜色选择、背景图片上传、输入提示、桌面端横向滚动提示。</p>
                        <h2>为什么要做一个二维码生成器？</h2>
                        <p>看这里，<LinkTrace href='https://mp.weixin.qq.com/s/_Oy9I9FqPXhfwN9IUhf6_g'
                                          rel="noopener noreferrer"
                                          target="_blank">如何制作一个漂亮的二维码</LinkTrace> 这篇文章简要介绍了我们的初心与愿景。</p>
                        <h2>这个生成器的特别之处在哪里？</h2>
                        <p>普通的二维码样式单一，不能与环境较好的融合。这一个生成器有着 <b>丰富的参数化样式、基于 SVG 的二维码生成能力</b>，在为我们提供精美样式的同时，不限制参数如数值、颜色、背景图片的选择，又因
                            SVG 有较好的拓展性，可以完美兼容矢量制图流程。</p>
                        <h2>如何使用？</h2>
                        <p>从输入 URL 开始（别忘了 http://）。没有确认框，没有额外的页面，选择样式后自动更新，调整参数后下载即可。</p>
                        <h2>我应该下载 SVG 还是 JPG？</h2>
                        <p>这个工具开发的初衷之一就是便利设计师将其纳入自己的工作流程中。SVG 是一个优秀的、标准的矢量图片格式，各大设计软件如 Adobe Illustrator、Sketch 等都对 SVG
                            有着很好的支持。用户可以在下载 SVG 后导入这些软件进行二次加工，如删除中央的信息点 <b>放入自己的 Logo</b> 等。如果需要直接分享二维码图像，请直接下载 JPG 格式。
                        </p>
                        <h2>二维码无法识别的原因是什么？</h2>
                        <p>二维码无法识别有很多原因。比如定位点不匹配识别模式、信息点颜色对比不够、遮挡部分太大。建议尝试调整容错率、颜色、图标大小等参数并在各种二维码扫描器中测试，以保证二维码被识别的成功率</p>
                        <h2>使用遇到了问题，怎么反馈？</h2>
                        <p>我们是两位大一的学生，忙于学业，可能在设计与开发的过程中有一些疏漏，敬请谅解。如果遇到浏览器兼容问题，请暂时选择更换软件或设备尝试。</p>
                        <p>编写二维码样式是一个锻炼设计与开发（JavaScript）能力的绝佳机会，如果你有兴趣和我们一起玩这个项目，欢迎添加我的微信（微信号：<span
                            style={{userSelect: "text"}}>nhciao</span>，请备注真实姓名）或发送邮件至 <LinkTrace
                            href='mailto:contact@qrbtf.com'>contact@qrbtf.com</LinkTrace> 联系我们！</p>

                    </div>
                </div>
            </div>
            <div className="Qr-Centered btn-row">
                <div className="div-btn">
                    <LinkButton href={"https://www.yuque.com/qrbtf/docs/donate"} value={"打赏"}/>
                    <LinkButton href={"https://github.com/ciaochaos/qrbtf"} value={"Github"}/>
                </div>
                <div className="div-btn">
                    <LinkButton href={"https://qrbtf-com.mikecrm.com/J2wjEEq"} value={"反馈"}/>
                    <LinkButton href={"https://mp.weixin.qq.com/s/GFEMCWQu3e2qhTuBabnHmQ"} value={"开发"}/>
                </div>
            </div>
        </div>
    )
}

const Gallery = ({ contents }) => {
    const zoom = mediumZoom();
    const zoomRef = React.useRef(zoom);

    return (
        contents.map((url, index) => (
                <LazyLoad key={'lazy_gallery_' + index} offsetVertical={200}>
                    <ImageZoom key={'gallery_' + index} zoom={zoomRef.current} background={"rgba(0, 0, 0, 0.8)"} className="Qr-gallery-image" src={url}/>
                </LazyLoad>
            )
        )
    );
}

export default PartMore;
