import PreviewModal from '@/pages/Admin/Audio/components/PreviewModal';
import { listAudioFileByPageUsingPost } from '@/services/backend/audioFileController';
import { Select, Button } from 'antd';
import { useEffect, useState } from 'react';


// 新增: 使用 listAudioFileByPageUsingPost 进行远程搜索
const fetchVoiceOptions = async (keyword: string) => {
  // 假设 listAudioFileByPageUsingPost 是一个已经定义好的函数
  const response = await listAudioFileByPageUsingPost({ name: keyword });
  return response.data; // 假设返回的数据结构为 { data: [{ label: string; value: string; gender?: string }] }
};

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const AudioVoiceSelect: React.FC = ({ value, onChange }: Props) => {
  const [options, setOptions] = useState<API.AudioFileVO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchVoiceOptions('').then(data => {
      setOptions(data?.records ?? []);
      setLoading(false);
    });
  }, []);

  const handleSearch = async (value: string) => {
    setLoading(true);
    const data = await fetchVoiceOptions(value);

    setOptions(data?.records ?? []);
    setLoading(false);
  };

  // 新增: 预览按钮点击事件处理
  const handlePreview = (value: string) => {
    // 这里可以添加预览逻辑，例如打开预览模态框或播放音频
    console.log('Previewing:', value);

    const targetRecord = options.find((option) => option.id === +value);
  };

  return (
    // 新增: 使用 div 包裹 Select 和 Button，并使用 Flexbox 布局
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Select
        value={value}
        onChange={onChange}
        showSearch
        filterOption={false}
        onSearch={handleSearch}
        loading={loading}
      >
        {options.map((option) => (
          <Select.Option value={option.id} key={option.id}>
            {option.name}
            <span style={{ opacity: '0.5' }}>
              {option.status === 'DELETED' && '（已删除）'}
              {option.status === 'FAILED' && '（失败）'}
              {option.status === 'PROCESSED' && '（仅合成）'}
              {option.status === 'PROCESSING' && '（处理中）'}
              {option.status === 'SYNTHESIZING' && '（合成中）'}
              {option.status === 'UPLOADING' && '（上传中）'}
              {option.status === 'UPLOADED' && '（可用）'}
              {option.status === 'UNKNOWN' && '（未知）'}
            </span>
          </Select.Option>
        ))}
      </Select>
      {value && (
        <div style={{ width: '200px' }}>
          <PreviewModal data={options.find((option) => +(option.id ?? 0) === +value)} />
        </div>
      )}
    </div>
  );
};

export default AudioVoiceSelect;