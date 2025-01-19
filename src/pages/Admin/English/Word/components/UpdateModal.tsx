import { updateEnglishWordUsingPost } from '@/services/backend/englishWordController';
import { ProColumns } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import { Drawer } from 'antd';

interface Props {
  oldData?: API.User;
  visible: boolean;
  columns: ProColumns<API.EnglishWord>[];
  onSubmit: (values: API.EnglishWordUpdateRequest) => void;
  onCancel: () => void;
}

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;

  if (!oldData) {
    return <></>;
  }

  return (
    <Drawer
      title={'提交'}
      placement="right"
      width="85%"
      onClose={() => {
        onCancel?.();
      }}
      open={visible}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values: API.EnglishWordUpdateRequest) => {
          const success = await updateEnglishWordUsingPost({
            ...values,
            id: oldData.id as any,
          });
          if (success) {
            onSubmit?.(values);

            return true;
          }

          return false;
        }}
      />
    </Drawer>
  );
};
export default UpdateModal;
