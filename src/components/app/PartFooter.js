import React from "react";
import '../Qrcode.css';
import LinkTrace from "../link/LinkTrace";

const currentYear = new Date().getFullYear();

const PartFooter = () => (
    <div className="Qr-titled">
        <div className="Qr-Centered Qr-footer note-font">
            <div>
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
                <span><LinkTrace href="https://www.yuque.com/qrbtf/docs/contact"
                                 rel="noopener noreferrer" target="_blank">联系我们</LinkTrace><span
                    className="gray">&ensp;丨&ensp;</span></span>
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

            <div className="Gray">
                Copyright © {currentYear} QRBTF. 保留所有权利。<br/>
                <LinkTrace href="http://www.beian.miit.gov.cn/"
                   rel="noopener noreferrer" target="_blank">
                    浙
                    ICP 备 19005869 号
                </LinkTrace>
            </div>
        </div>
    </div>
)

export default PartFooter
