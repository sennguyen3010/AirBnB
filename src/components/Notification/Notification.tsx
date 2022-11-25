import React, { ReactNode } from 'react';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
export const openNotificationWithIcon = (type: NotificationType, mess: ReactNode, disc: ReactNode) => {
  notification[type]({
    message: mess,
    description: disc,
  });
};
