import React from 'react';
import { Icon, Modal } from 'antd';

export const ShowConfirm = (
  id,
  onOk,
  { title, content },
  { okText = 'Yes', cancelText = 'No' },
  icon = <Icon type="exclamation-circle" />
) => {
  Modal.confirm({
    icon,
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
