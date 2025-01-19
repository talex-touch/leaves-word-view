import React, { useState } from 'react';
import { Button, Modal, Input, Form, message } from 'antd';
import { emptyWordPronounce, WordPronounce } from './types/WordPronounce';

interface WordPronounceEditorProps {
  value?: WordPronounce;
  onChange?: (pronounce: WordPronounce) => void;
  readonly?: boolean; // 添加 readonly 属性
}

const WordPronounceEditor: React.FC<WordPronounceEditorProps> = ({ value, onChange, readonly }) => {
  const [pronounce, setPronounce] = useState(value ?? emptyWordPronounce());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then((values) => {
      onChange?.(values as WordPronounce);
      setIsModalVisible(false);
    }).catch((errorInfo) => {
      console.log('Validation Failed:', errorInfo);
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button size='small' type="dashed" onClick={showModal}>
        配置发音
      </Button>
      <Modal
        title="配置发音"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            关闭
          </Button>,
          !readonly && (
            <Button key="submit" type="primary" onClick={handleSave}>
              保存
            </Button>
          ),
        ]}
      >
        <Form form={form} initialValues={pronounce} layout="vertical">
          <Form.Item
            name="content"
            label="发音内容"
            rules={[{ required: !readonly, message: '请输入发音内容!' }]} // 根据 readonly 属性设置 required 规则
          >
            <Input
              type="text"
              placeholder="内容"
              disabled={readonly} // 根据 readonly 属性设置 disabled
            />
          </Form.Item>
          <Form.Item
            name="audio"
            label="音频地址"
            rules={[{ required: !readonly, message: '请输入音频地址!' }]} // 根据 readonly 属性设置 required 规则
          >
            <Input
              type="text"
              placeholder="音频地址"
              disabled={readonly} // 根据 readonly 属性设置 disabled
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="音频描述"
            rules={[{ max: 255, message: '音频描述不能超过255个字符!' }]}
          >
            <Input.TextArea
              placeholder="音频描述"
              disabled={readonly} // 根据 readonly 属性设置 disabled
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WordPronounceEditor;