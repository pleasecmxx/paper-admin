<p align="center">
    <img src="https://hooray.gitee.io/fantastic-admin/logo.png" width="200" height="200" />
</p>

<h1 align="center">Fantastic-admin</h1>

<p align="center">一款开箱即用的 Vue 中后台管理系统框架</p>

## 特点

- 丰富的布局模式，覆盖市面上各种中后台布局，兼容PC、平板和移动端
- 提供主题配置文件，轻松实现个性化定制
- 精心设计的动效，让每一处的动画都干净利落
- 根据路由配置自动生成导航栏
- 支持全方位权限验证
- 多级页面缓存

## 演示

[基础版](https://hooray.gitee.io/fantastic-admin/basic)（免费，可商用）

[专业版](https://hooray.gitee.io/fantastic-admin/pro)（付费，购买请联系 QQ：304327508）

## 技术支持

[开发文档](https://hooray.gitee.io/fantastic-admin)

[视频教程](https://space.bilibili.com/3079082/channel/detail?cid=156985)

技术交流QQ群：1001394973

## 预览

> 预览截图为专业版

<table>
    <tr>
        <td><img src="https://hooray.gitee.io/fantastic-admin/preview1.png" /></td>
        <td><img src="https://hooray.gitee.io/fantastic-admin/preview2.png" /></td>
    </tr>
    <tr>
        <td><img src="https://hooray.gitee.io/fantastic-admin/preview3.png" /></td>
        <td><img src="https://hooray.gitee.io/fantastic-admin/preview4.png" /></td>
    </tr>
</table>

## 支持

如果觉得 Fantastic-admin 这个框架不错，或者已经在使用了，希望你可以去 **Github** 或者 **Gitee(码云)** 帮我点个 ⭐ ，这将对我是极大的鼓励。

[![star](https://img.shields.io/github/stars/hooray/fantastic-admin?style=social)](https://github.com/hooray/fantastic-admin/stargazers)

[![star](https://gitee.com/hooray/fantastic-admin/badge/star.svg?theme=dark)](https://gitee.com/hooray/fantastic-admin/stargazers)


qr_code: {   //必填
    top_intent: number,
    left_intent: number
}

link_text: {   //非必填
    top_intent: number,
    font_size: number,
    color: "",
}





### C端更新
1、完成合作高校15张图片换成自己服务器的地址
2、完成主题风格更换
3、完成网站备案图标更改（固定不变的）
4、完成轮播图（活动跳转功能，可自由配置）
5、完成人工降重界面文字调整
6、完成主页三个图标的替换
7、修复主页问答标题显示不全的问题
8、调整渠道上下栏目对齐的问题
9、优化二级域名查找代码、支持不输入www跳入

### 管理端更新
1、每次版本更新自动更新缓存、未检测到新版本使用缓存
2、渠道配置中 code改为选择框选择、因为填写错误就会导致该渠道订单支付成功但无查重进度
3、增加模块【系统管理】-【素材库管理】方便写作、网站内容日常维护
4、修复问答写作弹窗第二次打开不可输入的问题
5、轮播图增加搜索功能、轮播图增加编辑功能、增加【跳转链接】字段、配置了则客户端点击即跳转该链接。
6、去掉二级域名www显示
7、增加每次切换菜单自动更新一遍数据的功能。以前是只切换，刷新需要点击页面中刷新按钮。
