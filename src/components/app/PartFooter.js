import React from "react";
import '../Qrcode.css';
import LinkTrace from "../link/LinkTrace";

const currentYear = new Date().getFullYear();

const PartFooter = () => (
    <div className="Qr-titled">
        <div className="Qr-Centered Qr-footer note-font">
            <div className="Qr-footer-part">
                <strong>作者</strong>&emsp;
                <LinkTrace
                    href="https://blog.ciaochaos.com/"
                    rel="noopener noreferrer"
                    target="_blank">ciaochaos
                </LinkTrace>&emsp;
                <LinkTrace
                    href="https://github.com/CPunisher/"
                    rel="noopener noreferrer"
                    target="_blank">CPunisher
                </LinkTrace>
                <span className="gray">&ensp;丨&ensp;</span>
                <span><LinkTrace href="https://www.yuque.com/qrbtf/docs/privacy" rel="noopener noreferrer"
                                 target="_blank">隐私政策</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://www.yuque.com/qrbtf/docs/terms" rel="noopener noreferrer"
                                 target="_blank">使用条款</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://www.yuque.com/qrbtf/docs/contact" rel="noopener noreferrer" target="_blank">
                    联系我们</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://www.yuque.com/qrbtf/docs/api" rel="noopener noreferrer" target="_blank">
                    API 接口 <sup>测试</sup></LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://www.yuque.com/qrbtf/docs/coop"
                                 rel="noopener noreferrer" target="_blank">合作咨询</LinkTrace></span>
            </div>

            <div className="Qr-footer-part">
                <strong>更多产品</strong>&emsp;
                <span><LinkTrace href="https://mdnice.com" rel="noopener noreferrer"
                         target="_blank">mdnice 公众号排版</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://urlify.cn/" rel="noopener noreferrer"
                         target="_blank">Urlify 短链接</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://imgkr.com/" rel="noopener noreferrer"
                         target="_blank">imgkr 图壳图床</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://blog.ciaochaos.com/mpmath/"
                         rel="noopener noreferrer" target="_blank">mpMath 公众号公式插件</LinkTrace></span>
            </div>

            <div className="Qr-footer-part">
                <strong>致谢</strong>&emsp;
                <span><LinkTrace href="https://github.com/davidshimjs/qrcodejs" rel="noopener noreferrer"
                                 target="_blank">Sangmin, Shim</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://github.com/cozmo/jsQR" rel="noopener noreferrer"
                                 target="_blank">Cosmo Wolfe</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://mp.weixin.qq.com/s/61kI-2TmxNza1U9tw-MNPA" rel="noopener noreferrer"
                                 target="_blank">董斯佳</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://mp.weixin.qq.com/s/qCTnkPWEX6AfL2CJua_AqQ" rel="noopener noreferrer"
                                 target="_blank">野生符号</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://github.com/kongxiangyan" rel="noopener noreferrer"
                                 target="_blank">Cigaret</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://mp.weixin.qq.com/s/NdVsF_FJxqSZOyGionoo1Q" rel="noopener noreferrer"
                                 target="_blank">JaBi 扎比</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="http://nav.6soluo.com/" rel="noopener noreferrer"
                                 target="_blank">一为</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://reactjsexample.com/a-simple-web-app-to-beautify-your-qr-code/" rel="noopener noreferrer"
                                 target="_blank">React.js Example</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://mp.weixin.qq.com/s/J-odC4GPd9N2V7QRhEJ23g" rel="noopener noreferrer"
                                 target="_blank">木子淇</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://github.com/gexin1/beautify-qrcode" rel="noopener noreferrer"
                                 target="_blank">River</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://mp.weixin.qq.com/s/yy7knjp9MJ3LEuMF42gtqw" rel="noopener noreferrer"
                                 target="_blank">编程如画</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://mp.weixin.qq.com/s/YWStNIYUZ7UmcHGhIwE6eg" rel="noopener noreferrer"
                                 target="_blank">JZ Creative</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://mp.weixin.qq.com/s/5r3PNDSaQb3sOXtDQt3Jnw" rel="noopener noreferrer"
                                 target="_blank">工具狂人</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://sspai.com/post/61118" rel="noopener noreferrer"
                                 target="_blank">少数派</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://www.creative-tim.com/blog/web-development/best-reactjs-project-examples/" rel="noopener noreferrer"
                                 target="_blank">Creative Tim</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://mp.weixin.qq.com/s/bg69nfB0MK8_bd4yEErxIA" rel="noopener noreferrer"
                                 target="_blank">PPT 进化论</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://mp.weixin.qq.com/s/AoxOxZcBmo_1FK71CHviGQ" rel="noopener noreferrer"
                                 target="_blank">旁门左道</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://www.iplaysoft.com/qrbtf.html" rel="noopener noreferrer"
                                 target="_blank">异次元</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://mp.weixin.qq.com/s/zSzH8WilPsACmF1K2cWPVA" rel="noopener noreferrer"
                                 target="_blank">Topbook</LinkTrace><span className="gray">&ensp;丨&ensp;</span></span>
                <span><LinkTrace href="https://www.v2ex.com/t/675982"
                                 rel="noopener noreferrer" target="_blank">V2EX</LinkTrace></span>
            </div>

            <div className="Gray">
                Copyright © {currentYear} QRBTF. 保留所有权利。<br/>
                <LinkTrace href="https://beian.miit.gov.cn/"
                   rel="noopener noreferrer" target="_blank">
                    浙
                    ICP 备 19005869 号
                </LinkTrace>
            </div>
        </div>
    </div>
)

export default PartFooter
