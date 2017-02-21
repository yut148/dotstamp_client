/*global UPLOAD_PATH*/
/*global IMAGE_PATH*/

import React, {Component, PropTypes} from "react"
import {Image, Thumbnail} from "react-bootstrap"


import {TalkIcon, TalkImage} from "./../../css/talk.css"
import {FormIcon} from "./../../css/form.css"
import {MainIcon} from "./../../css/character.css"
import {UserIcon} from "./../../css/user.css"
import {Narrowly} from "./../../css/common.css"

// 表示タイプ
export const IMAGE_DISPLAY_TYPE_NONE = 0
export const IMAGE_DISPLAY_TYPE_TALK_IMAGE = 1
export const IMAGE_DISPLAY_TYPE_CHARACTER = 2
export const IMAGE_DISPLAY_TYPE_CHARACTER_TALK = 3
export const IMAGE_DISPLAY_TYPE_CHARACTER_FORM = 4
export const IMAGE_DISPLAY_TYPE_CHARACTER_MAIN = 5
export const IMAGE_DISPLAY_TYPE_ICON = 6

var imageDisplayTypeList

export default class Images extends Component {
    componentWillMount () {
        imageDisplayTypeList = {}

        imageDisplayTypeList[IMAGE_DISPLAY_TYPE_NONE] = {
            src: (filePath) => {
                return this.getImageSrc(filePath)
            },
            className: "",
            option: {},
            tag: Thumbnail,
        }
        imageDisplayTypeList[IMAGE_DISPLAY_TYPE_TALK_IMAGE] = {
            src: (fileName) => {
                return this.getUploadSrc("talk/", fileName)
            },
            className: TalkImage,
            option: {},
            tag: Image,
        }
        imageDisplayTypeList[IMAGE_DISPLAY_TYPE_CHARACTER] = {
            src: (fileName) => {
                return this.getUploadSrc("character/", fileName)
            },
            className: UserIcon,
            option: {
                circle: true,
            },
            tag: Image,
        }
        imageDisplayTypeList[IMAGE_DISPLAY_TYPE_CHARACTER_TALK] = {
            src: (fileName) => {
                return this.getUploadSrc("character/", fileName)
            },
            className: TalkIcon,
            option: {},
            tag: Image,
        }
        imageDisplayTypeList[IMAGE_DISPLAY_TYPE_CHARACTER_FORM] = {
            src: (fileName) => {
                return this.getUploadSrc("character/", fileName)
            },
            className: FormIcon,
            option: {
                circle: true,
            },
            tag: Image,
        }
        imageDisplayTypeList[IMAGE_DISPLAY_TYPE_CHARACTER_MAIN] = {
            src: (fileName) => {
                return this.getUploadSrc("character/", fileName)
            },
            className: MainIcon + " center-block",
            option: {},
            tag: Image,
        }
        imageDisplayTypeList[IMAGE_DISPLAY_TYPE_ICON] = {
            src: (fileName) => {
                return this.getUploadSrc("icon/", fileName)
            },
            className: Narrowly,
            option: {},
            tag: Thumbnail,
        }
    }
    /**
     * アップロード画像ファイルパス取得する
     *
     * @param  {string} dirName ディレクトリ名
     * @param  {string} fileName 画像ファイル名
     * @return {string}  画像ファイルパス
     */
    getUploadSrc (dirName, fileName) {
        return UPLOAD_PATH + dirName + fileName
    }
    /**
     * 画像ファイルを取得する
     *
     * @param  {string} filePath ファイルパス
     * @return {string} 画像ファイルパス
     */
    getImageSrc (filePath) {
        return IMAGE_PATH + filePath
    }
    /**
     * 画像取得する
     *
     * @return {object}  html
     */
    getImg () {
        let setting = imageDisplayTypeList[this.props.imageDisplayType]

        return (
            <setting.tag src={setting.src(this.props.fileName)} className={setting.className} {...setting.option} />
        )
    }
    /**
     * 描画する
     *
     * @return {object} html
     */
    render () {
        return (
            <span>{this.getImg()}</span>
        )
    }
}

Images.propTypes = {
    imageClassName: PropTypes.string,
    fileName: PropTypes.string,
    imageDisplayType: PropTypes.number,
}

Images.defaultProps = {
    imageDisplayType: IMAGE_DISPLAY_TYPE_NONE,
}
