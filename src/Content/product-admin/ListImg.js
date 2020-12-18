import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import urls from '../../const';
import { PlusOutlined } from '@ant-design/icons';
import errorNotification from '../../general/errorNotification';
import Notification from '../../general/Notification';
import getFactory from '../../request/index';
const ListImg = ({ product, setProduct }) => {
    var [fileList, setFileList] = useState(product.image.map(i => ({ ...i, status: "done", name: i.img, uid: `${i.id}`, response: { id: i.id }, url: `${urls}${i.img}` })));
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    const onRemove = (file) => {
        // console.log("remove", file)
    }
    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async file => {
        // console.log("onPerview", file)

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }
    const uploadButton = (
        <div className="product_admin_upload_btn">
            <div>
                <PlusOutlined />
                <span style={{ marginTop: 8 }}>Upload</span>
            </div>

        </div>
    )
    const handleChange = async ({ file, fileList }) => {
        if (file.status === "removed") {
            const API = getFactory('product')
            try {
                await API.deleteImage(file.response.id)
                Notification("Xóa ảnh thành công!")
                setFileList(fileList)
            }
            catch (e) {
                if (e.request.status && e.request.status === 0) {
                    errorNotification("Lỗi mạng!");
                } else if (e.response.data.message) {
                    e.response.data.message.map(x => errorNotification(x))
                } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
            }
        }
        if (file.status === "done") {
            setFileList(fileList)
        }
        if (file.status === "error") {
            if (file.response && file.response.message) file.response.message.map(m => errorNotification(m));
            else errorNotification("Đã có lỗi sảy ra, bạn vui lòng thử lại sau!")
        }
    }
    // setFileList(fileList) };
    // console.log(fileList)
    // console.log(product)
    return (

        <>
            <Upload
                name="img"
                action={`${urls}/product/image/${product.id}/`}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                headers={{ Authorization: "Token " + localStorage.getItem("token"), }}
                onRemove={onRemove}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )

}
export default ListImg;