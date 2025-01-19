import WordContentEditor from '@/components/Word/WordContentEditor';
import CreateModal from '@/pages/Admin/English/Word/components/CreateModal';
import UpdateModal from '@/pages/Admin/English/Word/components/UpdateModal';
import { deleteEnglishWordUsingPost, listEnglishWordByPageUsingPost } from '@/services/backend/englishWordController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';

/**
 * 英语词典管理页面
 *
 * @constructor
 */
const EnglishWordPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.EnglishWord>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.EnglishWord) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteEnglishWordUsingPost({
        id: row.id as any,
      });
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.EnglishWord>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '单词',
      dataIndex: 'word_head',
      valueType: 'text',
      formItemProps: {
        rules: [{ required: true, message: '请输入单词' }],
      },
    },
    {
      title: '信息',
      dataIndex: 'info',
      hideInSearch: true,
      // valueType: '',
      render: (_, record) => {
        return <WordContentEditor word_head={record.word_head} info={record.info} />;
      },
      renderFormItem: (_, record) => {
        return <WordContentEditor editable word_head={record.record?.word_head} info={record.record?.info} />;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.EnglishWord>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listEnglishWordByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.EnglishWordQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns.filter(column => column.dataIndex !== 'update_time' && column.dataIndex !== 'create_time')}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns.filter(column => column.dataIndex !== 'update_time' && column.dataIndex !== 'create_time')}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default EnglishWordPage;