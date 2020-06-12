import React from "react";
import '../Qrcode.css';

const currentYear = new Date().getFullYear();

const PartFooter = () => (
    <div className="Qr-titled">
        <div className="Qr-Centered Qr-footer note-font">
            <div>
                <strong>作者</strong>&emsp;
                <a
                    href="https://blog.ciaochaos.com/"
                    rel="noopener noreferrer"
                    target="_blank">ciaochaos
                </a>&emsp;
                <a href="https://github.com/CPunisher/"
                   rel="noopener noreferrer"
                   target="_blank">CPunisher
                </a>
                <span className="gray">&ensp;丨&ensp;</span>
                <span><a href="https://www.yuque.com/qrbtf/docs/contact" rel="noopener noreferrer" target="_blank">联系我们</a><span className="gray">&ensp;丨&ensp;</span></span>
                <span><a href="https://www.yuque.com/qrbtf/docs/coop" rel="noopener noreferrer" target="_blank">合作咨询</a></span>
            </div>

            <div className="Qr-footer-part">
                <strong>更多产品</strong>&emsp;
                <span><a href="https://mdnice.com" rel="noopener noreferrer" target="_blank">mdnice 公众号排版</a><span className="gray">&ensp;丨&ensp;</span></span>
                <span><a href="https://urlify.cn/" rel="noopener noreferrer" target="_blank">Urlify 短链接</a><span className="gray">&ensp;丨&ensp;</span></span>
                <span><a href="https://imgkr.com/" rel="noopener noreferrer" target="_blank">imgkr 图壳图床</a><span className="gray">&ensp;丨&ensp;</span></span>
                <span><a href="https://blog.ciaochaos.com/mpmath/" rel="noopener noreferrer" target="_blank">mpMath 公众号公式插件</a></span>
            </div>

            <div className="Gray">
                Copyright © {currentYear} QRBTF. 保留所有权利。<br />
                <a href="http://www.beian.miit.gov.cn/" rel="noopener noreferrer" target="_blank">
                    浙
                    ICP 备 19005869 号
                </a>
            </div>
        </div>
    </div>
)

export default PartFooter
