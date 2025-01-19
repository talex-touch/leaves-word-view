import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Drawer, message } from 'antd';
import React from 'react';

type Request = API.EnglishWordAddRequest | API.EnglishWordUpdateRequest

interface Props {
  visible: boolean;
  columns: ProColumns<API.EnglishDictionary>[];
  onSubmit: (values: Request) => Promise<boolean>;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleSubmit = async (fields: Request, props: Props) => { // 修改: API.UserAddRequest -> API.EnglishDictionaryAddRequest
  const hide = message.loading('正在提交');
  try {
    await props.onSubmit(fields); // 修改: addUserUsingPost -> addEnglishDictionaryUsingPost
    hide();
    message.success('提交成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('提交失败，' + error.message);
    return false;
  }
};

/**
 * 提交弹窗
 * @param props
 * @constructor
 */
const InnerModal: React.FC<Props> = (props) => {
  const { visible, columns, onCancel } = props;

  return (
    <Drawer // 修改: 将 Modal 替换为 Drawer
      destroyOnClose
      title={'提交'}
      placement="right" // 添加: 设置 Drawer 从右侧弹出
      width="85%" // 修改: 设置 Drawer 宽度为屏幕的 85%
      onClose={() => {
        onCancel?.();
      }}
      open={visible}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={(request: Request) => handleSubmit(request, props)}
      />
    </Drawer>
  );
};
export default InnerModal;