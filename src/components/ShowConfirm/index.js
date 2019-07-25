import { Modal } from 'antd';

export const ShowConfirm = (id, onOk, { title, content }, { okText = 'Yes', cancelText = 'No' }) => {
  Modal.confirm({
    title,
    content,
    onOk() {
      onOk(id);
    },
    okText,
    okButtonProps: {
      style: { width: 74, height: 28 },
    },
    cancelText,
    cancelButtonProps: {
      style: { width: 74, height: 28 },
    },
    onCancel() {},
    maskClosable: true,
  });
};
