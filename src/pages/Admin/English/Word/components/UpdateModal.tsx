import { updateEnglishWordUsingPost } from '@/services/backend/englishWordController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useMemo } from 'react';
import { Drawer } from 'antd';

interface Props {
  oldData?: API.EnglishWord;
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
  const innerRender = useMemo(() => {
    const { oldData, visible, columns, onSubmit, onCancel } = props;

    if (!oldData) {
      return <></>;
    }

    console.log("initialValues", oldData)

    return (
      <Drawer
        destroyOnClose
        title={'编辑'}
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
          form={{
            initialValues: oldData,
          }}
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
  }, [props])

  return innerRender
};
export default UpdateModal;
