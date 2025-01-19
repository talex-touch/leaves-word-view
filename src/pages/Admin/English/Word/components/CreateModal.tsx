import { addEnglishWordUsingPost } from '@/services/backend/englishWordController'; // 修改: addUserUsingPost -> addEnglishDictionaryUsingPost
import { ProColumns } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import InnerModal from './InnerModal';

interface Props {
  visible: boolean;
  columns: ProColumns<API.EnglishWord>[];
  onSubmit: (values: API.EnglishWordAddRequest) => void; // 修改: API.UserAddRequest -> API.EnglishDictionaryAddRequest
  onCancel: () => void;
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onSubmit, onCancel } = props;

  return (
    <InnerModal
      visible={visible}
      columns={columns}
      onCancel={() => {
        onCancel?.();
      }}
      onSubmit={async (values) => { // 修改: API.UserAddRequest -> API.EnglishDictionaryAddRequest
        const success = await addEnglishWordUsingPost(values);
        if (success) {
          onSubmit?.(values);
          return true
        }

        return false
      }}>

    </InnerModal>
  );
};

export default CreateModal;